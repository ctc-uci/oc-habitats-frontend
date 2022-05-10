import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Text,
  FormLabel,
  Input,
  FormControl,
  GridItem,
  SimpleGrid,
  Image,
  VStack,
  Heading,
  Grid,
  Flex,
  Box,
  Select,
  Button,
} from '@chakra-ui/react';
import { OCHBackend } from '../../common/utils';
import AUTH_ROLES from '../../common/auth_config';

const { ADMIN_ROLE } = AUTH_ROLES.AUTH_ROLES;

const PersonalInformation = ({ userData, updateUser }) => {
  const [userStatus, setUserStatus] = useState({
    isActive: true,
    isTrainee: false,
  });
  const [dirty, setDirty] = useState(false);
  const userSegments = userData?.segments?.map(segment => segment.segmentId).join(', ');

  useEffect(() => {
    setUserStatus({
      isActive: userData?.isActive,
      isTrainee: userData?.isTrainee,
    });
  }, [userData]);

  return (
    <Box mb={{ lg: '100px' }}>
      <VStack align="left" mx="auto">
        <Heading
          textAlign="left"
          fontSize={{ md: '3xl', base: 'xl' }}
          py={{ md: '10', base: '5' }}
          pl={{ md: '2%', base: '0' }}
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
                  src="https://bit.ly/dan-abramov"
                  alt="Profile picture"
                  objectFit="cover"
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
                    value={userData.firstName}
                    bg="gray.100"
                    isDisabled
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    placeholder="Last Name"
                    name="lastName"
                    value={userData.lastName}
                    bg="gray.100"
                    isDisabled
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    name="email"
                    value={userData.email}
                    bg="gray.100"
                    isDisabled
                  />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </GridItem>
          <GridItem align="left" colStart={{ lg: 2, sm: 1 }} colSpan={{ lg: 4, sm: 1 }}>
            <Heading gridRowStart={2} fontSize="xl" mb=".8em" fontWeight={550}>
              {userData.role === ADMIN_ROLE ? 'Admin' : 'Volunteer'} Activity Information
            </Heading>
            <form onSubmit={() => updateUser(userStatus)}>
              <SimpleGrid columns={{ lg: 3, sm: 1 }} rows={{ lg: 2, sm: 3 }} spacing={10}>
                <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                  <FormControl>
                    <FormLabel>Training Status</FormLabel>
                    <Select
                      value={`${userStatus.isTrainee}`}
                      onChange={e => {
                        setDirty(true);
                        setUserStatus({
                          ...userStatus,
                          isTrainee: e.target.value === 'true',
                        });
                      }}
                    >
                      <option value="true">In progress</option>
                      <option value="false">Complete</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                  <FormControl>
                    <FormLabel>Active Status</FormLabel>
                    <Select
                      value={`${userStatus.isActive}`}
                      onChange={e => {
                        setDirty(true);
                        setUserStatus({
                          ...userStatus,
                          isActive: e.target.value === 'true',
                        });
                      }}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ lg: 1 }} rowSpan={{ sm: 1 }}>
                  <FormControl>
                    <FormLabel>Assigned Segment(s)</FormLabel>
                    <Input
                      placeholder="None"
                      name="assigned segments"
                      value={userSegments}
                      bg="gray.100"
                      isDisabled
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <Button type="submit" variant="solid" bg="ochBlue" size="md" isDisabled={!dirty}>
                    Save Changes
                  </Button>
                </GridItem>
              </SimpleGrid>
            </form>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

const UserInformation = () => {
  // Fetch user's id from URL params
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const fetchUser = async () => {
    try {
      const res = await OCHBackend.get(`/users/${id}`);
      setUserData(res.data);
    } catch {
      navigate('/people');
    }
  };

  const updateUser = async ({ isTrainee, isActive }) => {
    console.log({
      isTrainee,
      isActive,
    });
    await OCHBackend.put(`/users/update/${id}`, { isTrainee, isActive });
    await fetchUser();
  };

  useEffect(async () => {
    if (!id) navigate('/people');
    await fetchUser();
  }, [id]);

  return (
    <Container maxW={{ md: 'container.xl', base: 'container.sm' }} mb={{ md: '0', base: '5em' }}>
      <PersonalInformation userData={userData} updateUser={updateUser} />
    </Container>
  );
};

PersonalInformation.propTypes = {
  userData: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default UserInformation;
