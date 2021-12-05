/* eslint-disable no-unused-vars */
import { useEffect, React } from 'react';
import {
  Text,
  FormLabel,
  Input,
  FormControl,
  GridItem,
  SimpleGrid,
  Image,
  VStack,
  Container,
  Heading,
} from '@chakra-ui/react';

const AccountPage = props => {
  const user = {
    firstName: '',
    preferredName: '',
    lastName: '',
    email: '',
    trainingStatus: '',
    activeStatus: false,
  };

  const getAccountInfo = () => {
    // FILL OUT WITH API ENDPOINT CALL
    user.firstName = 'Petr';
    user.preferredName = 'Petr';
    user.lastName = 'Anteater';
    user.email = 'petr@uci.edu';
    user.trainingStatus = 'in-Training';
    user.activeStatus = true;
  };

  useEffect(async () => {
    getAccountInfo();
  }, []);

  return (
    <div>
      <Container h="100vh" maxW="100vw" bg="white">
        <VStack>
          <Heading size="lg" color="black" py="10">
            Account Information
          </Heading>
          <Image
            e="8"
            h="8"
            borderRadius="full"
            boxSize="150px"
            src="https://bit.ly/dan-abramov"
            alt="Profile picture"
          />
          <Text color="black" h="md" w="md">
            Personal Information
          </Text>
          <SimpleGrid columns={3} rows={3} spacing={10} maxW="full" maxH="full">
            <GridItem colSpan={1} rowSpan={1}>
              <Text color="black" size="sm">
                Personal Information
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input placeholder={user.firstName} />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Preferred Name (Optional)</FormLabel>
                <Input placeholder={user.preferredName} />
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Container>
    </div>
  );
};

export default AccountPage;
