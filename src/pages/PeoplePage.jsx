import { React } from 'react';
import { VStack, Container, Heading, Button } from '@chakra-ui/react';
import App from '../components/Table/Table';

const PeoplePage = () => {
  return (
    <>
      <Container maxW="container.xl">
        <Heading fontWeight="600" fontSize="36px" mb="40px" mt="40px" align="left">
          People
        </Heading>
        <Button colorScheme="teal" variant="solid">
          Create New Account
        </Button>
        <VStack spacing="40px" align="left">
          <header></header>
          <App />
          <header></header>
          <App />
        </VStack>
      </Container>
    </>
  );
};
export default PeoplePage;
