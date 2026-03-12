import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
// Importamos los iconos de Lucide
import { Pencil, Trash2, Users, DollarSign, UserPlus } from "lucide-react";

export default function ListadoEmpleados() {
  const urlBase = "http://localhost:8080/rh-app/empleados";
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const resultado = await axios.get(urlBase);
    setEmpleados(resultado.data);
  };

  const eliminarEmpleado = async (id) => {
    if (window.confirm("¿Desea eliminar este registro de forma permanente?")) {
      await axios.delete(`${urlBase}/${id}`);
      cargarEmpleados();
    }
  };

  const presupuestoTotal = empleados.reduce((total, emp) => total + emp.sueldo, 0);

  return (
    <div className="container mt-2">
      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm border-0" style={{ borderLeft: "5px solid #1e3a8a" }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted text-uppercase small fw-bold">Total Colaboradores</h6>
                  <h2 className="fw-bold mb-0 text-dark">{empleados.length}</h2>
                </div>
                <div className="p-3 bg-light rounded-circle">
                  <Users size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow-sm border-0" style={{ borderLeft: "5px solid #10b981" }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted text-uppercase small fw-bold">Presupuesto Nómina</h6>
                  <h2 className="fw-bold mb-0 text-dark">
                    <NumericFormat
                      value={presupuestoTotal}
                      displayType={"text"}
                      thousandSeparator=","
                      prefix={"$"}
                      decimalScale={2}
                      fixedDecimalScale
                    />
                  </h2>
                </div>
                <div className="p-3 bg-light rounded-circle">
                  <DollarSign size={24} className="text-success" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE GESTIÓN */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-dark">Gestión de Talento</h5>
          <Link to="/agregar" className="btn btn-primary btn-sm d-flex align-items-center gap-2">
            <UserPlus size={16} /> Nuevo
          </Link>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ backgroundColor: "#f8fafc" }}>
                <tr>
                  <th className="ps-4" style={{ width: "80px" }}>#</th>
                  <th>Colaborador</th>
                  <th>Departamento</th>
                  <th>Sueldo Bruto</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado, indice) => (
                  <tr key={empleado.idEmpleado}>
                    <td className="ps-4 text-muted fw-bold">{indice + 1}</td>
                    <td>
                      <div className="fw-bold text-dark">{empleado.nombre}</div>
                    </td>
                    <td>
                      <span className="badge px-3 py-2 rounded-pill" style={{backgroundColor: "#e0e7ff", color: "#4338ca"}}>
                        {empleado.departamento}
                      </span>
                    </td>
                    <td className="fw-semibold text-dark">
                      <NumericFormat
                        value={empleado.sueldo}
                        displayType={"text"}
                        thousandSeparator=","
                        prefix={"$"}
                        decimalScale={2}
                        fixedDecimalScale
                      />
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        {/* BOTÓN EDITAR (Amarillo) */}
                        <Link 
                          to={`/editar/${empleado.idEmpleado}`} 
                          className="btn btn-sm btn-warning d-flex align-items-center gap-2 px-3 fw-bold shadow-sm"
                          style={{ color: "#333" }}
                        >
                          <Pencil size={14} /> Editar
                        </Link>
                        {/* BOTÓN ELIMINAR (Rojo) */}
                        <button 
                          onClick={() => eliminarEmpleado(empleado.idEmpleado)}
                          className="btn btn-sm btn-danger d-flex align-items-center gap-2 px-3 fw-bold shadow-sm"
                        >
                          <Trash2 size={14} /> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}