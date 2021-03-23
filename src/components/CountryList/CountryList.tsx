import React from 'react';

const CountryList = ({ countryList = [] }) => (
  <>
    { countryList.map((data) => {
      if (data) {
        return (
          <div key={`${data.name}`}>
            <p>{data.name}</p>
          </div>
    	   );
    	 }
    	 return null;
    }) }
  </>
);

export default CountryList;
