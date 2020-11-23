import React from 'react'

// import { Container } from './styles';

export const DashboardCliente: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="title">Dashboard
        <span className="float-right">
          {/* {cliente.razao_social} */}
        </span>
      </div>
      <div className="cards">
        <div className="row">
          <div className="col-3">
            <div className="card p-3 border">
              <span className="nome">Total de Clientes</span>
              <span className="valor h5">435</span>
            </div>
          </div>
          <div className="col-3">
            <div className="card p-3 border">
              <span className="nome">Total de Clientes</span>
              <span className="valor h5">435</span>
            </div>
          </div>
          <div className="col-3">
            <div className="card p-3 border">
              <span className="nome">Total de Clientes</span>
              <span className="valor h5">435</span>
            </div>
          </div>
          <div className="col-3">
            <div className="card p-3 border">
              <span className="nome">Total de Clientes</span>
              <span className="valor h5">435</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
