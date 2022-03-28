import React, { useEffect, useState } from 'react';
import { Container, Heading, Button, Flex, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { OCHBackend } from '../common/utils';
import { PeopleTable, AddAccountPopup } from '../components/PeopleTable';

// TODO:
// - Update to new schema:
//  - Fetching/filtering users
//  - Registered badge
//  - Three dot menu
//  - Last updated column (sorting)

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
      <Flex justifyContent="flex-start" gap="40px">
        <AddAccountPopup />
        <Flex>
          <Spacer />
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              rightIcon={<AiOutlineUnorderedList />}
              bg="ochOrange"
              color="ochBlack"
              variant="solidNoHover"
            >
              View Segment Assignments
            </Button>
          </Link>
        </Flex>
      </Flex>
      {/* <pre>{JSON.stringify(volunteerData, null, 2)}</pre> */}
      <PeopleTable
        variant="volunteer"
        userData={volunteerData}
        segments={segments}
        loading={isLoading}
      />
      <PeopleTable variant="admin" userData={adminData} segments={segments} loading={isLoading} />
    </Container>
  );
};
export default PeoplePage;
