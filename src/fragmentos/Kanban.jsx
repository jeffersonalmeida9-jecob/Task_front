import { useState, useEffect } from "react";
import ListarTarefas from "../fragmentos/ListaTarefas";
import Header from "../fragmentos/Header";
import styles from "../css's/Kanban.module.css";
import ModalTarefa from "../Componentes/ModalTarefa";
import "../css's/Kanban.css";
import api, { mensagensDeErro } from "../api";


function Kanban() {
  const [tarefas, setTarefas] = useState([]);
  const [listaPrioridades, setListaPrioridades] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaProjetos, setListaProjetos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [colunaAtiva, setColunaAtiva] = useState("afazer");

  useEffect (() => {
    async function carregarTarefas() {
      setCarregando(true);
      setErro("");

      try {
        const [respPrioridades, respTarefas, respUsuarios, respProjetos] =
          await Promise.all ([  
            api.get("/prioridades"),
            api.get("/tarefas"),
            api.get("/usuarios"),
            api.get("/projetos"),
          ]);
        setListaPrioridades(respPrioridades.data)
        setTarefas(respTarefas.data)
        setListaUsuarios(respUsuarios.data)
        setListaProjetos(respProjetos.data)

        setCarregando (true);
        setErro('');

      } catch (e) {
        setErro('Erro ao carregar tarefas. Verifique a conexão.');
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }
    carregarTarefas();
  }, [])

   function abrirModalCriar(coluna) {
    setTarefaEditando(null); 
    setColunaAtiva(coluna);
    setModalAberto(true);
  }

  function abrirModalEditar(tarefa) {
    setTarefaEditando(tarefa); 
    setModalAberto(true);
  }

  async function salvarTarefa(dados) {
    
    if (dados.id) {
      const resposta = await api.put(`/tarefas/${dados.id}`, dados);
      setTarefas(tarefas.map((t) => (t.id === dados.id ? resposta.data : t)));
    } 
    else {
      const resposta = await api.post("/tarefas", dados);
      setTarefas([...tarefas, resposta.data]);
    }
  }

  async function deletarTarefa(id) {
    const confirmado = window.confirm('Tem certeza que deseja deletar esta tarefa?')
    if (!confirmado) return;
    try {
        await api.delete(`/tarefas/${id}`);
        setTarefas(tarefas.filter(t => t.id !== id));
    } catch (error) {
        alert(mensagensDeErro(error).join("\n"));
    }
  }

  async function moverTarefa(id, novaColuna) {
    const tarefa = tarefas.find((t) => t.id === id);
    try {
      const resposta = await api.put (`/tarefas/${id}`, { ...tarefa, coluna: novaColuna });
      setTarefas(tarefas.map((t) => (t.id === id ? resposta.data : t)));
    } catch (error) {
      console.log(error)
      alert(mensagensDeErro(error).join("\n")); 
    }
  }

    return (
  <div id="App">
    <Header 
      titulo="TaskFlow - Mini Kanban" 
      subtitulo="Organize suas tarefas"
      afazer={tarefas.filter((tarefa) => tarefa.coluna === "afazer").length}
      andamento={tarefas.filter((tarefa) => tarefa.coluna === "andamento").length}
      concluidas={tarefas.filter((tarefa) => tarefa.coluna === "concluido").length} 
    />
    
    <main className="container">
      {carregando && (
        <p style={{ textAlign: 'center', color: '#94A3B8' }}>Carregando tarefas...</p>
      )}
      
      {erro && (
        <p style={{ textAlign: 'center', color: '#EF4444' }}>{erro}</p>
      )}

      {!carregando && !erro && (
        <>
          <div className={styles.colunas}>
            {/* A FAZER */}
            <div className={styles.coluna}>
              <div className="kanban-coluna-header">
                <h2>A Fazer</h2>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <button className="kanban-btn-add" onClick={() => abrirModalCriar("afazer")}>+</button>
                </div>
              </div>
              <ListarTarefas 
                tarefas={tarefas.filter((t) => t.coluna === "afazer")} 
                onDeletar={deletarTarefa} 
                onEditar={abrirModalEditar} 
                onMover={moverTarefa} 
                colunaAnterior={null} 
                colunaProxima="andamento" 
              />
            </div>

            {/* EM ANDAMENTO */}
            <div className={styles.coluna}>
              <div className="kanban-coluna-header">
                <h2>Em Andamento</h2>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <button className="kanban-btn-add" onClick={() => abrirModalCriar("andamento")}>+</button>
                </div>
              </div>
              <ListarTarefas 
                tarefas={tarefas.filter((t) => t.coluna === "andamento")} 
                onDeletar={deletarTarefa} 
                onEditar={abrirModalEditar} 
                onMover={moverTarefa} 
                colunaAnterior="afazer" 
                colunaProxima="concluido" 
              />
            </div>

            {/* CONCLUÍDO */}
            <div className={styles.coluna}>
              <div className="kanban-coluna-header">
                <h2>Concluído</h2>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <button className="kanban-btn-add" onClick={() => abrirModalCriar("concluido")}>+</button>
                </div>
              </div>
              <ListarTarefas 
                tarefas={tarefas.filter((t) => t.coluna === "concluido")} 
                onDeletar={deletarTarefa} 
                onEditar={abrirModalEditar} 
                onMover={moverTarefa} 
                colunaAnterior="andamento" 
                colunaProxima={null} 
              />
            </div>
          </div>

          <ModalTarefa 
            aberto={modalAberto} 
            onFechar={() => setModalAberto(false)} 
            onSalvar={salvarTarefa} 
            tarefa={tarefaEditando} 
            coluna={colunaAtiva} 
            prioridades={listaPrioridades} 
            usuarios={listaUsuarios} 
            projetos={listaProjetos} 
          />
        </>
      )}
    </main>

    <footer>
      <p>Jefferson Kauã - 2024</p>
    </footer>
  </div>
);
}
export default Kanban;
