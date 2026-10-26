import { useState, useEffect } from 'react';
import styles from "../css's/ModalTarefa.module.css";
//import axios from 'axios';
import { mensagensDeErro } from '../api';
import { useAuth } from "../contexts/AuthContext"

function paraNumero(valor) {
  return valor ? Number(valor) : null;
}

function ModalTarefa({ aberto, onFechar, onSalvar, tarefa=null, coluna='afazer', projetos=[], prioridades=[], usuarios=[] }) {
    
    const { usuario } = useAuth();
    const [salvando, setSalvando] = useState(false);
    const [texto, setTexto] = useState('');
    const [idPrioridade, setIdPrioridade] = useState(2);
    const [idUsuario, setIdUsuario] = useState("");
    const [idProjeto, setIdProjeto] = useState("");
    //const [prioridade,setPrioridade]= useState('media');
    const [erros, setErros] = useState([]);

   useEffect(() => {
        setErros([]);
        if (tarefa) {
            setTexto(tarefa.texto);
            setIdPrioridade(tarefa.idprioridade);
            setIdUsuario(tarefa.idUsuario);
            setIdProjeto(tarefa.idProjeto);
        } else {
            setTexto('');
            setIdPrioridade(2);
            setIdUsuario(usuario?.id || usuarios[0]?.id || "");
            setIdProjeto(projetos[0]?.id || "");
        }
    }, [tarefa, aberto]);

    useEffect(() => {
        if (!aberto)  return;
        function handleEsc(e) {
            if (e.key === "Escape") onFechar(); 
        }
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [onFechar, aberto]);

    async function handleSalvar() {
        setErros([]);
        setSalvando(true);
        try { await onSalvar({ ...tarefa, 
                                id: tarefa?.id, 
                                texto, 
                                coluna: tarefa?.coluna || coluna,
                                idPrioridade: paraNumero(idPrioridade),
                                idUsuario: paraNumero(idUsuario),
                                idProjeto: paraNumero(idProjeto)
                            });
        onFechar();
        }
        catch (erro) {
            setErros(mensagensDeErro(erro));
        } finally {
            setSalvando(false);
        }
    }

    if (!aberto) return null;

    return (
        <div className={styles.overlay} onClick={onFechar}>
            <div className={styles.card} onClick={e => e.stopPropagation()}>
                <h2>{tarefa ? 'Editar tarefa' : 'Nova tarefa'}</h2>
                <input 
                    placeholder='Texto da tarefa' 
                    value={texto}
                    onChange={e => setTexto(e.target.value)} 
                />

                    {/*select de prioridade*/}
                    <select value={idPrioridade} onChange={(e) => setIdPrioridade(e.target.value)}>
                        {prioridades.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nome}
                            </option>
                        ))}
                    </select>

                    {/*select de projeto*/}
                     <select value={idProjeto} onChange={(e) => setIdProjeto(e.target.value)}>
                        {projetos.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nome}
                            </option>
                        ))}
                    </select>
                    
                    {/*select de usuario*/}
                    <select value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)}>
                        {usuarios.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.nome}
                            </option>
                        ))}
                    </select>

                    {erros.length > 0 && (
                        <ul className={styles.erros}>
                            {erros.map((mensagem, i) => (
                            <li key={i}>{mensagem}</li>
                            ))}
                        </ul>
                    )}

                <div className={styles.botoes}>
                    <button onClick={onFechar}>Cancelar</button>
                    <button onClick={handleSalvar}disabled={salvando}>{salvando ? "Salvando..." : "Salvar"}</button>
                </div>
            </div>
        </div>
    );
}

export default ModalTarefa;
