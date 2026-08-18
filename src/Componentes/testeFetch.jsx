function  Fetch() {
    
    //apenas a const
    const minhaPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const operacaoDeuCerto = true;

        if (operacaoDeuCerto) {
          resolve("Dados chegaram!");
        } else {
          reject("Algo deu errado");
        }
      }, 5000);
    });
  
  //função juntando tudo
  function executaPromise() {
    const minhaPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const operacaoDeuCerto = true;

        if (operacaoDeuCerto) {
          resolve("Dados chegaram!");
        } else {
          reject("Algo deu errado");
        }
      }, 5000);
    });

    minhaPromise
      .then((mensagem) => {
        console.log("Sucesso:", mensagem);
      })
      .catch((erro) => {
        console.log("Erro:", erro);
      });
    console.log("Promisse criada, aguardando resultado...");
  }

  //segunda forma
  async function buscarUsuario(id) {
    
    try {
      const resposta = await fetch (
        'https://jsonplaceholder.typicode.com/users/' + id
      );
      const usuario = await resposta.json();
      console.log('Nome:', usuario.name);
      return null;
    }finally {
      console.log ('Finalizado');
    }
  }
  

  return (
    <div>
      <button
        onClick = {() => {
          minhaPromise
            .then((mensagem) => {
              console.log("Sucesso:", mensagem);
            })
            .catch((erro) => {
              console.log("Erro:", erro);
            });
          console.log("Promisse criada, aguardando resultado...");
        }}
      >
        Testar promise
      </button>
      <button onClick = {executaPromise}
      >
       Testar promise (funcao)
      </button>
      <button onClick={() => {buscarUsuario(1)}}>
        chama ele
      </button>
    </div>
  ) 
}

export default Fetch