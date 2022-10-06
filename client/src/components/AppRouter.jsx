import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { publickRoutes } from '../routes';

const AppRouter = () => {
  return (
    <Routes>
        {publickRoutes.map(({path, Component}) => (
            <Route key={path} path={path} element={<Component />} exact/>
        ))}
    </Routes>
  )
}

export default AppRouter;