import { React } from 'react';
import {
  Button,
  Tr,
  Td,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

function UpdateSegmentPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button backgroundColor="#A0AEC0" color="white" size="sm" onClick={onOpen}>
        Update
      </Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Segment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>*UPDATE SEGMENT HERE*</div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const Segment = ({ segment, segmentName, distance }) => {
  return (
    <Tr>
      <Td>{segment}</Td>
      <Td>{segmentName}</Td>
      <Td>
        <Flex justifyContent="space-between">
          <Text>{distance}</Text>
          {UpdateSegmentPopup()}
        </Flex>
      </Td>
    </Tr>
  );
};

Segment.propTypes = {
  segment: PropTypes.string.isRequired,
  segmentName: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
};

export default Segment;
