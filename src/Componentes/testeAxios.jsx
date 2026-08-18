//import axios from 'axios'
import { useState } from 'react';

function Axios_t() {

    const [cepData, setCepData] = useState("");


    /*async function exemplo() {
        try {
            const resposta = await axios.get('https://jsonplaceholder.typicode.com/users/1');
            console.log(resposta.data.name); 
            console.log(resposta.status); 
        } catch (erro) {
            console.log(erro.message);
        };
     };*/

    async function consultarCEP(cep) {
        try {
            const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                console.log(resposta.data); 
                console.log(resposta.status); 
        } catch (erro) {
                console.log(erro.message);
            };
    };

    return (
        <div>
          {/*<button onClick={exemplo}>Testar axios</button>*/}  
          <br/> 
          <input 
          type="text"
          placeholder='Digite o CEP'
          value={cepData}
          onChange={(e) => setCepData(e.target.value)}
           />
          <button onClick={() => consultarCEP(cepData)}>minhas info.</button>   
        </div>
            );

}

export default Axios_t