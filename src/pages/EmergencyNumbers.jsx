import React, { useEffect, useState } from 'react';
import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';
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
    <Stack
      mx={{ md: '10%', base: '10px' }}
      mb={{ md: 10, base: 20 }}
      spacing="20px"
      maxW="1000px"
      align="flex-start"
    >
      <Heading mt="20px">Emergency Numbers</Heading>
      <Stack
        w="100%"
        direction={{ md: 'row', base: 'column' }}
        justify="space-between"
        align={{ md: 'flex-end', base: 'flex-start' }}
      >
        <Text p={0}>
          <Text>
            In the case of an emergency or situation beyond your authorizations, call for
            assistance.
          </Text>
          <Text fontWeight="500">REMEMBER, YOUR SAFETY IS OUR PRIORITY.</Text>
        </Text>
        {user.userData.role === 'admin' && (
          <VStack spacing={2} align="stretch">
            <NewNumberModal addNewNumber={addNewNumber} />
          </VStack>
        )}
      </Stack>
      <Box maxW="1000px" w={{ base: '100%' }}>
        <EmergencyContactTable
          tableData={tableData}
          setTableData={setTableData}
          admin={user.userData.role === 'admin'}
        />
      </Box>
    </Stack>
  );
};

export default Numbers;
