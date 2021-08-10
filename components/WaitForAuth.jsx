import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';
import { getValue } from '../lib/store';
import { API_URL } from '../lib/config';
import { makeRequest } from '../lib/helpers';
import CenterLoading from './ui/CenterLoading';

/* eslint-disable */
const WaitForAuth = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAuth();

  useEffect(() => {
    setLoading(true);
    const token = getValue('token');
    if (!token) {
      dispatch({ type: 'SET_USER', payload: null });
      setLoading(false);
    } else {
      const authURL = `${API_URL}/users/me`;
      makeRequest(authURL, 'GET').then((data) => {
        if (data.error === undefined) {
          dispatch({ type: 'SET_USER', payload: data });
          setLoading(false);
        } else {
          dispatch({ type: 'SET_USER', payload: null });
          setLoading(false);
        }
      });
    }
  }, [dispatch]);

  if (loading) return <CenterLoading />;
  return <>{children}</>;
};

export default WaitForAuth;
