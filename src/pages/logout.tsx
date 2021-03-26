import { signOut } from '@/appStore/appModules/auth/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Router from 'next/router';

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut());
    Router.push('/');
  }, [dispatch]);
  return (
    <></>
  );
}
