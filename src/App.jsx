import { Route, Routes } from "react-router-dom";
import RotaPrivada from "./Fragmentos/RotaPrivada";
import TarefaV1 from "./Componentes/TarefaV1";
import Login from "./Pages/Login";
import Sobre from "./Pages/Sobre";
import Sidebar from "./Pages/Sidebar";



function App() {

  return (

    <div className="app-layout">
      <Sidebar />
      <main className="app-conteudo">
        <Routes>
          <Route path="/" element={<RotaPrivada><TarefaV1 /></RotaPrivada>}></Route>
          <Route path="/sobre" element={<Sobre/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<h1>Pagina não encontrada</h1>}></Route>
        </Routes>
      </main>
    </div>
  );
}

 export default App