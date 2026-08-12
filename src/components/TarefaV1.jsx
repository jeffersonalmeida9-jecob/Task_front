import "../App.css";
import Kanban from "../fragmentos/Kanban";
import Header from "../fragmentos/Header";
//import ListaTarefas from "../fragmentos/ListaTarefas";
import { useState, useEffect } from "react";
import axios from "axios"



async function consultarCEP(cep) {
  try {
    const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          console.log(resposta.data); 
          return resposta.data;
  } catch (erro) {
          console.log(erro.message);
          return null;
    };
};

function TarefaV1() {

  const [cepData, setCepData] = useState("");
  const [proximoId, setProximoId] = useState(1);

  function moverTarefa(id, novaColuna) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, coluna: novaColuna }
          : tarefa
      )
    );
  }

  const [tarefas, setTarefas] = useState(() => {
    const salvo = localStorage.getItem("d_salvos");
    if (!salvo) {
      return [];
    }
    const dados = JSON.parse(salvo);
    if (dados.length > 0) {
      setProximoId(dados[dados.length - 1].id + 1);
    }
    return Array.isArray(dados) ? dados : [];
    
  });

  const [texto, setTexto] = useState("");

  useEffect(() => {
    localStorage.setItem('d_salvos', JSON.stringify(tarefas));
  }, [tarefas]);

   const afazer = tarefas.filter(
    (tarefa) => tarefa.coluna === "afazer"
  ).length;

  const andamento = tarefas.filter(
    (tarefa) => tarefa.coluna === "andamento"
  ).length;

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.coluna === "concluida"
  ).length;


  async function adicionarTarefa() {
    if (texto.trim() === "") return;

    const endereco = await consultarCEP(cepData)

    const novaTarefa = {
      id: proximoId,
      texto: texto.trim(),
      cidade: endereco?.localidade,
      estado: endereco?.uf,
      concluida: false,
      prioridade: "media",
      coluna: 'afazer',
    };

    setTarefas([...tarefas, novaTarefa]);
    setProximoId(proximoId + 1);
    setTexto("");
    console.log(novaTarefa)
  }

  function deletarTarefa(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

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
        <section id="formulario">
          <div className="campo-linha">

            <input
              type="text"
              placeholder="Tarefa..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && adicionarTarefa()
              }
            />

            <input
              type="text"
              placeholder="Digite o CEP"
              value={cepData}
              onChange={(e) => setCepData(e.target.value)}
            />

            <button onClick={adicionarTarefa}>Adicionar</button>
          
          </div>
        </section>

        <Kanban
          tarefas={tarefas}
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