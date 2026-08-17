import "../App.css";
import Header from "../fragmentos/Header2";
import ListaTarefas from "../fragmentos/ListaTarefas";
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
  //const [endereco, setEndereco] = useState(null)


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

  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = tarefas.filter((tarefa) => !tarefa.concluida).length;

  const [filtro, setFiltro] = useState("todas");
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }
    if (filtro === "concluidas") {
      return tarefa.concluida;
    }
    return true;
  });

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
    };

    setTarefas([...tarefas, novaTarefa]);
    setProximoId(proximoId + 1);
    setTexto("");
    console.log(novaTarefa)
  }

  function deletarTarefa(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  function concluirTarefa(id) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    );
  }

  return (
    <div id="App">
      <Header
        titulo="TaskFlow"
        subtitulo="Organize suas tarefas"
        total={total}
        pendentes={pendentes}
        concluidas={concluidas}
        filtro={filtro}
        setFiltro={setFiltro}
      />
      <main className="containerPrincipal">
        <section id="formulario">
          <div className="campo-linha">
            
            <input
              type="text"
              placeholder="Tarefa..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && adicionarTarefa()}
            />
            <input 
          type="text"
          placeholder='Digite o CEP'
          value={cepData}
          onChange={(e) => setCepData(e.target.value)}
           />
            <button onClick={adicionarTarefa}>Adicionar</button>          </div>
        </section>
        <ListaTarefas
          tarefas={tarefasFiltradas}
          onDeletar={deletarTarefa}
          onConcluir={concluirTarefa}
        />
      </main>
      <footer>
        <p>Jefferson Kauã</p>
      </footer>
    </div>
  );
}

export default TarefaV1;
