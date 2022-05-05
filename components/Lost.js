import { HStack, Input, Button } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

const Lost = () => {
  const onClick = () => {
    console.log('Searching...');
  };

  return (
    <HStack spacing="10px">
      <Input placeholder="Enter the serial Number or a unique name!" />
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
  );
};
export default Lost;
