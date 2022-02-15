import { useState, React } from 'react';
import { VStack, Container, Heading, Button } from '@chakra-ui/react';
import App from '../components/Table/Table';
import AddAccountPopup from '../components/Table/AddAccountPopup';

const PeoplePage = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <>
      <Container maxW="container.xl">
        <Heading fontWeight="600" fontSize="36px" mb="40px" mt="40px" align="left">
          People
        </Heading>
        <AddAccountPopup />

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
