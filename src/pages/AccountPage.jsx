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
  Button,
  Grid,
  Flex,
} from '@chakra-ui/react';

const AccountPage = props => {
  const [isLoading, setLoading] = useState(false);

  // stores information on whether the passwords are hidden/shown, plus the state of the button text
  const [leftPasswordType, setLeftPasswordType] = useState('password');
  const [rightPasswordType, setRightPasswordType] = useState('password');
  const [leftButtonText, setLeftButtonText] = useState('Show');
  const [rightButtonText, setRightButtonText] = useState('Show');

  // storing form data in state for retrieval on submission
  const [changesMade, setChangesMade] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [prefName, setPrefName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const user = {
    firstName: 'Peter',
    lastName: 'Anteater',
    email: 'panteater@uci.edu',
    trainingStatus: 'In-Training',
    activeStatus: 'Active',
    assignedSegments: 'OC09A, OC09b',
  };

  // shows/hides the left ("current") password accordingly
  // and changes the button text from "show" to "hide"
  // when appropriate
  const toggleLeftPassword = () => {
    if (leftPasswordType === 'password') {
      setLeftPasswordType('text');
      setLeftButtonText('hide');
    } else {
      setLeftPasswordType('password');
      setLeftButtonText('Show');
    }
  };

  // shows/hides the right ("new") password accordingly
  // and changes the button text from "show" to "hide"
  // when appropriate
  const toggleRightPassword = () => {
    if (rightPasswordType === 'password') {
      setRightPasswordType('text');
      setRightButtonText('hide');
    } else {
      setRightPasswordType('password');
      setRightButtonText('Show');
    }
  };

  const getAccountInfo = () => {
    // FILL OUT WITH API ENDPOINT CALL
  };

  useEffect(async () => {
    setLoading(true);
    await getAccountInfo();
    setLoading(false);
  }, []);

  // submits the information the user entered into the form, bypassing default form submission effect
  // replace with POST call to backend when endpoints are ready
  const handleSubmit = e => {
    e.preventDefault();
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Container h="100vh" maxW="85vw">
        <VStack align="left">
          <Heading size="lg" py="10">
            Account Information
          </Heading>
          <Grid h="200px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)">
            <GridItem rowSpan={2} colSpan={1}>
              <Flex justifyContent="center">
                <Image
                  e="8"
                  h="8"
                  borderRadius="full"
                  boxSize="150px"
                  src="https://bit.ly/dan-abramov"
                  alt="Profile picture"
                />
              </Flex>
            </GridItem>
            <GridItem align="left" colSpan={4}>
              <VStack align="left">
                <Heading size="md" py={50}>
                  Personal Information
                </Heading>
                <FormControl>
                  <SimpleGrid columns={3} rows={2} spacing={10} h="30vh">
                    <GridItem colSpan={1}>
                      <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          placeholder={user.firstName}
                          name="firstName"
                          type="text"
                          value={firstName}
                          onChange={e => {
                            setFirstName(e.target.value);
                            setChangesMade(true);
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          placeholder={user.lastName}
                          name="lastName"
                          type="text"
                          value={lastName}
                          onChange={e => {
                            setLastName(e.target.value);
                            setChangesMade(true);
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                          placeholder={user.email}
                          name="email"
                          type="email"
                          value={email}
                          onChange={e => {
                            setEmail(e.target.value);
                            setChangesMade(true);
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1} gridRowStart={2}>
                      <FormControl>
                        <FormLabel>Admin Training Status</FormLabel>
                        <Text
                          pl="5"
                          pt="2"
                          h="40px"
                          color="#4A5568"
                          bgColor="gray.200"
                          borderRadius="5px"
                        >
                          {user.trainingStatus}
                        </Text>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1} gridRowStart={2}>
                      <FormControl>
                        <FormLabel>Admin Active Status</FormLabel>
                        <Text
                          pl="5"
                          pt="2"
                          h="40px"
                          color="#4A5568"
                          bgColor="gray.200"
                          borderRadius="5px"
                        >
                          {user.activeStatus}
                        </Text>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1} gridRowStart={2}>
                      <FormControl>
                        <FormLabel>Assigned Segments</FormLabel>
                        <Text
                          pl="5"
                          pt="2"
                          h="40px"
                          color="#4A5568"
                          bgColor="gray.200"
                          borderRadius="5px"
                        >
                          {user.assignedSegments}
                        </Text>
                      </FormControl>
                    </GridItem>
                  </SimpleGrid>
                  <Heading size="md" alignSelf="flex-start" py={50}>
                    Change Password
                  </Heading>
                  <SimpleGrid columns={3} rows={2} spacing={10} w="70vw" h={100} pb={30}>
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
                          <InputRightAddon
                            children={rightButtonText}
                            onClick={toggleRightPassword}
                          />
                        </InputGroup>
                      </FormControl>
                    </GridItem>
                  </SimpleGrid>
                  <HStack pl="80%" alignSelf="flex-end">
                    <Input
                      disabled={!changesMade}
                      color="#F7FAFC"
                      bg="#2D3748"
                      type="submit"
                      w="30"
                      onClick={handleSubmit}
                      value="Save Changes"
                    />
                  </HStack>
                </FormControl>
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </div>
  );
};

export default AccountPage;
