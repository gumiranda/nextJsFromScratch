import { useSelector } from 'react-redux';
import React from 'react';
import Router from 'next/router';

const ProtectedRoute = ({ children }) => {
  const signed = useSelector((state) => state.auth.signed);
  if (!signed) {
    Router.push('/register');
    // return (
    //   <div>
    //     <p>Essa rota é protegida</p>
    //   </div>
    // );
  }
  return (
    <>{children}</>
  );
};

export default ProtectedRoute;
