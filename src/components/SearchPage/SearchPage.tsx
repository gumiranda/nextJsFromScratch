import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import CountryList from '../CountryList/CountryList';

const SearchPage = (props: any) => {
  const [input, setInput] = useState('');
  const [countryListDefault, setCountryListDefault] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await response.json();
    setCountryList(data);
    setCountryListDefault(data);
  }

  const updateInput = async (inputToUpdate: React.SetStateAction<string>) => {
    const filtered = countryListDefault?.filter((country: { name: string; }) => country.name.toLowerCase().includes(input.toLowerCase()));
    setInput(inputToUpdate);
    setCountryList(filtered);
  };

  useEffect(() => { 
    async function getCountries(){
      await fetchData(); 
    }
    getCountries();
  }, []);

  return (
    <>
      <h1>Country List</h1>
      <SearchBar
        keyword={input}
        setKeyword={updateInput}
      />
      <CountryList countryList={countryList} />
    </>
  );
};

export default SearchPage;
