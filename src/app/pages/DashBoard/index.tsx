import React, { useEffect, useState, useContext } from 'react'
import capitalize from 'capitalize-pt-br'
import { Table } from 'react-bootstrap'
import { makeTrazerClientesFidelizados } from '../../../domain/clientes/factories/makeTrazerClientesFidelizados'
import { Cliente } from '../../../domain/clientes/models/cliente'
import { UsuarioContext } from '../../context'
import { Layout } from '../Layout'
import { Clientes } from '../../components'

const trazerClientesFidelizados = makeTrazerClientesFidelizados()

export const DashBoard: React.FC = () => {
  return (
    <Layout title="Dashboard">
      <div id="container" className="container-fluid">
        <Clientes />
      </div>
    </Layout>
  )
}
