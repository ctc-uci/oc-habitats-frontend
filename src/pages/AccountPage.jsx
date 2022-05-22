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
import { set } from 'react-hook-form';
import UploadModal from '../components/UploadModal';
import defaultPic from '../assets/defaultProfile.jpg';
import Toast from '../components/Toast';
import { updateUserPassword } from '../common/auth_utils';
import { useUserContext } from '../common/UserContext/UserContext';

const AccountPage = ({ changesMade, setChangesMade }) => {
  // console.log('loaded Acc page');
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

  const { userData } = useUserContext();

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

  const setAccountInfo = user => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setIsTrainee(user.isTrainee);
    setIsActive(user.isActive);
    setAsignedSegments(user.segments.toString());
    // if (userData.profileImage) {
    //   const base64String = Buffer.from(currUser.profileImage.data.data).toString('base64');
    //   setImageSource(`data:${currUser.profileImage.contentType};base64,${base64String}`);
    // }
  };

  useEffect(async () => {
    setLoading(true);
    setAccountInfo(userData);
    setLoading(false);
  }, []);

  const checkChanges = () => {
    if (
      userData.email !== email ||
      userData.firstName !== firstName ||
      userData.lastName !== lastName ||
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
    if (currPassword && !newPassword) {
      return Toast(toast, 'empty');
    }
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    if (file) formData.append('profileImage', file);
    let isPassUpdated = true;
    if (newPassword && currPassword) {
      isPassUpdated = updateUserPassword(newPassword, currPassword);
    }
    let updatedProfile;
    if (isPassUpdated) {
      try {
        updatedProfile = await axios.put(
          `${process.env.REACT_APP_API_URL}/users/update/${userData.id}`,
          formData,
        );
        if (newPassword && currPassword) {
          const updateResult = updateUserPassword(newPassword, currPassword);
          console.log('updatedResult', updateResult);
          if (updateResult !== 'success') {
            // console.log(updateResult);
            return Toast(toast, updateResult);
          }
        }
        setChangesMade(false);
        setAccountInfo(updatedProfile);
        setCurrPassword('');
        setNewPassword('');
        return Toast(toast, 'success');
      } catch (err) {
        return Toast(toast, 'error');
      }
    }

    return Toast(toast, 'error');
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  const imgSrc = file ? file.preview : null;

  return (
    <Box mb={{ lg: '100px' }}>
      <VStack align="left" mx="auto" w="90vw">
        <Heading
          textAlign={{ lg: 'left', sm: 'center' }}
          fontSize="3xl"
          py={{ lg: '10', sm: '5' }}
          pl="2%"
          fontWeight={550}
        >
          Account Information
        </Heading>
        <Grid
          templateRows={{ lg: 'repeat(3, 1fr)', sm: 'repeat(5, fr)' }}
          templateColumns={{ lg: 'repeat(5, 1fr)', sm: 'repeat(1, fr)' }}
          rowGap="3em"
        >
          <GridItem colStart={1} rowStart={1} rowSpan={{ lg: 3, sm: 1 }} colSpan={1}>
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
          <GridItem
            align="left"
            mt={{ lg: '1.5em', sm: '0.5em' }}
            rowStart={{ lg: 1, sm: 2 }}
            colStart={{ lg: 2 }}
            rowSpan={1}
            colSpan={{ lg: 4, sm: 1 }}
          >
            <Heading fontSize="xl" mb=".8em" fontWeight={550}>
              Personal Information
            </Heading>

            <SimpleGrid columns={{ lg: 3, sm: 1 }} rows={{ lg: 2, sm: 3 }} spacing={10}>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
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
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
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
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
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
          <GridItem align="left" colStart={{ lg: 2, sm: 1 }} colSpan={{ lg: 4, sm: 1 }}>
            <Heading gridRowStart={2} fontSize="xl" mb=".8em" fontWeight={550}>
              Volunteer Activity Information
            </Heading>
            <SimpleGrid columns={{ lg: 3, sm: 1 }} rows={{ lg: 2, sm: 3 }} spacing={10}>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                <FormControl>
                  <FormLabel>Admin Training Status</FormLabel>
                  <Text pl="5" pt="2" h="40px" color="#2D3748" bgColor="#EDF2F7" borderRadius="5px">
                    {isTrainee ? 'In-Training' : 'Not In-Training'}
                  </Text>
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                <FormControl>
                  <FormLabel>Admin Active Status</FormLabel>
                  <Text pl="5" pt="2" h="40px" color="#2D3748" bgColor="#EDF2F7" borderRadius="5px">
                    {isActive ? 'Active' : 'Not Active'}
                  </Text>
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                <FormControl>
                  <FormLabel>Assigned Segment(s)</FormLabel>
                  <Text pl="5" pt="2" h="40px" color="#2D3748" bgColor="#EDF2F7" borderRadius="5px">
                    {assignedSegments}
                  </Text>
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </GridItem>
          <GridItem
            rowStart={{ lg: 3, sm: 4 }}
            align="left"
            colStart={{ lg: 2, sm: 1 }}
            colSpan={{ lg: 4, sm: 1 }}
          >
            <Heading fontSize="xl" alignSelf="flex-start" mb=".8em" fontWeight={550}>
              Change Password
            </Heading>
            <SimpleGrid columns={{ lg: 3, sm: 1 }} rows={{ lg: 2, sm: 3 }} spacing={10} h={100}>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
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
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
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
            <GridItem colStart={{ sm: 1 }} rowStart={{ sm: 5 }}>
              <HStack
                justifyContent="flex-end"
                mb={{ lg: 0, sm: '100px' }}
                mt={{ lg: '1.5em', sm: '7em' }}
              >
                <Input
                  disabled={!changesMade}
                  color="#F7FAFC"
                  bg="#2D3748"
                  type="submit"
                  onClick={handleSubmit}
                  _hover={{ cursor: 'pointer' }}
                  w={{ lg: '31%', sm: '100%' }}
                  h="3em"
                  value="Save Changes"
                />
              </HStack>
            </GridItem>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

AccountPage.propTypes = {
  changesMade: PropTypes.bool.isRequired,
  setChangesMade: PropTypes.func.isRequired,
};

export default AccountPage;
