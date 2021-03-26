import {
  PageHeader, Button,
} from 'antd';
import { useSelector } from 'react-redux';
import Link from 'next/link';

function Header(props) {
  const signed = useSelector((state) => state.auth.signed);
  const userLogged = useSelector((state) => state.auth.userLogged);

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        title={<Link href="/"><h4 style={{ marginTop: '0.5rem' }}>GrowthHackTest</h4></Link>}
        subTitle="Brewerys and Recipes"
        extra={[
          <Link href={signed && userLogged ? '/favorites' : '/register'}>
            <Button key="2">
              {signed && userLogged ? 'My Favorites' : 'Register'}
            </Button>
          </Link>,
          <Link href={signed && userLogged ? '/logout' : '/login'}>
            <Button key="1" type="primary">
              {signed && userLogged ? 'Logout' : 'Login'}
            </Button>
          </Link>,

        ]}
      />
    </>
  );
}
export default Header;
