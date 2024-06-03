import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, SimpleGrid, useToast, Skeleton, Text } from '@chakra-ui/react';
import { getProducts } from '../redux/actions/product.action';
import ProductCard from './ProductCard';
import { getCart } from '../redux/actions/cart.action';

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);
  const auth=useSelector(state=>state.auth.isAuthenticated)
  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts());
    if(auth){
      dispatch(getCart(toast));
    }
  }, [dispatch]);

  if (loading) {
    return (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={5}>
        {Array(20).fill("").map((_, index) => (
          <Skeleton key={index} height="200px" />
        ))}
      </SimpleGrid>
    );
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={5}>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductsList;
