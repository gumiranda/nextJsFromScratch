import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ItemList from '../ItemList/ItemList';
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  const [input, setInput] = useState('');
  const [itemListDefault, setItemListDefault] = useState([]);
  const [itemList, setItemList] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await response.json();
    setItemList(data);
    setItemListDefault(data);
  }

  const updateInput = async (inputToUpdate: React.SetStateAction<string>) => {
    const filtered = itemListDefault?.filter((item: { name: string; }) => item.name.toLowerCase().includes(input.toLowerCase()));
    setInput(inputToUpdate);
    setItemList(filtered);
  };

  useEffect(() => { 
    async function getCountries(){
      await fetchData(); 
    }
    getCountries();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Item List</h1>
      <SearchBar
        keyword={input}
        setKeyword={updateInput}
      />
      <ItemList itemList={itemList} />
    </div>
  );
};

export default SearchPage;
