import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { RouteNames } from '../utils/consts';
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

const Auth = observer(() => {

  const { user } = useContext(Context)

  const location = useLocation()
  const isLogin = (location.pathname === RouteNames.LOGIN_ROUTE)

  const navigate = useNavigate()

  // state of controlled inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // axios requests
  const click = async () => {
    try {

      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate(RouteNames.SHOP_ROUTE)

    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 54 }}
      >
        <Card style={{ width: 600 }} className="p-5">

          <h2 className='m-auto'>
            {isLogin ? 'Авторизация' : 'Регистрация'}
          </h2>

          <Form className='d-flex flex-column'>
            <Form.Control
              className='mt-3'
              placeholder="Введите ваш электронный адрес"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <Form.Control
              className='mt-3'
              placeholder="Введите пароль"
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Row className='mt-3 pl-3 pr-3'>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                {isLogin ?
                  <div>
                    Нет аккаунта? <NavLink to={RouteNames.REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                  </div>
                  :
                  <div>
                    Есть аккаунт? <NavLink to={RouteNames.LOGIN_ROUTE}>Войдите!</NavLink>
                  </div>
                }

                <Button
                  variant={'outline-success'}
                  onClick={click}
                >
                  {isLogin ?
                    'Войти'
                    :
                    'Зарегистрироваться'
                  }
                </Button>
              </div>
            </Row>

          </Form>

        </Card>
      </Container>
    </div>
  );
})

export default Auth;