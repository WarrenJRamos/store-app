import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Product from './Product';
import globalContext from '../../../Context/globalContext';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductCard from '../../../Styles/Products/ProductCard.styled';

import PaginationComponent from '../../Pagination/PaginationComponent';
const ProductsList = (props) => {
  const location = useLocation();

  const context = useContext(globalContext);
  // const newProducts = context.newProducts;
  const loading = context.loading;
  const currentProducts = context.currentPageProducts;
  const setFilterCategory = context.setFilterCategory;

  setFilterCategory(location.pathname);

  if (loading) {
    return <h2>loading....</h2>;
  }

  return (
    <div className={`${props.classes}`}>
      <div className={`${props.classes}`}>
        {currentProducts ? (
          currentProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <ProductCard className='card-container'>
            <div className='img-container'>
              <img src={test} alt='cloting-img' />
            </div>
            <div className='bottom'>
              <div className='bottom-title'>
                <span>Random item name</span>
                <FavoriteBorderIcon className='fav' />
              </div>
              <div className='bottom-price'>
                <span>$55.45</span>
              </div>
            </div>
          </ProductCard>
        )}
      </div>
      <PaginationComponent />
    </div>
  );
};

export default ProductsList;
