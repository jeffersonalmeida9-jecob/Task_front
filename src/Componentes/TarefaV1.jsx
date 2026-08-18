import "../App.css";
import Kanban from "../Fragmentos/Kanban";
import Header from "../Fragmentos/Header";
import { useState, useEffect } from "react";

function TarefaV1() {

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

  const [tarefas, setTarefas] = useState(() => {
    const salvo = localStorage.getItem("d_salvos");
    if (!salvo) {
      return [];
    }
    const dados = JSON.parse(salvo);
    return Array.isArray(dados) ? dados : [];
  });

  const afazer = tarefas.filter((tarefa) => tarefa.coluna === "afazer").length;
  const andamento = tarefas.filter((tarefa) => tarefa.coluna === "andamento").length;
  const concluidas = tarefas.filter((tarefa) => tarefa.coluna === "concluida").length;

  useEffect(() => {
    localStorage.setItem('d_salvos', JSON.stringify(tarefas));
  }, [tarefas]);

 

  return (
    <div id="App">
      <Header
        titulo="TaskFlow - Mini Kanban"
        subtitulo="Organize suas tarefas"
        afazer={afazer}
        andamento={andamento}
        concluidas={concluidas}
      />
      <div className="containerPrincipal">
        <Kanban
          tarefas={tarefas}
          setTarefas={setTarefas}
          moverTarefa={moverTarefa}
          deletarTarefa={deletarTarefa}
        />
      </div>
      <footer>
        <p>Jefferson Kauã</p>
      </footer>
    </div>
  );
}

export default TarefaV1;