/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import Layout from '@/components/Layout/Layout';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-multi-spaces */
import {
  List,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { getRequest } from '@/appStore/appModules/favorite/list';
import { StarOutlined } from '@ant-design/icons';
import AddFavoriteButton from '@/components/AddFavoriteButton/AddFavoriteButton';
import SearchBox from '@/components/SearchBox/SearchBox';

export default function Favorite() {
  const dispatch = useDispatch();
  const signed = useSelector<any>((state) => state.auth.signed);
  const userLogged:any = useSelector<any>((state) => state.auth.userLogged);

  if (!signed) {
    Router.push('/');
  }
  const favoritesList:any = useSelector<any>((state) => state.favorite.favoritesList);
  const listFields:any = Array.from(new Set(favoritesList && favoritesList.length > 0 ? favoritesList.map((favorite) => Object.keys(favorite).filter((fav) => fav !== 'created_at' && fav !== 'updated_at' && fav !== 'key' && fav !== 'userId' && fav !== '_id').toString()) : [])).toString().split(',') || [];
  const [fieldQuery, setFieldQuery] = useState(listFields[0] || '');
  const [sort, setSort] = useState(listFields[0] || '');
  const [typeSort, setTypeSort] = useState('asc');
  const [disabled, setDisabled] = useState(true);
  const [fieldsQuery, setFieldsQuery] = useState(listFields || []);
  useEffect(() => {
    async function getFavorites() {
      dispatch(getRequest({ userId: userLogged?._id }));
    }
    getFavorites();
  }, []);

  const onSearch = (value) => {
    dispatch(getRequest({
      userId: userLogged?._id, sort, field: fieldQuery, query: value,
    }));
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setDisabled(false);
    setFieldQuery(value);
  };
  const handleChangeOrder = (value) => {
    console.log(`selected ${value}`);
    setSort(value);
  };
  const handleChangeTypeOrder = (value) => {
    console.log(`selected ${value}`);
    setTypeSort(value);
  };
  return (
    <Layout>

      <SearchBox disabled={disabled} defaultTypeSort="asc" typeSortOptions={['asc', 'desc']} handleChangeTypeOrder={handleChangeTypeOrder} handleChangeOrder={handleChangeOrder} defaultField={fieldQuery} fieldsQuery={fieldsQuery} onSearch={onSearch} handleChange={handleChange} />
      <div className="box">
        <List
          itemLayout="vertical"
          size="default"
          grid={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 6,
          }}
          dataSource={favoritesList || []}

          renderItem={(item:any) => (
            <>

              <List.Item
                key={item.key}
                style={{
                  minHeight: '30vh', maxWidth: '95%', height: '95%', padding: '2rem', marginTop: 10, marginBottom: 10, backgroundColor: '#fff',
                }}
                actions={[
                  <AddFavoriteButton item={item} icon={StarOutlined} text="Remover dos favoritos" key="list-vertical-star-o" />,
                ]}
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item?.key}</a>}
                />
                {Object.entries({
                  ...item, _id: null, userId: null, website_url: null, longitude: null, latitude: null, id: null, created_at: null, updated_at: null, key: null,
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

      </div>

    </Layout>
  );
}
