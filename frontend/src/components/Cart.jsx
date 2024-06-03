import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Text, Flex, IconButton, useToast, Spinner, Skeleton } from '@chakra-ui/react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { getCart, changeQuantity, deleteItem } from '../redux/actions/cart.action';

const Cart = () => {
  const dispatch = useDispatch();
  const auth=useSelector(state=>state.auth.isAuthenticated)
  const { items, loading, error } = useSelector(state => state.cart);
  const toast = useToast();

  useEffect(() => {
    
    if(auth){
        dispatch(getCart(toast));
    }
  }, [auth]);

  const handleIncreaseQuantity = (item) => {
    dispatch(changeQuantity(item._id, item.quantity + 1, toast));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(changeQuantity(item._id, item.quantity - 1, toast));
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id, toast));
  };

  if (loading) {
    return (
      <Box p={5}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box>
      {items.length === 0 ? (
        <Text>No items in cart</Text>
      ) : (
        items.map(item => (
          <Flex key={item._id} align="center" justify="space-between" p={5} borderWidth="1px" borderRadius="lg" mb={4}>
            <Text>{item.productId.name}</Text>
            <Flex align="center">
              <IconButton icon={<FaMinus />} onClick={() => handleDecreaseQuantity(item)} />
              <Text mx={2}>{item.quantity}</Text>
              <IconButton icon={<FaPlus />} onClick={() => handleIncreaseQuantity(item)} />
            </Flex>
            <Button colorScheme="red" onClick={() => handleDeleteItem(item._id)}><FaTrash /></Button>
          </Flex>
        ))
      )}
    </Box>
  );
};

export default Cart;
