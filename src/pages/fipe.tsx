/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-multi-spaces */
import {
  List,
} from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest } from '@/appStore/appModules/fipe/list';
import { StarOutlined } from '@ant-design/icons';
import Layout from '@/components/Layout/Layout';
import AddFavoriteButton from '@/components/AddFavoriteButton/AddFavoriteButton';
import SearchBox from '@/components/SearchBox/SearchBox';

export default function Fipe() {
  const dispatch = useDispatch();
  const fipesList:any = useSelector<any>((state) => state.fipe.fipesList);
  const favoritesList:any = useSelector<any>((state) => state.favorite.favoritesList);
  const verifyIfIsFavorite = (item) => {
    const filtered = favoritesList?.filter((it: { key: string; }) => {
      if (it && it.key) {
        if (it?.key?.toString().toLowerCase()?.includes(item?.nome?.toString().toLowerCase())) {
          return it;
        }
      }
    });
    console.log(filtered);
    if (filtered?.length > 0) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    async function getFipes() {
      dispatch(getRequest({}));
    }
    getFipes();
  }, []);
  const onSearch = (value) => console.log(value);

  return (
    <Layout>

      <SearchBox
        onSearch={onSearch}
      />
      <div className="box">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={fipesList || []}

          renderItem={(item:any) => (
            <>
              <List.Item
                key={item.codigo}
                actions={[

                  <AddFavoriteButton item={item} icon={StarOutlined} text={verifyIfIsFavorite(item) ? 'Adicionar aos favoritos' : 'Remover dos favoritos'} key="list-vertical-star-o" />,
                ]}
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.nome}</a>}
                />
                {`Code of brand: ${item?.codigo ? item.codigo : ''}`}
                <br />
              </List.Item>
            </>
          )}
        />
        <br />
      </div>

    </Layout>
  );
}
