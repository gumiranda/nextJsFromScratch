/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Input, Space, Select } from 'antd';

const { Search } = Input;
const { Option } = Select;
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
function SearchBox({
  onSearch, fieldsQuery, defaultField, handleChange, handleChangeOrder, disabled, defaultTypeSort, typeSortOptions, handleChangeTypeOrder,
}) {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const pStyle = { color: '#fff' };
  return (
    <>
      {windowDimensions.width > 477 ? (
        <>
          <div className="search-bar">

            <Space style={{ margin: '1rem' }}>

              <p style={pStyle} style={pStyle}>Search by</p>
              <Select style={{ width: 120 }} defaultValue={defaultField} onChange={handleChange}>
                {fieldsQuery.map((field) => (
                  <Option value={field}>{field}</Option>
                ))}
              </Select>
            </Space>
            <Space style={{ margin: '1rem' }}>
              <Search
                placeholder="input search text"
                allowClear
                disabled={disabled}
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
            </Space>

            <Space style={{ margin: '1rem' }}>

              <p style={pStyle}>Order by</p>
              <Select style={{ width: 120 }} defaultValue={defaultField} onChange={handleChangeOrder}>
                {fieldsQuery.map((field) => (
                  <Option value={field}>{field}</Option>
                ))}
              </Select>
            </Space>
            <Space style={{ margin: '1rem' }}>

              <p style={pStyle}>Type order</p>
              <Select style={{ width: 120 }} defaultValue={defaultTypeSort} onChange={handleChangeTypeOrder}>
                {typeSortOptions.map((field) => (
                  <Option value={field}>{field}</Option>
                ))}
              </Select>
            </Space>
          </div>
        </>
      ) : (
        <>
          <div className="search-box">
            <Space style={{ margin: '1rem' }}>

              <p style={pStyle}>Search by</p>
              <Select style={{ width: 120 }} defaultValue={defaultField} onChange={handleChange}>
                {fieldsQuery.map((field) => (
                  <Option value={field}>{field}</Option>
                ))}
              </Select>
            </Space>
          </div>

          <div className="search-bar">

            <Space style={{ margin: '1rem' }}>
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
            </Space>
          </div>
          <div className="search-box">

            <Space style={{ margin: '1rem' }}>

              <p style={pStyle}>Order by</p>
              <Select style={{ width: 120 }} defaultValue={defaultField} onChange={handleChangeOrder}>
                {fieldsQuery.map((field) => (
                  <Option value={field}>{field}</Option>
                ))}
              </Select>
            </Space>
            <Space style={{ margin: '1rem' }}>

              <p style={pStyle}>Type order</p>
              <Select style={{ width: 120 }} defaultValue={defaultTypeSort} onChange={handleChangeTypeOrder}>
                {typeSortOptions.map((field) => (
                  <Option value={field}>{field}</Option>
                ))}
              </Select>
            </Space>
          </div>

        </>
      )}

    </>
  );
}

export default SearchBox;
