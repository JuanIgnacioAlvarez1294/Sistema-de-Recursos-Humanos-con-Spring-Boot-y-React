import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListadoEmpleados from "./empleados/ListadoEmpleados";
import Navegacion from "./plantilla/Navegacion";
import AgregarEmpleado from "./empleados/AgregarEmpleado";
import EditarEmpleado from "./empleados/EditarEmpleado";
import { db } from "./firebase";

function App() {
  return (
    /* Cambiamos el container por un div de ancho completo y fondo gris claro para que resalten las tarjetas */
    <div style={{ backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <BrowserRouter>
        <Navegacion />
        {/* El contenido principal ahora va dentro de un contenedor con padding superior e inferior */}
        <div className="container py-5">
          <Routes>
            <Route exact path="/" element={<ListadoEmpleados db={db} />} />
            <Route exact path="/agregar" element={<AgregarEmpleado db={db} />} />
            <Route exact path="/editar/:id" element={<EditarEmpleado db={db} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;