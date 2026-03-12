import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

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
    if (id) {
      cargarEmpleado(id);
    }
  }, [id]);

  const cargarEmpleado = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/rh-app/empleados/${id}`);
      const empleadoCargado = response.data;
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
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8080/rh-app/empleados/${id}`, {
          nombre,
          departamento,
          sueldo: parseFloat(sueldo),
        });
      } else {
        await axios.post("http://localhost:8080/rh-app/empleados", {
          nombre,
          departamento,
          sueldo: parseFloat(sueldo),
        });
      }
      navigate('/');
    } catch (error) {
      console.error("Error al agregar o editar empleado", error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header text-white text-center py-4" style={{ backgroundColor: "#1e3a8a", borderRadius: "12px 12px 0 0" }}>
            <h4 className="mb-0 fw-bold">{id ? "Actualizar Colaborador" : "Registro de Nuevo Empleado"}</h4>
            <p className="small mb-0 opacity-75">Complete los datos del perfil corporativo</p>
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
                  placeholder="Ej. Juan Pérez"
                  id="nombre"
                  name="nombre"
                  required
                  value={nombre}
                  onChange={(e) => onInputChange(e)}
                  style={{ fontSize: "1rem" }}
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
                  placeholder="Ej. IT, Ventas, RRHH"
                  id="departamento"
                  name="departamento"
                  required
                  value={departamento}
                  onChange={(e) => onInputChange(e)}
                  style={{ fontSize: "1rem" }}
                />
              </div>

              {/* Campo Sueldo */}
              <div className="mb-5">
                <label htmlFor="sueldo" className="form-label fw-bold text-muted small text-uppercase">
                  Sueldo Bruto (Mensual)
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 text-muted">$</span>
                  <input
                    type="number"
                    step="any"
                    className="form-control form-control-lg bg-light border-0"
                    placeholder="0.00"
                    id="sueldo"
                    name="sueldo"
                    required
                    value={sueldo}
                    onChange={(e) => onInputChange(e)}
                    style={{ fontSize: "1rem" }}
                  />
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-lg fw-bold shadow-sm" style={{ backgroundColor: "#1e3a8a", border: "none" }}>
                  {id ? "Guardar Cambios" : "Dar de Alta"}
                </button>
                <Link to="/" className="btn btn-link text-muted text-decoration-none mt-2">
                  Cancelar y volver
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}