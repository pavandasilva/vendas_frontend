import React from 'react'
import { Form, FormControl, InputGroup, Nav, Table } from 'react-bootstrap'
import { FaCalendar, FaDashcube, FaEdit, FaFilter, FaHandHoldingUsd, FaSearch, FaShoppingCart } from 'react-icons/fa'
import { Layout } from '../Layout'

import './style.scss'

export const Desempenho: React.FC = () => {
  return (
    <Layout title="Desempenho">
      <div id="atendimento" className="container-fluid">

        <div className="content">

          <div className="dashboard">
            <div className="title">Novo Pedido</div>

            <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/home">Pedido</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Produtos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  Disabled
                </Nav.Link>
              </Nav.Item>
            </Nav>

          </div>
  

        </div>


        {/* PEDIDOS */}
        <div className="menu">
          <ul className="list-unstyled">
            <li><span className="icon"><FaDashcube/></span> Dashboard</li>
            <li className="line"></li>
            <li><span className="icon"><FaShoppingCart/></span> Pedidos</li>
            <li className="line"></li>
            <li><span className="icon"><FaHandHoldingUsd/></span> Financeiro</li>
          </ul>
        </div>


      </div>
    </Layout>
  )
}
