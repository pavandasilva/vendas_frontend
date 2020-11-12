import React, { useContext } from 'react'
import { FaUser } from 'react-icons/fa'
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
          <FaUser></FaUser>
        </li>
        <li className="nav-item active">
          <FaUser></FaUser>
        </li>

      </ul>
    </aside>
  )
}
