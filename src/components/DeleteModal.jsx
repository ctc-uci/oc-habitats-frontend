import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';

const DeleteModal = () => {
  /* const handleDelete = async e => {
    try {
      // INSERT DELETE LOGIC HERE
    } catch (err) {
      // HANDLE ERROR HERE
    }
  }; */

  return (
    <Box w="460px" h="352px" bgColor="rgba(253, 253, 253, 1)" pl="21px" pt="24px">
      <Heading size="md" mb="30px">
        Delete Question
      </Heading>
      Are you sure you want to delete [Question Title]? This action cannot be undone.
      <Button
        mt="30px"
        mb="10px"
        type="submit"
        bgColor="ochRed"
        color="white"
        w="412px"
        h="40px"
        // onClick={handleDelete}
      >
        Yes, Delete
      </Button>
      <Button type="submit" w="412px" h="40px" /* onClick={handleDelete} */>
        Cancel
      </Button>
    </Box>
  );
};

export default DeleteModal;
