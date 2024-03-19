import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditarEmpleado() {
  const navegacion = useNavigate();
  const { id } = useParams();

  const [empleado, setEmpleado] = useState({
    nombre: "",
    departamento: "",
    sueldo: "",
  });

  useEffect(() => {
    cargarEmpleado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const cargarEmpleado = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/rh-app/empleados/${id}`);
      setEmpleado(response.data);
    } catch (error) {
      console.error("Error al cargar empleado", error);
    }
  };

  const onInputChange = (e) => {
    //Spread operator ...(expandir los atributos)
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convertir sueldo a número
      empleado.sueldo = parseFloat(empleado.sueldo);

      // Enviar datos al backend usando Axios
      await axios.put(`http://localhost:8080/rh-app/empleados/${id}`, empleado);

      // Redirigir a la página de inicio
      navegacion('/');
    } catch (error) {
      console.error("Error al editar empleado", error);
    }
  };

  const { nombre, departamento, sueldo } = empleado; // Desestructura los campos del objeto empleado

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Editar Empleado</h3>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            required={true}
            value={nombre}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="departamento" className="form-label">
            Departamento
          </label>
          <input
            type="text"
            className="form-control"
            id="departamento"
            name="departamento"
            value={departamento}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sueldo" className="form-label">
            Sueldo
          </label>
          <input
            type="number"
            step="any"
            className="form-control"
            id="sueldo"
            name="sueldo"
            value={sueldo}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Guardar
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Regresar
          </a>
        </div>
      </form>
    </div>
  );
}
