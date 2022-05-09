import {
  HStack,
  Input,
  Button,
  useToast,
  VStack,
  Table,
  Thead,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useState } from 'react';

const Lost = () => {
  const [SerialNumber, setSerialNumber] = useState('');
  const [results, setResults] = useState(false);
  const toast = useToast();

  const onClick = () => {
    if (!SerialNumber) {
      toast({
        title: 'Error',
        description: 'Please fill all the fields!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    fetch(`/api/items/${SerialNumber}`)
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (success) {
          setResults(data);
        } else {
          setResults(false);
          toast({
            title: 'Error',
            description: 'Item not found!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <>
      <HStack spacing="10px">
        <Input
          placeholder="Enter the serial Number or a unique name!"
          name="SerialNumber"
          onChange={(e) => setSerialNumber(e.target.value)}
        />
        <Button
          size="md"
          rightIcon={<Search2Icon />}
          colorScheme="teal"
          variant="outline"
          onClick={onClick}
        >
          Search
        </Button>
      </HStack>
      <VStack>
        <Table variant="simple" style={{ display: results ? 'Block' : 'none' }}>
          <Thead>
            <Tr>
              <Th>Serial Number</Th>
              <Th>Category</Th>
              <Th>Type</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <tbody>
            {results
              ? results.map((result) => (
                  <Tr key={result.id}>
                    <Td>{result.SerialNumber}</Td>
                    <Td>{result.Category}</Td>
                    <Td>{result.Type}</Td>
                    <Td>{result.Description}</Td>
                  </Tr>
                ))
              : null}
          </tbody>
        </Table>
      </VStack>
    </>
  );
};
export default Lost;
