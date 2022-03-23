import React, { useEffect, useState } from 'react';
import { VStack, Container, Heading, Button, Flex, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { OCHBackend } from '../common/utils';
import App from '../components/Table/Table';
import AddAccountPopup from '../components/Table/AddAccountPopup';
import PeopleTable from '../components/PeopleTable';

const PeoplePage = () => {
  const [volunteerData, setVolunteerData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const res = await OCHBackend.get('users/');

    // Temporarily remove new schema users
    // TODO - remove
    const oldSchema = res?.data.filter(user => !('firebaseId' in user));

    // Split admins and volunteers
    setVolunteerData(oldSchema.filter(user => user.isAdmin === false));
    setAdminData(oldSchema.filter(user => user.isAdmin === true));
    setIsLoading(false);
  }, []);

  return (
    <>
      <Container maxW="container.xl">
        <Heading fontWeight="600" fontSize="36px" mb="40px" mt="40px" align="left">
          People
        </Heading>
        <Flex justifyContent="space-between">
          <AddAccountPopup />
          <Flex>
            <Spacer />
            <Link to="/account" style={{ textDecoration: 'none' }}>
              <Button rightIcon={<FiEdit2 />} bg="ochOrange" color="#F7FAFC" variant="solid">
                Edit Segment Assignments
              </Button>
            </Link>
          </Flex>
        </Flex>
        <Heading fontWeight="600" fontSize="20px" mb="20px" mt="40px" align="left">
          Volunteers
        </Heading>
        <Heading fontWeight="400" fontSize="18px" mb="40px" mt="20px" align="left" display="inline">
          Select the <BsThreeDotsVertical style={{ display: 'inline' }} /> button on a row in the
          table to view or edit a Volunteer profile.
        </Heading>

        <VStack spacing="20px" align="left">
          <header />
          <App />
          <Heading fontWeight="600" fontSize="20px" mb="20px" mt="40px" align="left">
            Admins
          </Heading>
          <Heading
            fontWeight="400"
            fontSize="18px"
            mb="40px"
            mt="20px"
            align="left"
            display="inline"
          >
            Select the <BsThreeDotsVertical style={{ display: 'inline' }} /> button on a row in the
            table to view or edit an Admin profile.
          </Heading>
          <App />
        </VStack>
        <pre>{JSON.stringify(volunteerData, null, 2)}</pre>
        {!isLoading && <PeopleTable variant="volunteer" data={volunteerData} />}
        {!isLoading && <PeopleTable variant="admin" data={adminData} />}
      </Container>
    </>
  );
};
export default PeoplePage;
