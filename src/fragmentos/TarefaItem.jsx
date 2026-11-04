import styles from "../css's/TarefaItem.module.css";

function TarefaItem({ texto, concluida = false, prioridade = "", onDeletar, onEditar, onMover, colunaProxima = null, colunaAnterior = null, usuario = null, projeto = null }) {

    const classeItem = concluida ? styles.tarefa + ' ' + styles.concluida : styles.tarefa;

    const classeTexto = concluida ? styles.textoTarefa + " " + styles["texto-tarefa"] : styles.textoTarefa;

    const classePrioridade = styles['badge-prioridade'] + ' ' + styles['badge-' + prioridade];

    const modoKanban = onMover !== null;

    return (
        <li className={classeItem} onDoubleClick={onEditar}>
            <div className={styles.conteudoTarefa}>
                <div>
                    <span className={classeTexto}>
                        {texto}
                    </span>
                </div>

                    {(usuario || projeto) && (
                        <div className={styles.info}>
                            {usuario && (
                                <span className={styles.infoItem}>
                                    <span className={styles.infoRotulo}>Responsável</span>
                                    {usuario}
                                </span>
                            )}
                            {projeto && (
                                <span className={styles.infoItem}>
                                    <span className={styles.infoRotulo}>Projeto</span>
                                    {projeto}
                                </span>
                            )}
                        </div>
                    )}
                    </div>

            <div className={styles.acoesTarefa}>
                <span className={classePrioridade}>{prioridade}</span>
                {modoKanban && colunaAnterior && (
                    <button className={styles.btnMover} onClick={() => onMover(colunaAnterior)} title="Mover para coluna anterior" >
                        ←
                    </button>
                )}
                {modoKanban && colunaProxima && (
                    <button className={styles.btnMover} onClick={() => onMover(colunaProxima)} title="Mover para próxima coluna">
                        →
                    </button>
                )}
                <button className={styles.btnDeletar} onClick={e => {e.stopPropagation(); onDeletar();}}>
                    X
                </button>
            </div>
        </li>
    );
}
export default TarefaItem;