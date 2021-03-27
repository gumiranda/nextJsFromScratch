import {
  PageHeader, Button, Badge,
} from 'antd';
import { useSelector } from 'react-redux';
import Link from 'next/link';

function Header(props) {
  const signed = useSelector<any>((state) => state.auth.signed);
  const userLogged = useSelector<any>((state) => state.auth.userLogged);
  const favoritesTotal = useSelector<any>((state) => state.favorite.favoritesTotal);

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        title={<Link href="/"><h4 style={{ marginTop: '0.5rem', color: '#fff' }}>GrowthHackTest</h4></Link>}
        // subTitle="Brewerys and Cars"
        extra={[
          <Link href={signed && userLogged ? '/favorites' : '/register'}>
            {signed && userLogged ? (
              <Badge count={favoritesTotal} overflowCount={32}>
                <Button key="2">
                  My Favorites
                </Button>
              </Badge>
            ) : (
              <Button key="2">
                Register
              </Button>
            )}

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
