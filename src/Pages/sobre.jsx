import styles from "../css's/Sobre.module.css";

function Sobre() {
    return (
        <main className={styles.sobre}>
            <div className={styles.container}>

                <h1>Sobre o projeto</h1>

                <p>
                    Este projeto é uma aplicação de gerenciamento de tarefas
                    desenvolvida durante o curso de programação Full Stack.
                </p>

                <section>
                    <h2>Como funciona?</h2>

                    <p>
                        O sistema permite criar e organizar tarefas em um
                        quadro Kanban. Cada coluna possui um título que indica
                        em qual etapa a tarefa está.
                    </p>

                    <p>
                        As tarefas podem ser criadas, alteradas, excluídas e
                        movidas entre as diferentes colunas.
                    </p>
                </section>

                <section>
                    <h2>Principais funcionalidades</h2>

                    <ul>
                        <li>Criar novas tarefas</li>
                        <li>Editar tarefas existentes</li>
                        <li>Excluir tarefas</li>
                        <li>Alterar a coluna das tarefas</li>
                        <li>Visualizar as tarefas organizadas</li>
                    </ul>
                </section>

                <section>
                    <h2>Objetivo</h2>

                    <p>
                        O objetivo do projeto é facilitar a organização de
                        tarefas e, ao mesmo tempo, colocar em prática os
                        conhecimentos de desenvolvimento Full Stack aprendidos
                        durante o curso.
                    </p>
                </section>
            </div>
        </main>
    )
}

export default Sobre