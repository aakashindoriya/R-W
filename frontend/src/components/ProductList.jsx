import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, SimpleGrid, useToast, Skeleton,Text } from '@chakra-ui/react';
import { getProducts } from '../redux/actions/product.action';
import ProductCard from './ProductCard';

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);
  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts(toast));
  }, [dispatch]);

  if (loading) {
    return (
      <SimpleGrid columns={5} spacing={5}>
        {Array(5).fill("").map((_, index) => (
          <Skeleton key={index} height="200px" />
        ))}
      </SimpleGrid>
    );
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <SimpleGrid columns={5} spacing={5}>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductsList;
