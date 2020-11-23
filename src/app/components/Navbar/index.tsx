import React, { useCallback, useState } from 'react'
import capitalize from 'capitalize-pt-br'
import { FaSearch, FaCog, FaThLarge, FaBars } from 'react-icons/fa'
import { Button, Dropdown, Image, Modal } from 'react-bootstrap'
import { useSideBar, useUsuario } from '../../hooks/contexts'
import useLogout from '../../hooks/useLogout'
import { Link } from 'react-router-dom'
import './styles.scss'

export const Navbar = () => {
  const [show, setShow] = useState(false)
  const { toogle } = useSideBar()
  const { data } = useUsuario()
  const { execLogout } = useLogout()
  const handleClose = useCallback(() => setShow(false), [])
  const handleShow = useCallback(() => setShow(true), [])

  const handleLogoutClick = useCallback(() => {
    execLogout()
  }, [execLogout])

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
                <span>{capitalize(data?.nome as string)}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item><Link to='/meus-dados'>Meus Dados</Link></Dropdown.Item>
                <Dropdown.Item href="#/action-2">Notificações</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Configurações</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogoutClick}>Sair</Dropdown.Item>
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
