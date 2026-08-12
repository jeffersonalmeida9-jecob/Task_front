import styles from "../css's/Header.module.css";

function Header({ titulo, subtitulo, afazer , andamento, concluidas}) {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1 id="titulo">{titulo}</h1>
                <p id="subtitulo">{subtitulo}</p>
            </div>

            <div className={styles.contadores}>
                <button>A fazer: {afazer}</button>
                <button>Em andamento: {andamento}</button>
                <button>Concluídas: {concluidas}</button>
            </div>
        </header>
    );
}
export default Header;