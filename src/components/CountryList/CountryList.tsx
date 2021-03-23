import React from 'react';
import styles from './CountryList.module.scss';

const CountryList = ({ countryList = [] }) => (
  <>
    { countryList.map((data) => {
      if (data) {
        return (
          <div className={styles.divCountry} key={`${data.name}`}>
            <p>{data.name}</p>
          </div>
    	   );
    	 }
    	 return null;
    }) }
  </>
);

export default CountryList;
