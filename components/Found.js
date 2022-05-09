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
import Categories from '@lib/categories';
import { CordContext } from '@context/CordContext';
import { useContext, useState, useRef } from 'react';

import Map from '@components/Map';
const Found = () => {
  //inputs
  const [Category, setCategory] = useState('');
  const [Type, setType] = useState('');
  const [Description, setDescription] = useState('');
  const [SerialNumber, setSerialNumber] = useState('');

  const form = useRef();

  const [cordinates] = useContext(CordContext);
  //error handling
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Category || !Type || !Description || !SerialNumber) {
      toast({
        title: 'Error',
        description: 'Please fill all the fields!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsError(true);
      return;
    } else {
      fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Category,
          Type,
          Description,
          SerialNumber,
          Latitude: cordinates.latitude,
          Longitude: cordinates.longitude,
          Zoom: cordinates.zoom,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            form.current.reset();
            setIsError(false);
            toast({
              title: 'Success',
              description: 'Item added successfully!',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          toast({
            title: 'Error',
            description: 'Something went wrong!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <form action="/" method="post" onSubmit={handleSubmit} ref={form}>
      <VStack direction="column" spacing="8px" style={{ padding: 50 }}>
        <Select
          placeholder="Select a Category"
          name="Category"
          onChange={(e) => setCategory(e.target.value)}
          isInvalid={isError && !Category}
        >
          {Categories.map((Category) => (
            <option key={Category.id} value={Category.id}>
              {Category.name}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Select a Type"
          name="Type"
          onChange={(e) => setType(e.target.value)}
          isInvalid={isError && !Type}
        >
          {
            Category
              ? Categories[Category].types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))
              : null //if category is not selected, no types will be displayed
          }
        </Select>
        <Input name="Longitude" type="hidden" value={cordinates.longitude} />
        <Input name="Latitude" type="hidden" value={cordinates.latitude} />
        <Input name="Zoom" type="hidden" value={cordinates.zoom} />
        <Input
          placeholder="Enter the serial Number!"
          name="SerialNumber"
          onChange={(e) => setSerialNumber(e.target.value)}
          isInvalid={isError && !SerialNumber}
        />
        <Map />
        <Textarea
          placeholder="Description"
          name="Description"
          onChange={(e) => setDescription(e.target.value)}
          isInvalid={isError && !Description}
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
