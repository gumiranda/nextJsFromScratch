import Layout from '@/components/Layout/Layout';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-multi-spaces */
import {
  List, Avatar,
} from 'antd';
import React, { useEffect } from 'react';

import { getRequest } from '@/appStore/appModules/favorite/list';
import { StarOutlined } from '@ant-design/icons';

import AddFavoriteButton from '@/components/AddFavoriteButton/AddFavoriteButton';

export default function Favorite() {
  const dispatch = useDispatch();
  const signed = useSelector((state) => state.auth.signed);
  const userLogged = useSelector((state) => state.auth.userLogged);
  if (!signed) {
    Router.push('/');
  }
  const favoritesList = useSelector((state) => state.favorite.favoritesList);

  useEffect(() => {
    async function getFavorites() {
      dispatch(getRequest({ userId: userLogged?._id }));
    }
    getFavorites();
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
        dataSource={favoritesList || []}

        renderItem={(item:any) => (
          <>
            <List.Item
              key={item.key}
              actions={[
                <AddFavoriteButton item={item} icon={StarOutlined} text="Remover dos favoritos" key="list-vertical-star-o" />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.thumbnail} />}
                title={<a href={item.href}>{item?.key}</a>}
              />
              {Object.entries({ ...item, _id: null }).map(([key, value]) => (
                <>
                  <p>
                    {`${key} - ${value || ''}`}
                  </p>
                  <br />
                </>
              ))}

            </List.Item>
          </>
        )}
      />
      <br />
    </Layout>
  );
}
