import React from "react";
import { Link } from "react-router-dom";

export default function Navegacion() {
  // Estilo personalizado para el azul corporativo
  const navStyle = {
    backgroundColor: "#1e3a8a", // Azul Navy Profundo
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "0.8rem 1rem"
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow" style={navStyle}>
      <div className="container">
        {/* Branding con un toque más pro */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <span style={{ color: "#60a5fa", marginRight: "8px" }}>●</span> 
          TalentFlow <span className="fw-light ms-2" style={{fontSize: "0.85rem", opacity: 0.8}}>| RRHH</span>
        </Link>

        {/* Botón Hamburguesa para Mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de Navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link px-3" aria-current="page" to="/">
                Dashboard
              </Link>
            </li>
            
            {/* Botón de acción resaltado */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <Link 
                className="btn btn-outline-light btn-sm px-4 rounded-pill" 
                to="/agregar"
                style={{ transition: "all 0.3s" }}
              >
                + Nuevo Empleado
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}