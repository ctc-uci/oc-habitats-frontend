/* eslint-disable no-unused-vars */
import { useEffect, useState, React } from 'react';
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
  const [isLoading, setLoading] = useState(false);

  const user = {
    firstName: '',
    preferredName: '',
    lastName: '',
    email: '',
    trainingStatus: '',
    activeStatus: 'Active',
  };

  const getAccountInfo = () => {
    // FILL OUT WITH API ENDPOINT CALL
    user.firstName = 'Petr';
    user.preferredName = 'Petr';
    user.lastName = 'Anteater';
    user.email = 'petr@uci.edu';
    user.trainingStatus = 'in-Training';
    user.activeStatus = 'Active';
  };

  useEffect(async () => {
    setLoading(true);
    getAccountInfo();
    setLoading(false);
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

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
          <Heading size="lg" color="black" alignSelf="flex-start" px={55} py={10}>
            Personal Information
          </Heading>
          <SimpleGrid columns={3} rows={2} spacing={10} w="70vw" h={100}>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel color="black">First Name</FormLabel>
                <Input outlineColor="black" placeholder="Petr" color="black" />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel color="black">Preferred Name (Optional)</FormLabel>
                <Input outlineColor="black" placeholder="Petr" color="black" />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel gridRowStart={1} color="black">
                  Last Name
                </FormLabel>
                <Input outlineColor="black" placeholder="Anteater" color="black" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1} gridRowStart={2}>
              <FormControl>
                <FormLabel color="black">Email</FormLabel>
                <Input outlineColor="black" placeholder={user.email} color="black" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1} gridRowStart={2}>
              <FormControl>
                <FormLabel color="black">Active Status</FormLabel>
                <Input outlineColor="black" placeholder={user.activeStatus} color="black" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1} gridRowStart={2}>
              <FormControl>
                <FormLabel color="black">Training Status</FormLabel>
                <Input outlineColor="black" placeholder={user.trainingStatus} color="black" />
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Container>
    </div>
  );
};

export default AccountPage;
