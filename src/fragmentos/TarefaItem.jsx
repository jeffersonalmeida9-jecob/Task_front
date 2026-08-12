import styles from "../css's/TarefaItem.module.css";

function TarefaItem({ texto, cidade, estado, concluida = false, prioridade = 'media', onDeletar, onConcluir }) {

    // Classe do li muda conforme o estado concluida

    const classeItem = concluida ? styles.tarefa + ' ' + styles.concluida : styles.tarefa;
    // Classe do texto tambem muda

    const classeTexto = concluida ? styles.textoTarefaConcluido : styles.textoTarefa;

    const classePrioridade = prioridade === styles['badge-prioridade'] + ' ' + styles['badge-' + prioridade];

    return (
        <li className={classeItem} onClick={onConcluir}>
            <div>
                <span className={classeTexto}>{texto}</span>
                {cidade && estado && (
                    <small className={styles.localizacao}>
                        {cidade} - {estado}
                    </small>
                )}
            </div>
            <div className={styles.acoesTarefa}>
                <span className={classePrioridade}>{prioridade}</span>
                <button className={styles.btnDeletar} onClick={e => {e.stopPropagation(); onDeletar();}}>X</button>
            </div>
        </li>
    );
}
export default TarefaItem;