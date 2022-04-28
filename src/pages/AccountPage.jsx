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
  HStack,
  useToast,
} from '@chakra-ui/react';
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import PropTypes from 'prop-types';
import UploadModal from '../components/UploadModal';
import defaultPic from '../assets/defaultProfile.jpg';
import Toast from '../components/Toast';

const AccountPage = ({
  changesMade,
  setChangesMade,
  // TODO: Remove when getting ID from param/props
  id = 'd882dffe-d560-4f24-a3ff-a3dc8eb9ef0d',
}) => {
  const [isLoading, setLoading] = useState(false);

  // stores information on whether the passwords are hidden/shown, plus the state of the button text
  const [leftPasswordType, setLeftPasswordType] = useState('password');
  const [rightPasswordType, setRightPasswordType] = useState('password');
  const [leftButtonText, setLeftButtonText] = useState('Show');
  const [rightButtonText, setRightButtonText] = useState('Show');

  // storing form data in state for retrieval on submission
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [isTrainee, setIsTrainee] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [assignedSegments, setAsignedSegments] = useState(null);
  const [currPassword, setCurrPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [file, setFile] = useState(0);

  // Holds user info from mongo
  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    email: null,
    isTrainee: null,
    isActive: null,
    assignedSegments: null,
  });

  // shows/hides the left ("current") password accordingly
  // and changes the button text from "show" to "hide"
  // when appropriate
  const toggleLeftPassword = () => {
    if (leftPasswordType === 'password') {
      setLeftPasswordType('text');
      setLeftButtonText('Hide');
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
      setRightButtonText('Hide');
    } else {
      setRightPasswordType('password');
      setRightButtonText('Show');
    }
  };

  const getAccountInfo = async () => {
    let currUser = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`);
    currUser = currUser.data;

    setFirstName(currUser.firstName);
    setLastName(currUser.lastName);
    setEmail(currUser.email);
    setIsTrainee(currUser.isTrainee);
    setIsActive(currUser.isActive);
    setAsignedSegments(currUser.segments.toString());
    setUser({
      ...user,
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      email: currUser.email,
      isTrainee: currUser.isTrainee,
      isActive: currUser.isActive,
      assignedSegments: currUser.segments.toString(),
      // currPassword: currUser.password,
    });
    const base64String = Buffer.from(currUser.profileImage.data.data).toString('base64');
    setImageSource(`data:${currUser.profileImage.contentType};base64,${base64String}`);
  };

  useEffect(async () => {
    setLoading(true);
    await getAccountInfo();
    setLoading(false);
  }, []);

  const checkChanges = () => {
    if (
      user.email !== email ||
      user.firstName !== firstName ||
      user.lastName !== lastName ||
      currPassword ||
      newPassword
    ) {
      setChangesMade(true);
    } else {
      setChangesMade(false);
    }
  };

  const saveUpload = upload => {
    URL.revokeObjectURL(file.preview);
    setFile(upload);
    setChangesMade(true);
  };
  // submits the information the user entered into the form, bypassing default form submission effect
  // replace with POST call to backend when endpoints are ready
  const toast = useToast();
  const handleSubmit = async e => {
    e.preventDefault();
    // if (newPassword && currPassword !== user.currPassword) {
    //   return Toast(toast, 'password');
    // }
    if (currPassword && !newPassword) {
      return Toast(toast, 'empty');
    }
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    if (file) formData.append('profileImage', file);
    if (newPassword && currPassword) formData.append('password', newPassword);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/users/update/${id}`, formData);
      setChangesMade(false);
      setCurrPassword('');
      setNewPassword('');
      // if (newPassword)
      //   setUser({
      //     ...user,
      //     firstName,
      //     lastName,
      //     email,
      //     currPassword: newPassword,
      //   });
      // else {
      setUser({
        ...user,
        firstName,
        lastName,
        email,
      });
      // }

      return Toast(toast, 'success');
    } catch (err) {
      return Toast(toast, 'error');
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  const imgSrc = file ? file.preview : null;

  return (
    <div>
      <Container h="110vh" maxW="85vw">
        <VStack align="left">
          <Heading fontSize="2.4em" py="10" pl="2%" fontWeight={550}>
            Account Information
          </Heading>
          <Grid
            h="200px"
            templateRows="repeat(4, 1fr)"
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
                    src={imgSrc || imageSource}
                    alt="Profile picture"
                    objectFit="cover"
                    fallbackSrc={defaultPic}
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
                    onClick={() => setIsModalOpen(true)}
                  />
                  <UploadModal
                    title="Edit Profile Picture"
                    isOpen={isModalOpen}
                    toggleOpen={setIsModalOpen}
                    saveUpload={saveUpload}
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
                      placeholder="First Name"
                      name="firstName"
                      type="text"
                      value={firstName || ''}
                      onChange={e => {
                        setFirstName(e.target.value);
                        checkChanges();
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      placeholder="Last Name"
                      name="lastName"
                      type="text"
                      value={lastName || ''}
                      onChange={e => {
                        setLastName(e.target.value);
                        checkChanges();
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={email || ''}
                      onChange={e => {
                        setEmail(e.target.value);
                        checkChanges();
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
                    >
                      {isTrainee ? 'In-Training' : 'Not In-Training'}
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
                    >
                      {isActive ? 'Active' : 'Not Active'}
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
                    >
                      {assignedSegments}
                    </Text>
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </GridItem>
            <GridItem gridRowStart={3} align="left" colStart={2} colSpan={4}>
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
                        value={currPassword || ''}
                        name="currPassword"
                        onChange={e => {
                          setCurrPassword(e.target.value);
                          checkChanges();
                        }}
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
                      <Input
                        type={rightPasswordType}
                        placeholder="Enter Password"
                        value={newPassword || ''}
                        onChange={e => {
                          setNewPassword(e.target.value);
                          checkChanges();
                        }}
                      />
                      <InputRightAddon
                        fontWeight={600}
                        children={rightButtonText}
                        onClick={toggleRightPassword}
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>
              </SimpleGrid>
              <GridItem>
                <HStack justifyContent="flex-end" mt="1.5em">
                  <Input
                    disabled={!changesMade}
                    color="#F7FAFC"
                    bg="#2D3748"
                    type="submit"
                    onClick={handleSubmit}
                    w="31%"
                    h="3em"
                    value="Save Changes"
                  />
                </HStack>
              </GridItem>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </div>
  );
};

AccountPage.propTypes = {
  changesMade: PropTypes.bool.isRequired,
  setChangesMade: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default AccountPage;
