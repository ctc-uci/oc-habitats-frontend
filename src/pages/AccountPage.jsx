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
} from '@chakra-ui/react';

const AccountPage = props => {
  const [isLoading, setLoading] = useState(false);

  // stores information on whether the passwords are hidden/shown, plus the state of the button text
  const [leftPasswordType, setLeftPasswordType] = useState('password');
  const [rightPasswordType, setRightPasswordType] = useState('password');
  const [leftButtonText, setLeftButtonText] = useState('show');
  const [rightButtonText, setRightButtonText] = useState('show');

  // storing form data in state for retrieval on submission
  const [firstName, setFirstName] = useState('');
  const [prefName, setPrefName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [trainingStatus, setTrainingStatus] = useState('');
  const [activeStatus, setActiveStatus] = useState('');
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const user = {
    firstName: 'Petr',
    preferredName: 'Petr',
    lastName: 'Anteater',
    email: 'petr@uci.edu',
    trainingStatus: 'In-Training',
    activeStatus: 'Active',
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
      setLeftButtonText('show');
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

  // submits the information the user entered into the form, bypassing default form submission effect
  // TODO: replace with POST call to backend when endpoints are ready
  const handleSubmit = e => {
    e.preventDefault();

    console.log('submitting form with this information: ');
    console.log(
      `first: ${firstName}, preferred: ${prefName}, last: ${lastName}, email: ${email}, ts: ${trainingStatus}, as: ${activeStatus}`,
    );
  };

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
          <FormControl>
            <SimpleGrid columns={3} rows={2} spacing={10} w="70vw" h={100} pb={300}>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel pb={5}>First Name</FormLabel>
                  <Input
                    placeholder={user.firstName}
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel pb={5}>Preferred Name (Optional)</FormLabel>
                  <Input
                    placeholder={user.preferredName}
                    name="prefName"
                    type="text"
                    value={prefName}
                    onChange={e => setPrefName(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel pb={5}>Last Name</FormLabel>
                  <Input
                    placeholder={user.lastName}
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1} gridRowStart={2}>
                <FormControl>
                  <FormLabel pb={5}>Email</FormLabel>
                  <Input
                    placeholder={user.email}
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1} gridRowStart={2}>
                <FormControl>
                  <FormLabel pb={5}>Training Status</FormLabel>
                  <Input
                    placeholder={user.trainingStatus}
                    name="trainingStatus"
                    type="text"
                    value={trainingStatus}
                    onChange={e => setTrainingStatus(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1} gridRowStart={2}>
                <FormControl>
                  <FormLabel pb={5}>Active Status</FormLabel>
                  <Input
                    placeholder={user.activeStatus}
                    name="activeStatus"
                    type="text"
                    value={activeStatus}
                    onChange={e => setActiveStatus(e.target.value)}
                  />
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
            <HStack alignSelf="flex-end">
              <Button size="md">Cancel</Button>
              <Input
                bg="#F7FAFC"
                type="submit"
                w="30"
                onClick={handleSubmit}
                value="Save Changes"
              />
            </HStack>
          </FormControl>
        </VStack>
      </Container>
    </div>
  );
};

export default AccountPage;
