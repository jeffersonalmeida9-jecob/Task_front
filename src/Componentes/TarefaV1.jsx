import "../App.css";
import Kanban from "../fragmentos/Kanban";
import Header from "../fragmentos/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import {URL_API}  from "../fragmentos/API";

function TarefaV1() {

  const [tarefas, setTarefas] = useState ([])
  const [carregando, setCarregando] = useState (false)
  const [erro, setErro] = useState('');

  function moverTarefa(id, novaColuna) {
    setTarefas(
      tarefas.map((tarefa) => tarefa.id === id? { ...tarefa, coluna: novaColuna }: tarefa)
    );
  };

  const deletarTarefa = (id) => {
    const confirmado = window.confirm('Tem certeza que deseja deletar esta tarefa?');
      if (confirmado) {
        setTarefas(tarefas.filter((t) => t.id !== id));
      }
  };

  useEffect (() => {
    async function carregarTarefas() {
      try {
        setCarregando (true);
        setErro('');

        const resposta = await axios.get(URL_API + '/tarefas')

        setTarefas(resposta.data);

      } catch (e) {
        console.error (e)
      } finally {
        setCarregando(false);
      }
    }
    carregarTarefas();
  }, [])

  const afazer = tarefas.filter((tarefa) => tarefa.coluna === "afazer").length;
  const andamento = tarefas.filter((tarefa) => tarefa.coluna === "andamento").length;
  const concluidas = tarefas.filter((tarefa) => tarefa.coluna === "concluida").length;

  return (
    <div id="App">
      <Header
        titulo="TaskFlow - Mini Kanban"
        subtitulo="Organize suas tarefas"
        afazer={afazer}
        andamento={andamento}
        concluidas={concluidas}
      />
      <main className="container">
        {carregando && (
          <p style={{ textAlign:'center', color:'#94A3B8' }}>Carregando tarefas...</p>)}
        {erro && (
          <p style={{ textAlign:'center', color:'#EF4444' }}>{erro}</p>)}
        {!carregando && !erro && (
     
        <div className="containerPrincipal">
          <Kanban
            tarefas={tarefas}
            setTarefas={setTarefas}
            moverTarefa={moverTarefa}
            deletarTarefa={deletarTarefa}
            setErro={setErro}
          />
        </div>
        )}
        <footer>
          <p>Jefferson Kauã</p>
        </footer>
      </main>
    </div>
  );
}

export default TarefaV1;