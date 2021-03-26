/* eslint-disable no-underscore-dangle */
import Layout from '@/components/Layout/Layout';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-multi-spaces */
import {
  List, Avatar, Input, Space, Select,
} from 'antd';
import React, { useEffect } from 'react';
import { getRequest } from '@/appStore/appModules/favorite/list';
import { StarOutlined } from '@ant-design/icons';
import AddFavoriteButton from '@/components/AddFavoriteButton/AddFavoriteButton';

const { Search } = Input;

export default function Favorite() {
  const dispatch = useDispatch();
  const signed = useSelector<any>((state) => state.auth.signed);
  const userLogged:any = useSelector<any>((state) => state.auth.userLogged);
  if (!signed) {
    Router.push('/');
  }
  const favoritesList:any = useSelector<any>((state) => state.favorite.favoritesList);

  useEffect(() => {
    async function getFavorites() {
      dispatch(getRequest({ userId: userLogged?._id }));
    }
    getFavorites();
  }, []);
  const onSearch = (value) => console.log(value);

  return (
    <Layout>
      <div className="search-box">
        <Space>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Space>
      </div>

      <List
        itemLayout="vertical"
        size="default"
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
              {Object.entries({
                ...item, _id: null, userId: null, id: null, created_at: null, updated_at: null, key: null,
              }).map(([key, value]) => (
                <>
                  {value ? (
                    <p>
                      {`${key}: ${value || ''}`}
                    </p>
                  ) : null}
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
