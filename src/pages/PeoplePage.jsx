import { React } from 'react';
import { VStack, Container, Stack, Heading } from '@chakra-ui/react';
import App from '../components/Table/Table';
/*
<Stack align="left" mb="3em" height="5px">
          <Heading as="h3" align="left">People</Heading>
        </Stack>
*/
const PeoplePage = () => {
  return (
    <VStack spacing="40px" align="left">
      <header></header>
      <App />
      <header></header>
      <App />
    </VStack>
  );
};
export default PeoplePage;
