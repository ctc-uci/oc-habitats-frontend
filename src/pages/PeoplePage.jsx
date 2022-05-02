import React, { useEffect, useState } from 'react';
import { Container, Heading, Button, Flex } from '@chakra-ui/react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { OCHBackend } from '../common/utils';
import { PeopleTable, AddAccountPopup } from '../components/PeopleTable';
import AUTH_ROLES from '../common/auth_config';

const { ADMIN_ROLE, VOLUNTEER_ROLE } = AUTH_ROLES.AUTH_ROLES;

/*
Using backend branch 32-add-user-router

TODO:
- Styling:
  - Long names + badge looks bad
  - Segments column needs to be fixed width
  - More than 2 assigned segments
  - Wide toast variant that can be used elsewhere
  - Mobile
- Update to new schema:
  X Fetching/filtering users
  - Registered badge
  - Three dot menu conditional render
  - Last updated column (sorting)
- Functionality:
  - View segment assignment page
  X Backend connection for admin invites
  - Convert account type modal
  - Delete pending account modal
- Refactoring:
  - One common util file for all backend request functions
*/

const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [volunteerData, setVolunteerData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [segments, setSegments] = useState([]);

  const fetchTableData = async () => {
    const [users, segmentsData] = await Promise.all([
      OCHBackend.get('users/'),
      OCHBackend.get('segments/'),
    ]).catch(err => {
      // eslint-disable-next-line no-console
      console.error(err.message);
    });

    setSegments(segmentsData.data);

    // Split admins and volunteers
    setVolunteerData(users.data.filter(user => user?.role === VOLUNTEER_ROLE));
    setAdminData(users.data.filter(user => user?.role === ADMIN_ROLE));
    setIsLoading(false);
  };

  useEffect(async () => {
    await fetchTableData();
  }, []);

  return (
    <Container maxW={{ md: 'container.xl', base: 'container.sm' }} mb={{ md: '0', base: '5em' }}>
      <Heading fontWeight="600" fontSize="36px" m="30px 0" align="left">
        People
      </Heading>
      <Flex justifyContent="flex-start" gap={{ md: '40px', base: '20px' }} wrap="wrap">
        <AddAccountPopup />
        <Button
          rightIcon={<AiOutlineUnorderedList />}
          bg="ochOrange"
          color="ochBlack"
          variant="solidNoHover"
          w={{ md: 'auto', base: '100%' }}
        >
          View Segment Assignments
        </Button>
      </Flex>
      {/* <pre>{JSON.stringify(volunteerData, null, 2)}</pre> */}
      <PeopleTable
        variant="volunteer"
        userData={volunteerData}
        segments={segments}
        loading={isLoading}
        refreshData={fetchTableData}
      />
      <PeopleTable
        variant="admin"
        userData={adminData}
        segments={segments}
        loading={isLoading}
        refreshData={fetchTableData}
      />
    </Container>
  );
};
export default PeoplePage;
