import React from 'react'
import { Spinner } from 'react-bootstrap'
import './style.scss'

export const LoadingTable = () => (
  <div className="loading-wrapper">
    <Spinner variant="primary" animation="border" size="sm" />
  </div>
)
