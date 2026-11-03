import { Route, Routes } from "react-router-dom";
import RotaPrivada from "./fragmentos/RotaPrivada";
import Login from "./Pages/Login";
import Sobre from "./Pages/sobre";
import Sidebar from "./Pages/Sidebar";
import Kanban from "./fragmentos/Kanban";



function App() {

  return (

    <div className="app-layout">
      <Sidebar />
      <main className="app-conteudo">
        <Routes>
          <Route path="/" element={<RotaPrivada><Kanban/></RotaPrivada>}></Route>
          <Route path="/sobre" element={<Sobre/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<h1>Pagina não encontrada</h1>}></Route>
        </Routes>
      </main>
    </div>
  );
}

 export default App