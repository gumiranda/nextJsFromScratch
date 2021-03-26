/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-multi-spaces */
import {
  List,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest } from '@/appStore/appModules/fipe/list';
import { StarOutlined } from '@ant-design/icons';
import Layout from '@/components/Layout/Layout';
import AddFavoriteButton from '@/components/AddFavoriteButton/AddFavoriteButton';
import SearchBox from '@/components/SearchBox/SearchBox';

export default function Fipe() {
  const dispatch = useDispatch();
  const fipesList:any = useSelector<any>((state) => state.fipe.fipesList);
  const favoritesOfUser:any = useSelector<any>((state) => state.favorite.favoritesOfUser);
  const listFields:any = fipesList && fipesList.length > 0 ? Object.keys(fipesList[0]).filter((fav) => fav !== 'created_at' && fav !== 'updated_at' && fav !== 'key' && fav !== 'userId' && fav !== '_id') : [];
  const [fieldQuery, setFieldQuery] = useState(listFields[0] || '');
  const [fieldsQuery, setFieldsQuery] = useState(listFields || []);
  const verifyIfIsFavorite = (item) => {
    const filtered = favoritesOfUser?.filter((it: { key: string; }) => {
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
  useEffect(() => {
    const listFieldsNew:any = fipesList && fipesList.length > 0 ? Object.keys(fipesList[0]).filter((fav) => fav !== 'created_at' && fav !== 'updated_at' && fav !== 'key' && fav !== 'userId' && fav !== '_id') : [];
    setFieldsQuery(listFieldsNew);
  }, [fipesList]);
  const onSearch = (value) => console.log(value);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setFieldQuery(value);
  };
  return (
    <Layout>
      <SearchBox defaultField={fieldQuery} fieldsQuery={fieldsQuery} onSearch={onSearch} handleChange={handleChange} />

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
      </div>

    </Layout>
  );
}
