import TarefaItem from './TarefaItem';


function ListaTarefas({ tarefas, onDeletar, onEditar }) {

    return (
        <section id='lista-section'>
                {tarefas.length === 0 && (
                    <p className='msg-vazia'>
                        Nenhuma tarefa cadastrada. Adicione uma acima!
                    </p>
                )}
            {tarefas.length > 0 && (
                <ul id='lista-tarefas'>
                    {tarefas.map(tarefa => (
                        <TarefaItem
                            key={tarefa.id}
                            texto={tarefa.texto}
                            concluida={tarefa.concluida}
                            prioridade={tarefa.prioridade}
                            projeto={tarefa.projeto || 'Sem projeto'}
                            usuario={tarefa.usuario || 'Sem responsável'}
                            onEditar={onEditar ? () => onEditar(tarefa) : null}
                            onDeletar={() => onDeletar(tarefa.id)}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}
export default ListaTarefas;