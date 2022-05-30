import React, { useEffect, useState } from 'react';
import { Box, Stack, Text, VStack, Center } from '@chakra-ui/react';
import NewNumberModal from '../components/NumberModals/NewNumberModal';
import { OCHBackend } from '../common/utils';
import EmergencyContactTable from '../components/NumberModals/EmergencyContactTable';
import { useUserContext } from '../common/UserContext/UserContext';

// TODO:
// - Move components into their own files/out of other components (EmergencyContactTable)
// - Remove change, numbers state variable
// - Convert EditAndDeleteModal to arrow function
// - Replace Popover with Chakra Menu
// - Clean up modal opening logic
// - Maybe look into React Hook Form for validation

const Numbers = () => {
  const [change, setChange] = useState(true);
  const [tableData, setTableData] = useState([]);

  const user = useUserContext();

  const addNewNumber = async newNumber => {
    await OCHBackend.post('/numbers', {
      name: newNumber.name,
      number: newNumber.number,
      note: newNumber.note,
    });
    setChange(!change);
  };

  useEffect(async () => {
    const res = await OCHBackend.get('/numbers');
    setTableData(res.data);
  }, []);

  return (
    <Center>
      <Stack w="container.xl" justify-content="center" mb="4em">
        <VStack align="left" spacing="1.5em" w="100%">
          <Text fontWeight="600" fontSize="36px" mt="40px">
            Emergency Numbers
          </Text>
          <Text fontWeight="500" fontSize="16px" mt="24px">
            In the case of an emergency or situation beyond your authorizations, call for
            assistance.
          </Text>
          <Text>REMEMBER, YOUR SAFETY IS OUR PRIORITY.</Text>
          {user.userData.role === 'admin' && (
            <VStack spacing={2} align="stretch">
              <NewNumberModal addNewNumber={addNewNumber} />
            </VStack>
          )}
          <Box w="900px">
            <EmergencyContactTable
              tableData={tableData}
              setTableData={setTableData}
              admin={user.userData.role === 'admin'}
            />
          </Box>
        </VStack>
      </Stack>
    </Center>
  );
};

export default Numbers;
