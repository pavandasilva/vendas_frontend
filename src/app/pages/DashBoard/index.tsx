import React from 'react'

import { Layout } from '../Layout'

export const DashBoard: React.FC = () => {
  return (
    <Layout title="Dashboard">
      <div id="container" className="container-fluid">
        <div className="card">
          <div className="card-body">
              Dashboard
          </div>
        </div>
      </div>
    </Layout>
  )
}
