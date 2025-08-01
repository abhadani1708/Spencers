import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Item({ item }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.rootReducer.cartItems);

  function addTocart() {
    const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      // Item already exists, increase quantity
      dispatch({
        type: 'updateCart',
        payload: { ...existingItem, quantity: existingItem.quantity + 1 },
      });
    } else {
      // New item, add to cart
      dispatch({
        type: 'addToCart',
        payload: { ...item, quantity: 1 },
      });
    }
  }

  return (
    <div className='item'>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} alt="" height='100' width='100' />
      <h4 className='price'><b>Price : </b>₹ {item.price}/-</h4>
      <div className="d-flex justify-content-end">
        <Button onClick={addTocart}>Add To Cart</Button>
      </div>
    </div>
  );
}

export default Item;
