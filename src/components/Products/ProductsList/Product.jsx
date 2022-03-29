import React, { useContext, useRef, useState } from 'react';
// import test from '../../../Images/Products/test.jpg';
import { NavLink } from 'react-router-dom';
//icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductCard from '../../../Styles/Products/ProductCard.styled';
import globalContext from '../../../Context/globalContext';
import { CartContext } from '../../../Context/CartContextProvider';

const Product = ({ product }) => {
  const context = useContext(globalContext);
  const setWishList = context.setWishList;
  const cartContext = useContext(CartContext);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const amountInputRef = useRef();
  const [isFavorite, setIsFavorite] = useState(false);

  const addToCartClickHandler = (event) => {
    event.preventDefault();
    // console.log("Adding item to cart");
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim() === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsValidAmount(false);
      return;
    }

    cartContext.addItem({
      id: product.id,
      // name = title
      name: product.title,
      amount: enteredAmountNumber,
      price: product.price,
      // description: product.description,
      // category: product.category,
      image: product.image,
      // rating: {
      //   ...product.rating,
      // },
    });
  };

  const addToWishClickHandler = (product) => {
    setWishList((prev) => {
      const items = [...prev];
      items.push(product);
      return items;
    });
    setIsFavorite(true);
  };

  const removeWishHandler = (product) => {
    console.log('remove');
    setWishList((prev) => {
      const items = prev.filter((obj) => obj.id !== product.id);
      return items;
    });
    setIsFavorite((prev) => !prev);
  };

  // console.log(wishList);
  return (
    <ProductCard className='card-container'>
      <div className='top'>
        <div>
          <NavLink to={`/product/${product.id}`}>
            <span>Quick view</span>
          </NavLink>
        </div>
        {isFavorite ? (
          <>
            <button onClick={() => removeWishHandler(product)}>
              <FavoriteIcon className='faved' />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => addToWishClickHandler(product)}>
              <FavoriteBorderIcon className='fav' />
            </button>
          </>
        )}
      </div>
      <div className='img-container'>
        <NavLink to={`/product/${product.id}`}>
          <img src={product.image} alt='cloting-img' />
        </NavLink>
      </div>
      <div className='bottom'>
        <div className='bottom-title'>
          <span>{product.name}</span>
        </div>
        <div className='bottom-price'>
          <span>${product.price}</span>
          <form onSubmit={addToCartClickHandler}>
            <input
              ref={amountInputRef}
              label='Amount'
              id={`amount_${product.id}`}
              style={{ width: '40px' }}
              type='number'
              min='1'
              max='5'
              step='1'
              defaultValue='1'
            />
            <button type='submit'>
              <AddShoppingCartIcon className='cart' />
            </button>
          </form>
        </div>
      </div>
    </ProductCard>
  );
};

export default Product;
