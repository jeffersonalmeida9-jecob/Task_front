import styles from "../css's/Kanban.module.css";

function Kanban({ tarefas, moverTarefa, deletarTarefa }) {
  return (
    <div className={styles.colunas}>

      <div className={styles.coluna}>
        <h2>A Fazer</h2>

        {tarefas
          .filter((tarefa) => tarefa.coluna === "afazer")
          .map((tarefa) => (
            <div className={styles.card} key={tarefa.id}>
              <div className={styles.conteudo}>
                <p>{tarefa.texto}</p>
                <span className={styles.localizacao}>
                  📍{tarefa.cidade} - {tarefa.estado}
                </span>
              </div>  

              <div className={styles.botoes}>
                <button onClick={() => moverTarefa(tarefa.id, "andamento")}>Mover →</button>
                <button onClick={() =>deletarTarefa(tarefa.id)}>X</button>
              </div>
            </div>
          ))
        }
      </div>

      <div className={styles.coluna}>
        <h2>Em Andamento</h2>

        {tarefas
          .filter((tarefa) => tarefa.coluna === "andamento")
          .map((tarefa) => (
            <div className={styles.card} key={tarefa.id}>
              <div className={styles.conteudo}>
                <p>{tarefa.texto}</p>
                <span className={styles.localizacao}>
                  📍{tarefa.cidade} - {tarefa.estado}
                </span>
              </div>

              <div className={styles.botoes}>
                <button onClick={() =>moverTarefa(tarefa.id, "afazer")}> ← Mover</button>
                <button onClick={() =>moverTarefa(tarefa.id, "concluida")}>Mover →</button>
                <button onClick={() =>deletarTarefa(tarefa.id)}>X</button>
              </div>
            </div>
          ))
        }
      </div>


      {/* CONCLUÍDO */}
      <div className={styles.coluna}>
        <h2>Concluído</h2>

        {tarefas
          .filter((tarefa) => tarefa.coluna === "concluida")
          .map((tarefa) => (
            <div className={styles.card} key={tarefa.id}>
              <div className={styles.conteudo}>
                <p>{tarefa.texto}</p>
                <span className={styles.localizacao}>
                  📍{tarefa.cidade} - {tarefa.estado}
                </span>
              </div>
              <div className={styles.botoes}>
                <button onClick={() => moverTarefa(tarefa.id, "andamento")}>← Mover</button>
                <button onClick={() => deletarTarefa(tarefa.id)}>X</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Kanban;