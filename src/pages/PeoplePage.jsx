import { React } from 'react';
import { VStack, Container, Stack, Heading } from '@chakra-ui/react';
import App from '../components/Table/Table';

//  const data = React.useMemo(() => makeRows, []);
const PeoplePage = () => {
  return (
    <VStack spacing="72px" align="left">
      <Container maxW="container.xl">
        <Stack align="left" mb="3em" height="10px">
          <Heading as="h1">People</Heading>
        </Stack>
      </Container>
      <App />
      <header></header>
      <App />
    </VStack>
  );
};
export default PeoplePage;
