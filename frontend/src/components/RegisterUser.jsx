import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Spinner, useToast } from '@chakra-ui/react';
import { register } from '../redux/actions/auth.actions';
import { UplodeFile } from '../utils/upload';

const RegisterUser = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const isLoading = useSelector(state => state.auth.loading);

  const [formData, setFormData] = useState({
    image: null,
    name: '',
    email: '',
    password: '',
    education: '',
    gender: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    if (e.target.name === 'image') {
      UplodeFile(e.target.files[0], setFormData, formData);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await dispatch(register(formData, toast));
    } catch (err) {
      // Error handling is already done in the action
    }
  };

  const validateForm = formData => {
    const errors = {};

    if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      errors.email = 'Invalid email address';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (!formData.image) {
      errors.image = 'Image is required';
    }

    return errors;
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4}>
      <FormControl mt={4} isInvalid={errors.image}>
        <FormLabel>{formData.image ? "Image Uploaded" : "Upload Image"}</FormLabel>
        <Input type="file" name="image" onChange={handleChange} />
        <FormErrorMessage>{errors.image}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={errors.name}>
        <FormLabel>Name</FormLabel>
        <Input name="name" onChange={handleChange} />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" onChange={handleChange} />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <Input type="password" name="password" onChange={handleChange} />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={errors.education}>
        <FormLabel>Education</FormLabel>
        <Select name="education" onChange={handleChange}>
          <option value="">Select Education</option>
          <option value="sec">Secondary</option>
          <option value="se.sec.">Senior Secondary</option>
          <option value="graduate">Graduate</option>
        </Select>
        <FormErrorMessage>{errors.education}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={errors.gender}>
        <FormLabel>Gender</FormLabel>
        <Select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
        <FormErrorMessage>{errors.gender}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={errors.phone}>
        <FormLabel>Phone</FormLabel>
        <Input name="phone" onChange={handleChange} />
        <FormErrorMessage>{errors.phone}</FormErrorMessage>
      </FormControl>

      <Button colorScheme="blue" mt={6} onClick={handleSubmit} isLoading={isLoading}>
        {isLoading ? <Spinner size="sm" /> : 'Register'}
      </Button>
    </Box>
  );
};

export default RegisterUser;
