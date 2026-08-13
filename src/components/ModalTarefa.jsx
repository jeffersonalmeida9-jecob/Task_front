import { useState, useEffect } from 'react';
import styles from "../css's/ModalTarefa.module.css";
import axios from 'axios';



function ModalTarefa({ aberto, onFechar, onSalvar, tarefa=null, coluna='afazer' }) {
    const [texto, setTexto] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [prioridade,setPrioridade]= useState('media');
// Preenche os campos ao abrir para edição
    useEffect(() => {
        if (tarefa) {
            setTexto(tarefa.texto);
            setCidade(tarefa.cidade || '');
            setPrioridade(tarefa.prioridade);
        } else {
            // Limpa os campos ao abrir para criação
            setTexto(''); setCep(''); setCidade(''); setPrioridade('media');
        }
    }, [tarefa, aberto]);


    async function consultarCidade(cepDigitado) {
        if (cepDigitado.trim().length < 8) return;
        try {
            const { data } = await axios.get(`https://viacep.com.br/ws/${cepDigitado}/json/`);
            if (!data.erro) setCidade(data.localidade + '/' + data.uf);
        } catch (e) { /* ignora erro de CEP silenciosamente */ }
    }

    function handleSalvar() {
        if (texto.trim() === '') return;
        // Monta o objeto com os dados do formulário
        // id: undefined na criação — Dashboard gera o id
        onSalvar({
            id: tarefa?.id, // undefined = criar | número = editar
            texto,
            cidade,
            prioridade,
            coluna: tarefa?.coluna || coluna,
        });
        onFechar();
    }

    return (

        // Overlay: clique fora fecha o modal
        <div className={styles.overlay} onClick={onFechar}>
            {/* stopPropagation: evita fechar ao clicar dentro do card */}
            <div className={styles.card} onClick={e => e.stopPropagation()}>
                <h2>{tarefa ? 'Editar tarefa' : 'Nova tarefa'}</h2>
                <input 
                    placeholder='Texto da tarefa' 
                    value={texto}
                    onChange={e => setTexto(e.target.value)} 
                />
                <input 
                    placeholder='CEP (opcional)' 
                    value={cep}
                    onChange={e => { setCep(e.target.value); consultarCidade(e.target.value); }} 
                />
                {cidade && 
                    <p className={styles.cidade}>{cidade}</p>}
                    <select value={prioridade} onChange={e => setPrioridade(e.target.value)}>
                        <option value='alta'>Alta</option>
                        <option value='media'>Média</option>
                        <option value='baixa'>Baixa</option>
                    </select>
                <div className={styles.botoes}>
                    <button onClick={onFechar}>Cancelar</button>
                    <button onClick={handleSalvar}>Salvar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalTarefa;
