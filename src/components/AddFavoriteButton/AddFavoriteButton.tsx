/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-multi-spaces */
import {
  Button, Space,
} from 'antd';
import React from 'react';
import { favoriteRequest } from '@/appStore/appModules/favorite/actions';
import { useDispatch, useSelector } from 'react-redux';

const AddFavorite = ({
  item, icon, text, key,
}) => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.auth.userLogged);

  const addFav = async () => {
    console.log(userLogged);
    console.log(item);
    dispatch(favoriteRequest({ ...item, userId: userLogged?._id }));
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
