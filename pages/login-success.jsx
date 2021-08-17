import { useRouter } from 'next/router';
import { getValue, setValue } from '../lib/store';
import CenterLoading from '../components/ui/CenterLoading';

const LoginSuccess = () => {
  const router = useRouter();
  const { token } = router.query;

  setValue('token', token);
  setTimeout(() => {
    const redirect = getValue('redirectTo');
    if (redirect) {
      router.push(redirect);
    } else {
      router.push('/');
    }
  }, 500);

  return <CenterLoading />;
};

export default LoginSuccess;
