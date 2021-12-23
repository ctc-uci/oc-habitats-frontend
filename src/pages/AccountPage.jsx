/* eslint-disable react/no-children-prop */
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
  HStack,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';

const AccountPage = props => {
  const [isLoading, setLoading] = useState(false);
  const [leftPasswordType, setLeftPasswordType] = useState('password');
  const [rightPasswordType, setRightPasswordType] = useState('password');
  const [leftButtonText, setLeftButtonText] = useState('show');
  const [rightButtonText, setRightButtonText] = useState('show');

  const user = {
    firstName: 'Petr',
    preferredName: 'Petr',
    lastName: 'Anteater',
    email: 'petr@uci.edu',
    trainingStatus: 'In-Training',
    activeStatus: 'Active',
  };

  const toggleLeftPassword = () => {
    if (leftPasswordType === 'password') {
      setLeftPasswordType('text');
      setLeftButtonText('hide');
    } else {
      setLeftPasswordType('password');
      setLeftButtonText('show');
    }
  };

  const toggleRightPassword = () => {
    if (rightPasswordType === 'password') {
      setRightPasswordType('text');
      setRightButtonText('hide');
    } else {
      setRightPasswordType('password');
      setRightButtonText('show');
    }
  };

  const getAccountInfo = () => {
    // FILL OUT WITH API ENDPOINT CALL
    console.log(user);
  };

  useEffect(async () => {
    setLoading(true);
    await getAccountInfo();
    setLoading(false);
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Container h="100vh" maxW="100vw">
        <VStack>
          <Heading size="lg" py="10">
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
          <Heading size="lg" alignSelf="flex-start" pl={200} py={50}>
            Personal Information
          </Heading>
          <SimpleGrid columns={3} rows={2} spacing={10} w="70vw" h={100} pb={300}>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel pb={5}>First Name</FormLabel>
                <Input placeholder={user.firstName} />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel pb={5}>Preferred Name (Optional)</FormLabel>
                <Input placeholder={user.preferredName} />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel pb={5}>Last Name</FormLabel>
                <Input placeholder={user.lastName} />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1} gridRowStart={2}>
              <FormControl>
                <FormLabel pb={5}>Email</FormLabel>
                <Input placeholder={user.email} />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1} gridRowStart={2}>
              <FormControl>
                <FormLabel pb={5}>Training Status</FormLabel>
                <Input placeholder={user.trainingStatus} />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1} gridRowStart={2}>
              <FormControl>
                <FormLabel pb={5}>Active Status</FormLabel>
                <Input placeholder={user.activeStatus} />
              </FormControl>
            </GridItem>
          </SimpleGrid>
          <Heading size="lg" alignSelf="flex-start" pl={200} py={50}>
            Change Password
          </Heading>

          <SimpleGrid columns={3} rows={2} spacing={10} w="70vw" h={100} pb={300}>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Current Password</FormLabel>
                <InputGroup>
                  <Input type={leftPasswordType} placeholder="Enter Password" />
                  <InputRightAddon children={leftButtonText} onClick={toggleLeftPassword} />
                </InputGroup>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <Input type={rightPasswordType} placeholder="Enter Password" />
                  <InputRightAddon children={rightButtonText} onClick={toggleRightPassword} />
                </InputGroup>
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Container>
    </div>
  );
};

export default AccountPage;
