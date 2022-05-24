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
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import UploadModal from '../components/UploadModal';
import defaultPic from '../assets/defaultProfile.jpg';
import Toast from '../components/Toast';
import { updateUserPassword } from '../common/auth_utils';
import { useUserContext } from '../common/UserContext/UserContext';
import { OCHBackend } from '../common/utils';

const AccountPage = ({ setChangesMade }) => {
  const { userData } = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      currPassword: undefined,
      newPassword: undefined,
    },
  });
  // stores information on whether the passwords are hidden/shown, plus the state of the button text
  const [leftPasswordType, setLeftPasswordType] = useState('password');
  const [rightPasswordType, setRightPasswordType] = useState('password');
  const [leftButtonText, setLeftButtonText] = useState('Show');
  const [rightButtonText, setRightButtonText] = useState('Show');

  // storing form data in state for retrieval on submission
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cloudImgSrc, setCloudImgSrc] = useState(null);
  const [file, setFile] = useState(0);
  const [isFileSaved, setIsFileSaved] = useState(true);

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

  useEffect(() => {
    setLoading(true);
    if (userData.profileImage) {
      const base64String = Buffer.from(userData.profileImage.data.data).toString('base64');
      setCloudImgSrc(`data:${userData.profileImage.contentType};base64,${base64String}`);
    }
    setLoading(false);
  }, [userData]);

  const saveUpload = upload => {
    URL.revokeObjectURL(file.preview);
    setFile(upload);
    setIsFileSaved(false);
  };

  const formatAssignedSeg = () => {
    const segments = userData.segments.map(segment => {
      return segment.segmentId;
    });
    return segments.toString();
  };
  // submits the information the user entered into the form, bypassing default form submission effect
  // replace with POST call to backend when endpoints are ready
  const toast = useToast();
  const onSubmit = async data => {
    // Check if user filled current password, but empty new password
    if (data.currPassword && !data.newPassword) {
      return Toast(toast, 'empty');
    }

    // Create form data to send to backend
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    if (file) formData.append('profileImage', file);

    // First cross check current password
    // Set updateResult to empty str incase dont need to update password
    let updatePassResult = '';
    try {
      // Only if user inputs new password and curr password update passwords
      if (data.newPassword && data.currPassword) {
        updatePassResult = await updateUserPassword(data.newPassword, data.currPassword);
      }
      // Only if updating password was successful or didn't need to update password, update mongo
      if (updatePassResult === 'success' || updatePassResult === '') {
        await OCHBackend.put(`/users/update/${userData.id}`, formData);
        setIsFileSaved(true);
        reset(data);
      }
      return Toast(toast, updatePassResult);
    } catch (err) {
      // Check if updated password, but not updated on mongo
      if (updatePassResult === 'success' && err.response.data.message.includes('not update')) {
        return Toast(toast, 'success');
      }
      return Toast(toast, 'error');
    }
  };

  useEffect(() => {
    if (isDirty || !isFileSaved) setChangesMade(true);
    else setChangesMade(false);
  }, [isDirty, isFileSaved]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  const fileImgSrc = file ? file.preview : null;

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
                  src={fileImgSrc || cloudImgSrc}
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
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="First Name" type="text" {...field} />
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => <Input placeholder="Last Name" type="text" {...field} />}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input placeholder="Email" type="text" {...field} />}
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
                    {userData.isTrainee ? 'In-Training' : 'Not In-Training'}
                  </Text>
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                <FormControl>
                  <FormLabel>Admin Active Status</FormLabel>
                  <Text pl="5" pt="2" h="40px" color="#2D3748" bgColor="#EDF2F7" borderRadius="5px">
                    {userData.isActive ? 'Active' : 'Not Active'}
                  </Text>
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                <FormControl>
                  <FormLabel>Assigned Segment(s)</FormLabel>
                  <Text pl="5" pt="2" h="40px" color="#2D3748" bgColor="#EDF2F7" borderRadius="5px">
                    {formatAssignedSeg()}
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
                  <Controller
                    name="currPassword"
                    control={control}
                    render={({ field }) => (
                      <InputGroup>
                        <Input type={leftPasswordType} placeholder="Enter Password" {...field} />
                        <InputRightAddon
                          fontWeight={600}
                          children={leftButtonText}
                          onClick={toggleLeftPassword}
                        />
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                <FormControl>
                  <FormLabel>New Password</FormLabel>
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                      <InputGroup>
                        <Input type={rightPasswordType} placeholder="Enter Password" {...field} />
                        <InputRightAddon
                          fontWeight={600}
                          children={rightButtonText}
                          onClick={toggleRightPassword}
                        />
                      </InputGroup>
                    )}
                  />
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
                  disabled={!isDirty && isFileSaved}
                  color="#F7FAFC"
                  bg="#2D3748"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
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
  setChangesMade: PropTypes.func.isRequired,
};

export default AccountPage;
