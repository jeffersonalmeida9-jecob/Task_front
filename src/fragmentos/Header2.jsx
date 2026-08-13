import styles from "../css's/Header2.module.css";

function Header({ titulo, subtitulo, total, pendentes, concluidas, filtro, setFiltro }) {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1 id="titulo">{titulo}</h1>
                <p id="subtitulo">{subtitulo}</p>
            </div>

            <div className={styles.contadores}>
                <button className={ `${styles.total} ${filtro === 'todas' ? styles.ativoTotal : ''}` } onClick={() => setFiltro('todas')}>Total: {total}</button>
                <button className={ `${styles.pendentes} ${filtro === 'pendentes' ? styles.ativoPendentes : ''}` } onClick={() => setFiltro('pendentes')}>Pendentes: {pendentes}</button>
                <button className={ `${styles.concluidas} ${filtro === 'concluidas' ? styles.ativoConcluidas : ''}` } onClick={() => setFiltro('concluidas')}>Concluídas: {concluidas}</button>
            </div>
             
        </header>
    );
}
export default Header;