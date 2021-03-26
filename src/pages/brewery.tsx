/* eslint-disable react/jsx-props-no-multi-spaces */
import { List, Avatar } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest } from '@/appStore/appModules/brewery/list';
import Layout from '../components/Layout/Layout';

export default function Brewery() {
  const dispatch = useDispatch();
  const { brewerysList } = useSelector((state) => state.brewery);

  useEffect(() => {
    async function getBrewerys() {
      dispatch(getRequest({}));
    }
    getBrewerys();
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
        dataSource={brewerysList || []}

        renderItem={(item:any) => (
          <>
            <List.Item
              key={item.title}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.website_url}>{item.name}</a>}
                description={item.description}
              />
              {`Address: ${item.street} ${item.city} - ${item.state}\n`}
              <br />
              {`Country: ${item.country}`}
              <br />
              {`Zipcode: ${item.postal_code}`}
              <br />
              {`Type: ${item.brewery_type}`}
              <br />
              {`Phone: ${item.phone}`}
            </List.Item>
          </>
        )}
      />
      <br />
    </Layout>
  );
}
