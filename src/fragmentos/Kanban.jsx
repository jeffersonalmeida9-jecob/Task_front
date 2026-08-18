import { useState } from "react";
import styles from "../css's/Kanban.module.css";
import ModalTarefa from "../Componentes/ModalTarefa";
import "../css's/Kanban.css";

function Kanban({ tarefas, setTarefas, moverTarefa, deletarTarefa }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [colunaAtiva, setColunaAtiva] = useState("afazer");
  const [filtroAfazer, setFiltroAfazer] = useState("todas");
  const [filtroAndamento, setFiltroAndamento] = useState("todas");
  const [filtroConcluida, setFiltroConcluida] = useState("todas");

  function filtrarTarefas(coluna, filtro) {
    return tarefas.filter((tarefa) => {
      if (tarefa.coluna !== coluna) return false;

      if (filtro === "todas") return true;

      return tarefa.prioridade === filtro;
    });
  }

  function abrirModalCriar(coluna) {
    setTarefaEditando(null);
    setColunaAtiva(coluna);
    setModalAberto(true);
  }

  function abrirModalEditar(tarefa) {
    setTarefaEditando(tarefa);
    setColunaAtiva(tarefa.coluna);
    setModalAberto(true);
  }

  function salvarTarefa(dados) {
    if (dados.id) {
      setTarefas(tarefas.map((tarefa) => tarefa.id === dados.id? { ...tarefa, ...dados }: tarefa));
    } else {
      setTarefas([...tarefas, {...dados, id: Date.now(), coluna: dados.coluna || colunaAtiva}]);
    }
    setModalAberto(false);
    setTarefaEditando(null);
  }

  return (
    <div className={styles.colunas}>

      {/* A FAZER */}
      <div className={styles.coluna}>
        <div className="kanban-coluna-header">
          <h2>A Fazer</h2>
          <div style={{ display: "flex", gap: "8px", alignItems: "center",}}>
            <span className="kanban-contador">
              {tarefas.filter((tarefa) => tarefa.coluna === "afazer").length}
            </span>
            <button className="kanban-btn-add" onClick={() => abrirModalCriar("afazer")}>+</button>
          </div>
        </div>
        <select
          value={filtroAfazer}
          onChange={(e) => setFiltroAfazer(e.target.value)}
          className={styles.filtro}
        >
          <option value="todas">Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>

        {filtrarTarefas("afazer", filtroAfazer).map((tarefa) => (
          <div className={`${styles.card} ${styles[`card-${tarefa.prioridade || "media"}`]}`} key={tarefa.id}>                
              <div className={styles.conteudo} onDoubleClick={() => abrirModalEditar(tarefa)}>
                <p>{tarefa.texto}</p>

                <span className={`${styles.prioridade} ${styles[tarefa.prioridade]}`}>
                  {tarefa.prioridade === "alta" && " Alta"}
                  {tarefa.prioridade === "media" && " Média"}
                  {tarefa.prioridade === "baixa" && " Baixa"}
                </span>

                <span className={styles.localizacao}>
                  📍 {tarefa.cidade} - {tarefa.estado}
                </span>
              </div>

              <div className={styles.botoes}>
                <button onClick={() =>   moverTarefa(tarefa.id, "andamento") }>Mover →</button>
                <button onClick={() => deletarTarefa(tarefa.id)}>X</button>
              </div>
            </div>
          ))}
      </div>

      {/* EM ANDAMENTO */}
      <div className={styles.coluna}>
        <div className="kanban-coluna-header">
          <h2>Em Andamento</h2>
          <button className="kanban-btn-add"  onClick={() => abrirModalCriar("andamento")}>+</button>
        </div>

        <select
          value={filtroAndamento}
          onChange={(e) => setFiltroAndamento(e.target.value)}
          className={styles.filtro}
        >
          <option value="todas">Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>

        {filtrarTarefas("andamento", filtroAndamento).map((tarefa) => (
          <div className={`${styles.card} ${styles[`card-${tarefa.prioridade || "media"}`]}`} key={tarefa.id}>                
              <div
                className={styles.conteudo}
                onDoubleClick={() => abrirModalEditar(tarefa)}
              >
                <p>{tarefa.texto}</p>

                <span className={`${styles.prioridade} ${styles[tarefa.prioridade]}`}>
                  {tarefa.prioridade === "alta" && " Alta"}
                  {tarefa.prioridade === "media" && " Média"}
                  {tarefa.prioridade === "baixa" && " Baixa"}
                </span>

                <span className={styles.localizacao}>
                  📍 {tarefa.cidade} - {tarefa.estado}
                </span>
              </div>

              <div className={styles.botoes}>
                <button  onClick={() => moverTarefa(tarefa.id, "afazer")}>← Mover</button>
                <button  onClick={() => moverTarefa(tarefa.id, "concluida")}>Mover →</button>
                <button  onClick={() => deletarTarefa(tarefa.id)}>X</button>
              </div>
            </div>
          ))}
      </div>

      {/* CONCLUÍDO */}
      <div className={styles.coluna}>
        <div className="kanban-coluna-header">
          <h2>Concluído</h2>
          <button className="kanban-btn-add" onClick={() => abrirModalCriar("concluida")}>+</button>
        </div>

        <select
          value={filtroConcluida}
          onChange={(e) => setFiltroConcluida(e.target.value)}
          className={styles.filtro}
        >
          <option value="todas">Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>

        {filtrarTarefas("concluida", filtroConcluida).map((tarefa) => (
          <div className={`${styles.card} ${styles[`card-${tarefa.prioridade || "media"}`]}`} key={tarefa.id}>                
            <div className={styles.conteudo}
                onDoubleClick={() => abrirModalEditar(tarefa)}
              >
                <p>{tarefa.texto}</p>

                <span className={`${styles.prioridade} ${styles[tarefa.prioridade]}`}>
                  {tarefa.prioridade === "alta" && " Alta"}
                  {tarefa.prioridade === "media" && " Média"}
                  {tarefa.prioridade === "baixa" && " Baixa"}
                </span>

                <span className={styles.localizacao}>
                  📍 {tarefa.cidade} - {tarefa.estado}
                </span>
              </div>

              <div className={styles.botoes}>
                <button  onClick={() => moverTarefa(tarefa.id, "andamento")}>← Mover</button>
                <button  onClick={() => deletarTarefa(tarefa.id)}>X</button>
              </div>
            </div>
          ))}
      </div>

      {/* MODAL */}
      {modalAberto && (
        <ModalTarefa
          tarefa={tarefaEditando}
          coluna={colunaAtiva}
          onSalvar={salvarTarefa}
          onFechar={() => {
            setModalAberto(false);
            setTarefaEditando(null);
          }}
        />
      )}
    </div>
  );
}

export default Kanban;