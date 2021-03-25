import React from 'react';
import styles from './ItemList.module.scss';

const ItemList = ({ itemList = [] }) => (
  <>
    { itemList.map((data) => {
      if (data) {
        return (
          <div className={styles.divItem} key={`${data.name}`}>
            <p>{data.name}</p>
          </div>
    	   );
    	 }
    	 return null;
    }) }
  </>
);

export default ItemList;
