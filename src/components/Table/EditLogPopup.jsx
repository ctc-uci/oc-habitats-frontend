import { useState, React } from 'react';
import {
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from '@chakra-ui/react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
/*
Close button code if needed later
<Button colorScheme="gray" mr={3} onClick={onClose}>
  Close
</Button>
*/
function EditLogPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('');
  const handleInputChange = e => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  return (
    <>
      <IconButton onClick={onOpen} icon={<MdOutlineModeEditOutline />} />

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You are requesting to edit this monitor log.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Reason:
            <Textarea value={value} onChange={handleInputChange} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              disabled={value === ''}
              bg="#2BC0E3"
              color="#F7FAFC"
              variant="solid"
            >
              Make Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default EditLogPopup;
