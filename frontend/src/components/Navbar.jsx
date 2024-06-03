import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Flex, 
  Input, 
  Button, 
  IconButton, 
  Text, 
  useBreakpointValue, 
  Drawer, 
  DrawerBody, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerCloseButton 
} from '@chakra-ui/react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { getProducts } from '../redux/actions/product.action';
import { logoutUser } from '../redux/actions/auth.actions';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const auth=useSelector((state)=>state.auth.isAuthenticated)
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getProducts(searchTerm));
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleLogout=()=>{
    dispatch(logoutUser())
  }
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="blue.500" p={4} color="white">
      <Flex align="center" justify="space-between">
        <Link to="/">
          <Text fontSize="2xl" fontWeight="bold">eyeCart</Text>
        </Link>
        {isMobile ? (
          <>
            <IconButton
              icon={<FaBars />}
              colorScheme="teal"
              aria-label="Menu"
              onClick={toggleDrawer}
            />
            <Drawer isOpen={isDrawerOpen} placement="right" onClose={toggleDrawer}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Navigation</DrawerHeader>
                <DrawerBody>
                  <Flex as="form" onSubmit={handleSearchSubmit} align="center" mb={4}>
                    <Input
                      placeholder="Search products"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      mr={2}
                      bg="white"
                      color="black"
                    />
                    <Button type="submit" colorScheme="teal">Search</Button>
                  </Flex>
                  <Link to="/shop" onClick={toggleDrawer}>
                    <Button colorScheme="teal" width="100%" mb={2}>Shop</Button>
                  </Link>
                  <Link to="/cart" onClick={toggleDrawer}>
                    <Button colorScheme="teal" width="100%" mb={2}>
                      <FaShoppingCart />
                      {cartItems.length > 0 && (
                        <Box
                          ml={2}
                          bg="red.500"
                          borderRadius="full"
                          px={2}
                          color="white"
                          fontSize="xs"
                        >
                          {cartItems.length}
                        </Box>
                      )}
                    </Button>
                  </Link>
                  <Link to="/login" onClick={toggleDrawer}>
                    <Button colorScheme="teal" width="100%" mb={2}>Login</Button>
                  </Link>
                  <Link to="/signup" onClick={toggleDrawer}>
                    <Button colorScheme="teal" width="100%">Signup</Button>
                  </Link>
                </DrawerBody>
                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={toggleDrawer}>Close</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <Flex align="center" mr="5">
            <Flex as="form" onSubmit={handleSearchSubmit} align="center">
              <Input
                placeholder="Search products"
                value={searchTerm}
                onChange={handleSearchChange}
                mr={2}
                bg="white"
                color="black"
              />
              <Button type="submit" rounded="10" m="1"  colorScheme="teal">Search</Button>
            </Flex>
            <Link to="/shop">
              <Button colorScheme="teal" mr={4}>Shop</Button>
            </Link>
            <Link to="/cart">
              <IconButton
                icon={<FaShoppingCart />}
                colorScheme="teal"
                aria-label="Cart"
                position="relative"
                mr={4}
              >
                {cartItems.length > 0 && (
                  <Box
                    position="absolute"
                    top="-1"
                    right="-1"
                    bg="red.500"
                    borderRadius="full"
                    px={2}
                    color="white"
                    fontSize="xs"
                  >
                    {cartItems.length}
                  </Box>
                )}
              </IconButton>
            </Link>
            {
                !auth&&<>
                <Link to="/login">
                    <Button colorScheme="teal" mr={4}>Login</Button>
                </Link>
                <Link to="/signup">
                    <Button colorScheme="teal">Signup</Button>
                </Link>
                </>
            }
            
                    <Button colorScheme="teal" onClick={handleLogout}>LogOut</Button>
                
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
