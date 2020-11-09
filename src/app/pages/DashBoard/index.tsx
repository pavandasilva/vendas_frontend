import React from 'react'
import { Container } from 'react-bootstrap'

export const DashBoard: React.FC = () => {
  return (
    <Container>

      <div className="navigation">
        <div className="navigation-menu-tab">

          <div className="text-center">
            <div className="navigation-menu-tab-header" data-toggle="tooltip" title="" data-placement="right">
              <a href="">
                <img src="" width="60px" className="p-2" />
              </a>
            </div>
          </div>

          <div className="flex-grow-1">
            <ul>
              <li className="nav-item @if(request()->segment(1) == 'clientes') active @endif">
                <a href="{{ url('clientes') }}" data-toggle="tooltip" data-placement="right" title="Clientes">
                  <i className="fas fa-user"></i>
                  <span className="text d-none">Clientes</span>
                </a>
              </li>

            </ul>
          </div>

          {/* <div>
                  <ul>
                      <li>
                          <a href="{{url('logout')}}" data-toggle="tooltip" data-placement="right" title="" data-original-title="Logout" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                          </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">@csrf</form>
                      </li>
                  </ul>
              </div> */}
        </div>

      </div>
    </Container>
  )
}
