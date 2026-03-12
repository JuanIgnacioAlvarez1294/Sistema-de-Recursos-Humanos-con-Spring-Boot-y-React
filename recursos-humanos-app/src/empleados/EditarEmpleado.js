import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

export default function EditarEmpleado() {
  const navegacion = useNavigate();
  const { id } = useParams();

  const [empleado, setEmpleado] = useState({
    nombre: "",
    departamento: "",
    sueldo: "",
  });

  const { nombre, departamento, sueldo } = empleado;

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
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertimos a número antes de enviar
      const empleadoAEnviar = {
        ...empleado,
        sueldo: parseFloat(sueldo)
      };

      await axios.put(`http://localhost:8080/rh-app/empleados/${id}`, empleadoAEnviar);
      navegacion('/');
    } catch (error) {
      console.error("Error al editar empleado", error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-lg border-0 rounded-4">
          {/* Header con color de advertencia suave para indicar edición */}
          <div className="card-header text-white text-center py-4" style={{ backgroundColor: "#f59e0b", borderRadius: "12px 12px 0 0" }}>
            <h4 className="mb-0 fw-bold">Actualizar Información</h4>
            <p className="small mb-0 opacity-75">Modificando los datos del empleado ID: {id}</p>
          </div>
          
          <div className="card-body p-5 bg-white">
            <form onSubmit={(e) => onSubmit(e)}>
              {/* Campo Nombre */}
              <div className="mb-4">
                <label htmlFor="nombre" className="form-label fw-bold text-muted small text-uppercase">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg bg-light border-0"
                  id="nombre"
                  name="nombre"
                  required
                  value={nombre}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              {/* Campo Departamento */}
              <div className="mb-4">
                <label htmlFor="departamento" className="form-label fw-bold text-muted small text-uppercase">
                  Departamento / Área
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg bg-light border-0"
                  id="departamento"
                  name="departamento"
                  required
                  value={departamento}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              {/* Campo Sueldo */}
              <div className="mb-5">
                <label htmlFor="sueldo" className="form-label fw-bold text-muted small text-uppercase">
                  Sueldo Bruto
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted">$</span>
                  <input
                    type="number"
                    step="any"
                    className="form-control form-control-lg bg-light border-0"
                    id="sueldo"
                    name="sueldo"
                    required
                    value={sueldo}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-lg fw-bold shadow-sm text-white" style={{ backgroundColor: "#f59e0b", border: "none" }}>
                  Guardar Cambios
                </button>
                <Link to="/" className="btn btn-link text-muted text-decoration-none mt-2">
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}