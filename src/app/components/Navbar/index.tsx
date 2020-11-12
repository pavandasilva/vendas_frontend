import React, { useContext, useState } from 'react'

import './styles.scss'
import { FaSearch, FaCog, FaThLarge, FaBars } from 'react-icons/fa'
import { SideBarContext } from '../../context'
import { Button, Dropdown, Image, Modal } from 'react-bootstrap'

export const Navbar: React.FC = () => {
  const [show, setShow] = useState(false)

  const { toogle } = useContext(SideBarContext)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className="navbar">
      <div className="d-flex w-100">

        <div className="mr-auto">
          <ul className="float-right list-unstyled list-group list-group-horizontal">
            <FaBars className="icon" onClick={toogle} />

          </ul>
        </div>

        <div className="float-right">

          <div className="float-right pl-3">
            <Dropdown>
              <Dropdown.Toggle as="div" bsPrefix="avatar">
                <Image src="https://www.w3schools.com/howto/img_avatar.png" roundedCircle />
                <span>Leandro</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Meus Dados</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Notificações</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Configurações</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-3">Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="float-right">
            <FaSearch className="icon" />
            <FaCog className="icon" onClick={handleShow} />
          </div>

          <div className="float-right">
            <Dropdown alignRight >
              <Dropdown.Toggle as="div" bsPrefix="avatar">
                <FaThLarge className="icon" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Header>Sistemas</Dropdown.Header>

              </Dropdown.Menu>
            </Dropdown>
          </div>

        </div>

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>

  )
}
