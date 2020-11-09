import React from 'react'
import { Container } from 'react-bootstrap'

import Logo from '../../assets/imgs/logo_brasao.png'

import { FaUser } from 'react-icons/fa'
import { Footer } from '../../components/Footer'

export const DashBoard: React.FC = () => {
  return (
    <Container fluid>

      <div className="" id="main">

        <div className="navigation">

          <div className="navigation-menu-tab">
            <div className="text-center">
              <div className="navigation-menu-tab-header" >
                <img src={Logo} width="60px" className="p-2" />
              </div>
            </div>
            <div className="flex-grow-1">

              <ul className="menu">
                <li className="nav-item">
                  <FaUser></FaUser>
                </li>
                <li className="nav-item">
                  <FaUser></FaUser>
                </li>
                <li className="nav-item">
                  <FaUser></FaUser>
                </li>
              </ul>

            </div>
            <div>
              <ul>

                <li>
                  <a href="https://intranet.route66.com.br/logout" ></a>
                  <form id="logout-form" action="https://intranet.route66.com.br/logout" method="POST">
                  </form>
                </li>
              </ul>
            </div>
          </div>

        </div>


        <div className="main-content">

          <div>
            <div className="header">
              <div className="container d-flex">

                <div className="mr-auto">
                  <ul className="float-right list-unstyled list-group list-group-horizontal">


                  </ul>
                </div>

                <div className="float-right">
                  <div className="float-right">
                    <i className="fas fa-search icon"></i>
                    <i className="fas fa-cog icon"></i>
                  </div>
                </div>

              </div>
            </div>


            <div className="page-header">

              <div className="container-fluid d-sm-flex justify-content-between">
                <h1>
                  Dashboard


                </h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="https://intranet.route66.com.br">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                  </ol>
                </nav>
              </div>
            </div>

            <div id="main" className="col ml-sm-auto px-4">

              <div className="container-fluid">


                <div className="card">
                  <div className="card-body">

                    <h4> Olá, Leandro </h4>
	  <p>11:47:19</p>

                  </div>
                </div>




              </div>

            </div>


          </div>

        <Footer />



        </div>
      </div>

    </Container>
  )
}
