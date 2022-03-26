import React, { useEffect, useState } from 'react';
import { Container, Heading, Button, Flex, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';
import { OCHBackend } from '../common/utils';
import App from '../components/Table/Table';
import AddAccountPopup from '../components/Table/AddAccountPopup';
import PeopleTable from '../components/PeopleTable';

const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [volunteerData, setVolunteerData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [segments, setSegments] = useState([]);

  useEffect(async () => {
    const [users, segmentsData] = await Promise.all([
      OCHBackend.get('users/'),
      OCHBackend.get('segments/'),
    ]).catch(err => {
      // eslint-disable-next-line no-console
      console.error(err.message);
    });

    setSegments(segmentsData.data);

    // Temporarily remove new schema users
    // TODO - remove
    // const oldSchema = users?.data.filter(user => !('registered' in user));
    const oldSchema = users.data;

    // Split admins and volunteers
    setVolunteerData(oldSchema.filter(user => user?.isAdmin === false));
    setAdminData(oldSchema.filter(user => user?.isAdmin === true));
    setIsLoading(false);
  }, []);

  return (
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
      {/* <pre>{JSON.stringify(volunteerData, null, 2)}</pre> */}
      {!isLoading && (
        <PeopleTable variant="volunteer" peopleData={volunteerData} segments={segments} />
      )}
      {!isLoading && <PeopleTable variant="admin" peopleData={adminData} segments={segments} />}
    </Container>
  );
};
export default PeoplePage;
