import React from 'react';
import { Box, Image, Button, Text, Flex, IconButton ,useToast} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, changeQuantity } from '../redux/actions/cart.action';
import { FaPlus, FaMinus } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const toast = useToast();

  const cartItem = cartItems.find(item => item.productId._id === product._id);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }, toast));
  };

  const handleIncreaseQuantity = () => {
    dispatch(changeQuantity(cartItem._id, cartItem.quantity + 1, toast));
  };

  const handleDecreaseQuantity = () => {
    if (cartItem.quantity > 1) {
      dispatch(changeQuantity(cartItem._id, cartItem.quantity - 1, toast));
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} maxW="sm"  justifyContent="center" alignItems="center">
      <Image src={product.image} alt={product.name} minW={"100%"}/>
      <Text mt={2} fontSize="xl" fontWeight="semibold" as="h4" lineHeight="tight">
        {product.name}
      </Text>
      <Text>${product.price}</Text>
      <Flex mt={4} align="center">
        {cartItem ? (
          <>
            <IconButton icon={<FaMinus />} onClick={handleDecreaseQuantity} />
            <Text mx={2}>{cartItem.quantity}</Text>
            <IconButton icon={<FaPlus />} onClick={handleIncreaseQuantity} />
          </>
        ) : (
          <Button onClick={handleAddToCart} colorScheme="blue">Add to Cart</Button>
        )}
      </Flex>
    </Box>
  );
};

export default ProductCard;
