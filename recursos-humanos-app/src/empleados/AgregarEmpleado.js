import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AgregarEmpleado() {
  const [empleado, setEmpleado] = useState({
    nombre: "",
    departamento: "",
    sueldo: "",
  });

  const { nombre, departamento, sueldo } = empleado;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id){
      cargarEmpleado(id);
    }
  }, [id]);

  const cargarEmpleado = async (id) => {
    try {
      // Hacer una solicitud para obtener los datos del empleado por ID
      const response = await axios.get(`http://localhost:8080/rh-app/empleados/${id}`);
      const empleadoCargado = response.data;

      // Establecer los datos del empleado cargado en el estado
      setEmpleado({
        nombre: empleadoCargado.nombre,
        departamento: empleadoCargado.departamento,
        sueldo: empleadoCargado.sueldo,
      });
    } catch (error) {
      console.error("Error al cargar el empleado", error);
    }
  };

  const onInputChange = (e) => {
    //Spread operator ...(expandir los atributos)
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verificar si es una solicitud de edición o agregado
      if (id) {
        // Si hay un ID, realizar una solicitud de actualización
        await axios.put(`http://localhost:8080/rh-app/empleados/${id}`, {
          nombre,
          departamento,
          sueldo: parseFloat(sueldo),
        });
      } else {
        // Si no hay un ID, realizar una solicitud de agregar
        await axios.post("http://localhost:8080/rh-app/empleados", {
          nombre,
          departamento,
          sueldo: parseFloat(sueldo),
        });
      }

      // Después de agregar o editar el empleado, redirige a la página principal
      navigate('/');
    } catch (error) {
      console.error("Error al agregar o editar empleado", error);
    }
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Agregar Empleado</h3>
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
            Agregar
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Regresar
          </a>
        </div>
      </form>
    </div>
  );
}
