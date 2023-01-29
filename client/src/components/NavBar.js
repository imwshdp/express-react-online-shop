import React, { useContext } from 'react';
import { Context } from '..';
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteNames } from '../utils/consts';
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {

  const { user } = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: 'white', textDecoration: 'none' }} to={RouteNames.SHOP_ROUTE}>StoreName</NavLink>
        {user.isAuth ?
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button
              variant={'outline-light'}
              onClick={() => navigate(RouteNames.ADMIN_ROUTE)}
            >
              Админ Панель
            </Button>

            <Button
              variant={'outline-light'}
              className="mx-2"
              onClick={logOut}
            >
              Выйти
            </Button>
          </Nav>
          :
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button
              variant={'outline-light'}
              onClick={() => navigate(RouteNames.LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        }
      </Container>
    </Navbar>
  );
});

export default NavBar;