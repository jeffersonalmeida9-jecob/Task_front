import { useState, useEffect } from 'react';
import styles from "../css's/ModalTarefa.module.css";
import axios from 'axios';



function ModalTarefa({ aberto, onFechar, onSalvar, tarefa=null, coluna='afazer' }) {
    
    const [texto, setTexto] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [prioridade,setPrioridade]= useState('media');
    const [estado, setEstado] = useState('');

   useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") {onFechar();}
        }
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onFechar]);


    useEffect(() => {
        if (tarefa) {
            setTexto(tarefa.texto);
            setCidade(tarefa.cidade || '');
            setEstado(tarefa.estado || '');
            setCep(tarefa.cep || '');
            setPrioridade(tarefa.prioridade);
        } else {
            setTexto('');
            setCep('');
            setCidade('');
            setEstado('');
            setPrioridade('media');
        }
    }, [tarefa, aberto]);


    async function consultarCidade(cepDigitado) {
        if (cepDigitado.trim().length < 8) return;
        try {
            const { data } = await axios.get(`https://viacep.com.br/ws/${cepDigitado}/json/`);
            if (!data.erro) {setCidade(data.localidade); setEstado(data.uf);}
        } catch {}
    }

    function handleSalvar() {
        if (texto.trim() === '') return;
        onSalvar({
            id: tarefa?.id,
            texto,
            cep,
            cidade,
            estado,
            prioridade,
            coluna: tarefa?.coluna || coluna,
        });
        onFechar();
    }

    return (
        <div className={styles.overlay} onClick={onFechar}>
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
                    <p className={styles.cidade}>{cidade} {estado && ` / ${estado}`}</p>}
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
