import React from "react"
import { Link } from "react-router-dom";

import '../global.css'

export default function () {
  return (
    <div>
      <div className="faixa"></div>

      <div className="conta-container">
          <div className="caixa-container">
              <Link className="link-custom-primary text-decoration-none" to="/login/medico">
                <img className="img-tipo-contas" src="https://projetopuc.blob.core.windows.net/agimed/medic.svg" alt="" />
                <p>Sou médico</p>
              </Link>
          </div>
          <div className="caixa-container">
            <Link className="link-custom-primary text-decoration-none" to="/login/paciente">
              <img className="img-tipo-contas" src="https://projetopuc.blob.core.windows.net/agimed/pacient.svg" alt="" />
              <p>Sou paciente</p>
            </Link>
          </div>
      </div>
      <div className="faixa fixed-bottom"></div>
    </div>
  )
}