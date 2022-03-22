/* eslint-disable react/no-children-prop */
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
  InputGroup,
  InputRightAddon,
  IconButton,
  Grid,
  Flex,
  Box,
} from '@chakra-ui/react';
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import UploadModal from '../components/UploadModal';

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
  const [trainingStatus, setTrainingStatus] = useState('');
  const [activeStatus, setActiveStatus] = useState('');
  const [assignedSegments, setAsignedSegments] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('url...', process.env.REACT_APP_API_URL);

  const placeHolder = {
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

  const getAccountInfo = async () => {
    // FILL OUT WITH API ENDPOINT CALL
    // const id = '58693166-b08a-4459-9503-4f211bd6a760';
    // const info = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);
    // const user = info.data;
    // setFirstName(user.firstName);
    // setLastName(user.lastName);
    // setEmail(user.email);
    // setCurrPassword(user.password);
    // setTrainingStatus(user.isTrainee ? 'In-Training' : 'Not In-Training');
    // setActiveStatus(user.isActive ? 'Active' : 'Inactive');
    // setAsignedSegments(user.segments.toString());
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
          <Heading fontSize="2.4em" py="10" pl="2%" fontWeight={550}>
            Account Information
          </Heading>
          <Grid
            h="200px"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(5, 1fr)"
            rowGap="4.75em"
          >
            <GridItem colStart={1} rowStart={1} rowSpan={3} colSpan={1}>
              <Flex justifyContent="center">
                <Box position="relative" mr="1em">
                  <Image
                    e="8"
                    h="8"
                    borderRadius="full"
                    boxSize="180px"
                    src="https://bit.ly/dan-abramov"
                    alt="Profile picture"
                  />
                  <IconButton
                    bgColor="ochBlue"
                    color="white"
                    borderColor="white"
                    borderWidth="5px"
                    aria-label="Call Sage"
                    fontSize="1.65em"
                    borderRadius="50%"
                    w="2.1em"
                    h="2.1em"
                    icon={<FiEdit2 />}
                    position="absolute"
                    bottom={-0.5}
                    right={-0.75}
                    onClick={e => setIsModalOpen(true)}
                  />
                  <UploadModal
                    title="Edit Profile Picture"
                    isOpen={isModalOpen}
                    toggleOpen={setIsModalOpen}
                  />
                </Box>
              </Flex>
            </GridItem>
            <GridItem align="left" mt="1.5em" rowStart={1} rowSpan={1} colSpan={4}>
              <Heading fontSize="1.5em" mb=".8em" fontWeight={550}>
                Personal Information
              </Heading>

              <SimpleGrid columns={3} rows={2} spacing={10}>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      placeholder={placeHolder.firstName}
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
                      placeholder={placeHolder.lastName}
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
                      placeholder={placeHolder.email}
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
              </SimpleGrid>
            </GridItem>
            <GridItem align="left" colStart={2} colSpan={4}>
              <Heading gridRowStart={2} fontSize="1.5em" mb=".8em" fontWeight={550}>
                Volunteer Activity Information
              </Heading>
              <SimpleGrid columns={3} rows={2} spacing={10}>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Admin Training Status</FormLabel>
                    <Text
                      pl="5"
                      pt="2"
                      h="40px"
                      color="#2D3748"
                      bgColor="#EDF2F7"
                      borderRadius="5px"
                      placeholder={placeHolder.trainingStatus}
                    >
                      {trainingStatus}
                    </Text>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Admin Active Status</FormLabel>
                    <Text
                      pl="5"
                      pt="2"
                      h="40px"
                      color="#2D3748"
                      bgColor="#EDF2F7"
                      borderRadius="5px"
                      placeholder={placeHolder.activeStatus}
                    >
                      {activeStatus}
                    </Text>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Assigned Segment(s)</FormLabel>
                    <Text
                      pl="5"
                      pt="2"
                      h="40px"
                      color="#2D3748"
                      bgColor="#EDF2F7"
                      borderRadius="5px"
                      placeholder={placeHolder.assignedSegments}
                    >
                      {assignedSegments}
                    </Text>
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </GridItem>
            <GridItem align="left" colStart={2} colSpan={4}>
              <Heading fontSize="1.5em" alignSelf="flex-start" mb=".8em" fontWeight={550}>
                Change Password
              </Heading>
              <SimpleGrid columns={3} rows={2} spacing={10} w="70vw" h={100}>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Current Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={leftPasswordType}
                        placeholder="Enter Password"
                        value={currPassword}
                      />
                      <InputRightAddon
                        fontWeight={600}
                        children={leftButtonText}
                        onClick={toggleLeftPassword}
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>New Password</FormLabel>
                    <InputGroup>
                      <Input type={rightPasswordType} placeholder="Enter Password" />
                      <InputRightAddon
                        fontWeight={600}
                        children={rightButtonText}
                        onClick={toggleRightPassword}
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </GridItem>
            <GridItem colStart={4} colSpan={3}>
              <Input
                disabled={!changesMade}
                color="#F7FAFC"
                bg="#2D3748"
                type="submit"
                w="30"
                onClick={handleSubmit}
                value="Save Changes"
              />
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </div>
  );
};

export default AccountPage;
