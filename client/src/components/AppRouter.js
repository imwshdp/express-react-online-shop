import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = () => {

  const { user } = useContext(Context)

  return (
    <Routes>

      {user.isAuth && authRoutes.map(route =>
        <Route
          key={route.path}
          path={route.path}
          element={<route.element />}
          exact
        />
      )}

      {publicRoutes.map(route =>
        <Route
          key={route.path}
          path={route.path}
          element={<route.element />}
          exact
        />
      )}

    </Routes>
  );
}

export default AppRouter;