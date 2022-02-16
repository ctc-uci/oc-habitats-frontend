import { useState, React } from 'react';
import { VStack, Container, Heading, Button } from '@chakra-ui/react';
import { BsThreeDotsVertical } from "react-icons/bs";
import App from '../components/Table/Table';
import AddAccountPopup from '../components/Table/AddAccountPopup';

const PeoplePage = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <>
      <Container maxW="container.xl">
        <Heading fontWeight="600" fontSize="36px" mb="40px" mt="40px" align="left">
          People
        </Heading>
        <AddAccountPopup />

        <Heading fontWeight="600" fontSize="20px" mb="20px" mt="40px" align="left">
          Volunteers
        </Heading>
        <Heading fontWeight="400" fontSize="18px" mb="40px" mt="20px" align="left" display="inline">
          Select the <BsThreeDotsVertical style={{display: "inline"}} /> button on a row in the table to view or edit a Volunteer profile.
        </Heading>

        <VStack spacing="20px" align="left">
          <header></header>
          <App />
          <Heading fontWeight="600" fontSize="20px" mb="20px" mt="40px" align="left">
            Admins
          </Heading>
          <Heading fontWeight="400" fontSize="18px" mb="40px" mt="20px" align="left" display="inline">
            Select the <BsThreeDotsVertical style={{display: "inline"}} /> button on a row in the table to view or edit an Admin profile.
          </Heading>
          <App />
        </VStack>
      </Container>
    </>
  );
};
export default PeoplePage;
