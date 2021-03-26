import React from 'react';
import { Input, Space, Select } from 'antd';

const { Search } = Input;
const { Option } = Select;

const SearchBox = ({
  onSearch, fieldsQuery, defaultField, handleChange,
}) => (
  <>
    <div className="search-box">
      <Space style={{ margin: '2rem' }}>
        <h4>Search by</h4>
        <Select defaultValue={defaultField} style={{ width: 120 }} onChange={handleChange}>
          {fieldsQuery.map((field) => (
            <Option value={field}>{field}</Option>
          ))}
        </Select>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Space>
    </div>
  </>
);

export default SearchBox;
