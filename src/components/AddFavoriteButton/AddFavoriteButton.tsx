/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-multi-spaces */
import {
  Button, Space,
} from 'antd';
import React from 'react';
import { favoriteRequest, favoriteRemoveRequest } from '@/appStore/appModules/favorite/actions';
import { useDispatch, useSelector } from 'react-redux';

const AddFavorite = ({
  item, icon, text, key,
}) => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth.userLogged);
  const isSigned = useSelector((state) => state.auth.signed);

  const addFav = async () => {
    if (!isSigned) {
      alert('Para adicionar aos favoritos é necessário realizar o login');
    } else {
      const keyItem = item?.id ? item.id : item?.title;
      if (text?.includes('Remover')) {
        dispatch(favoriteRemoveRequest({ ...item, userId: userLogged?._id, key: String(keyItem) }));
      } else {
        dispatch(favoriteRequest({ ...item, userId: userLogged?._id, key: String(keyItem) }));
      }
    }
  };
  const IconText = ({ icon, text }) => (
    <Button onClick={() => addFav()}>
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    </Button>

  );
  return (
    <IconText item={item} icon={icon} text={text} key={key} />
  );
};

export default AddFavorite;
