import { useState, React } from 'react';
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Stack,
  Input,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function AddAccountPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('0');
  const [volInput, setVolInput] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const volHandleChange = event => setVolInput(event.target.value);
  const adminNameHandleChange = event => setAdminName(event.target.value);
  const adminEmailHandleChange = event => setAdminEmail(event.target.value);
  return (
    <>
      <Button onClick={onOpen} bg="ochBlue" color="#F7FAFC" variant="solid" rightIcon={<AddIcon />}>
        Create New Account
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup onChange={setValue} value={value}>
              <Stack column="vertical">
                <Radio value="1">Volunteer</Radio>
                <Radio value="2">Admin</Radio>
              </Stack>
            </RadioGroup>
            {value === '1' && (
              <Stack columnt="vertical">
                <br />
                <p>Enter volunteer&apos;s email:</p>
                <Input variant="filled" value={volInput} onChange={volHandleChange} />
              </Stack>
            )}
            {value === '2' && (
              <Stack column="vertical">
                <br />
                <p>Enter admin&apos;s name:</p>
                <Input variant="filled" value={adminName} onChange={adminNameHandleChange} />
                <p>
                  Enter admin&apos;s OCH email:
                  <Input variant="filled" value={adminEmail} onChange={adminEmailHandleChange} />
                </p>
              </Stack>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              disabled={
                value === '0' ||
                (value === '1' && volInput === '') ||
                (value === '2' && (adminEmail === '' || adminName === ''))
              }
              bg="ochBlue"
              color="#F7FAFC"
              variant="solid"
            >
              Create New User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddAccountPopup;
