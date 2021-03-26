import React from 'react';
import {
  List, Avatar, Input, Space, Select,
} from 'antd';

const { Search } = Input;

const SearchBox = ({ onSearch }) => (
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
);

export default SearchBox;
