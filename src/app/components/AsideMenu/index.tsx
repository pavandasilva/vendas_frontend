import React, { useContext } from 'react'
import { FaChartBar, FaQuestion, FaClipboardList, FaUser, FaFolderOpen } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/imgs/logo_brasao.png'

import { SideBarContext } from '../../context'

export const AsideMenu: React.FC = () => {
  const { isVisible } = useContext(SideBarContext)

  return (
    <aside className={`navigation ${isVisible ? '' : 'toogle'}`}>

      <div className="logo">
        <img src={Logo} className="p-2" />
      </div>

      <ul className="menu">
        <li className="nav-item">
          <NavLink exact to="/" activeClassName='active'>
            <FaUser></FaUser>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='atendimentos' activeClassName='active'>
            <FaFolderOpen></FaFolderOpen>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/desempenho" activeClassName='active'>
            <FaChartBar></FaChartBar>
          </NavLink>
        </li>
        <li className="nav-item">
          <FaClipboardList></FaClipboardList>
        </li>
        <li className="nav-item">
          <FaQuestion></FaQuestion>
        </li>

      </ul>
    </aside>
  )
}
