import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Spinner, useToast } from '@chakra-ui/react';
import { loginUser } from '../redux/actions/auth.actions';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const isLoading = useSelector(state => state.auth.loading);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      await dispatch(loginUser(formData, toast));
    } catch (err) {
    }
  };

  const validateForm = formData => {
    const errors = {};

    if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4}>
      <FormControl isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" onChange={handleChange} />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <Input type="password" name="password" onChange={handleChange} />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>

      <Button colorScheme="blue" mt={6} onClick={handleSubmit} isLoading={isLoading}>
        {isLoading ? <Spinner size="sm" /> : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginComponent;
