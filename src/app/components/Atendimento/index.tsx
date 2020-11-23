import React, { useState } from 'react'

import { Cliente } from '../../../domain/clientes/models/cliente'
import { DashboardCliente } from '../DashboardCliente'
import { PedidoCliente } from '../PedidoCliente'
import { FaCalendar, FaDashcube, FaEdit, FaFilter, FaHandHoldingUsd, FaSearch, FaShoppingCart } from 'react-icons/fa'

interface AtendimentoProps {
  cliente: Cliente
}

export const Atendimento = ({ cliente }: AtendimentoProps) => {
  const [dashboard, setDashboard] = useState(true)
  const [pedido, setPedido] = useState(false)

  const handleDashboard = () => {
    setDashboard(true)
    setPedido(false)
  }

  const handlePedido = () => {
    setPedido(true)
    setDashboard(false)
  }

  return (
    <div id="atendimento" className="container-fluid">

      <div className="content">

        {dashboard && <DashboardCliente/>}
        {pedido && <PedidoCliente/>}

      </div>

      {/* PEDIDOS */}
      <div className="menu">
        <ul className="list-unstyled">
          <li className={dashboard ? 'active' : ''} onClick={handleDashboard}><span className="icon"><FaDashcube/></span> Dashboard</li>
          <li className="line"></li>
          <li className={pedido ? 'active' : ''} onClick={handlePedido}><span className="icon"><FaShoppingCart/></span> Pedidos</li>
          <li className="line"></li>
          <li><span className="icon"><FaHandHoldingUsd/></span> Financeiro</li>
        </ul>
      </div>

    </div>

  )
}

export default Atendimento
