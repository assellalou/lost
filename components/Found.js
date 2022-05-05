import {
  VStack,
  Select,
  Input,
  Button,
  Textarea,
  useToast,
  Text,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { AddIcon } from '@chakra-ui/icons';
import Categories from '../lib/categories';
import { CordContext } from '../Context/CordContext';
import { useContext, useState, useRef } from 'react';

import Map from './Map';
const Found = () => {
  //inputs
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const form = useRef();

  const [cordinates] = useContext(CordContext);
  //error handling
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !type || !description || !serialNumber) {
      toast({
        title: 'Error',
        description: 'Please fill all the fields!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsError(true);
    } else form.current.submit();
  };

  return (
    <form action="/" method="post" onSubmit={handleSubmit} ref={form}>
      <VStack direction="column" spacing="8px" style={{ padding: 50 }}>
        <Select
          placeholder="Select a Category"
          name="Category"
          onChange={(e) => setCategory(e.target.value)}
          isInvalid={isError && !category}
        >
          {Categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Select a Type"
          name="Type"
          onChange={(e) => setType(e.target.value)}
          isInvalid={isError && !type}
        >
          {Categories.map((category) =>
            category.items.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            )),
          )}
        </Select>
        <Input name="Longitude" type="hidden" value={cordinates.longitude} />
        <Input name="Latitude" type="hidden" value={cordinates.latitude} />
        <Input name="Zoom" type="hidden" value={cordinates.zoom} />
        <Input
          placeholder="Enter the serial Number!"
          name="SerialNumber"
          onChange={(e) => setSerialNumber(e.target.value)}
          isInvalid={isError && !serialNumber}
        />
        <Map />
        <Textarea
          placeholder="Description"
          name="Description"
          onChange={(e) => setDescription(e.target.value)}
          isInvalid={isError && !description}
        />
        <Text fontSize="xs" color="gray.500">
          By adding a lost item you agree to our{' '}
          <NextLink href="/" passHref style={{ display: '' }}>
            <Link color="blue.500">Terms of Service </Link>
          </NextLink>
          and{' '}
          <NextLink href="/" passHref style={{ display: '' }}>
            <Link color="blue.500">Privacy Policy</Link>
          </NextLink>
        </Text>
        <Button
          rightIcon={<AddIcon />}
          colorScheme="teal"
          variant="outline"
          type="submit"
        >
          Add
        </Button>
      </VStack>
    </form>
  );
};

export default Found;
