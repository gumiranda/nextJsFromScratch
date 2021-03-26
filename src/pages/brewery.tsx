/* eslint-disable react/jsx-props-no-multi-spaces */
import { List, Avatar } from 'antd';
import React from 'react';
import Layout from '../components/Layout/Layout';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    id: 543,
    name: 'Dry River Brewing',
    brewery_type: 'micro',
    street: '671 S Anderson St',
    address_2: null,
    address_3: null,
    city: 'Los Angeles',
    state: 'California',
    county_province: null,
    postal_code: '90023-1110',
    country: 'United States',
    longitude: '-118.223301521739',
    latitude: '34.0363873913043',
    phone: '2133755235',
    website_url: 'http://www.dryriverbrewing.com',
    updated_at: '2018-08-23T23:27:38.017Z',
    created_at: '2018-07-24T01:32:54.647Z',
  });
}

export default function Brewery() {
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
        dataSource={listData}

        renderItem={(item) => (
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
