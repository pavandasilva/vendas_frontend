import React from 'react'
import { Form, FormControl, InputGroup, Nav, Table } from 'react-bootstrap'
import { FaCalendar, FaDashcube, FaEdit, FaFilter, FaHandHoldingUsd, FaSearch, FaShoppingCart } from 'react-icons/fa'

export const PedidoCliente: React.FC = () => {
  return (
    <div className="pedidos">
      <div className="title">
        Pedidos
        <div className="float-right">
          <button className="btn btn-sm btn-dark">novo pedido</button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm"><FaSearch/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="input" />
          </InputGroup>
        </div>
        <div className="col-3">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm"><FaCalendar/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="input" value="2020/10 - 2020/11"/>
          </InputGroup>

        </div>
        <div className="col-3">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm"><FaFilter/></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select">
              <option>Pendente</option>
              <option>Faturado</option>
              <option>Aguardando Liberação</option>
              <option>Estoque</option>
              <option>Finalizados</option>
            </Form.Control>
          </InputGroup>
        </div>
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th className="align-middle text-center">#</th>
            <th className="align-middle text-center">Data</th>
            <th className="align-middle text-center">Depósito</th>
            <th className="align-middle text-center">Status</th>
            <th className="align-middle text-center">Valor</th>
            <th className="align-middle text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-middle text-center">320555</td>
            <td className="align-middle text-center">
      20/20/20
              <small className="d-block">22:00:14</small>
            </td>
            <td className="align-middle text-center">Jaú / SP</td>
            <td className="align-middle text-center">Finalizado</td>
            <td className="align-middle text-center">R$ 4.500,00</td>
            <td className="text-center">
              <button className="btn btn-sm"><FaEdit/></button>
            </td>
          </tr>
          <tr>
            <td className="align-middle text-center">320555</td>
            <td className="align-middle text-center">
      20/20/20
              <small className="d-block">22:00:14</small>
            </td>
            <td className="align-middle text-center">Jaú / SP</td>
            <td className="align-middle text-center">Finalizado</td>
            <td className="align-middle text-center">R$ 4.500,00</td>
            <td className="text-center">
              <button className="btn btn-sm"><FaEdit/></button>
            </td>
          </tr>
          <tr>
            <td className="align-middle text-center">320555</td>
            <td className="align-middle text-center">
      20/20/20
              <small className="d-block">22:00:14</small>
            </td>
            <td className="align-middle text-center">Jaú / SP</td>
            <td className="align-middle text-center">Finalizado</td>
            <td className="align-middle text-center">R$ 4.500,00</td>
            <td className="text-center">
              <button className="btn btn-sm"><FaEdit/></button>
            </td>
          </tr>
          <tr>
            <td className="align-middle text-center">320555</td>
            <td className="align-middle text-center">
      20/20/20
              <small className="d-block">22:00:14</small>
            </td>
            <td className="align-middle text-center">Jaú / SP</td>
            <td className="align-middle text-center">Finalizado</td>
            <td className="align-middle text-center">R$ 4.500,00</td>
            <td className="text-center">
              <button className="btn btn-sm"><FaEdit/></button>
            </td>
          </tr>
          <tr>
            <td className="align-middle text-center">320555</td>
            <td className="align-middle text-center">
      20/20/20
              <small className="d-block">22:00:14</small>
            </td>
            <td className="align-middle text-center">Jaú / SP</td>
            <td className="align-middle text-center">Finalizado</td>
            <td className="align-middle text-center">R$ 4.500,00</td>
            <td className="text-center">
              <button className="btn btn-sm"><FaEdit/></button>
            </td>
          </tr>

        </tbody>
      </Table>

    </div>
  )
}
