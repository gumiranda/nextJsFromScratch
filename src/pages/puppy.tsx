/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-multi-spaces */
import {
  List, Avatar,
} from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest } from '@/appStore/appModules/puppy/list';
import { StarOutlined } from '@ant-design/icons';
import Layout from '@/components/Layout/Layout';
import AddFavoriteButton from '@/components/AddFavoriteButton/AddFavoriteButton';

export default function Puppy() {
  const dispatch = useDispatch();
  const puppysList:any = useSelector<any>((state) => state.puppy.puppysList);
  const favoritesList:any = useSelector<any>((state) => state.favorite.favoritesList);
  const verifyIfIsFavorite = (item) => {
    const filtered = favoritesList?.filter((it: { key: string; }) => {
      if (it && it.key) {
        if (it?.key?.toString().toLowerCase()?.includes(item?.title?.toString().toLowerCase())) {
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
    async function getPuppys() {
      dispatch(getRequest({}));
    }
    getPuppys();
  }, []);
  return (
    <Layout>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={puppysList || []}

        renderItem={(item:any) => (
          <>
            <List.Item
              key={item.title}
              actions={[

                <AddFavoriteButton item={item} icon={StarOutlined} text={verifyIfIsFavorite(item) ? 'Adicionar aos favoritos' : 'Remover dos favoritos'} key="list-vertical-star-o" />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.thumbnail} />}
                title={<a href={item.href}>{item.title}</a>}
              />
              {`Ingredients: ${item?.ingredients ? item.ingredients : ''}`}
              <br />
            </List.Item>
          </>
        )}
      />
      <br />
    </Layout>
  );
}
