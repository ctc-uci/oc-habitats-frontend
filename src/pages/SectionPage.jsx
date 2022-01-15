import { React, useState } from 'react';
import {
  Box,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from '@chakra-ui/react';
import Section from '../components/Section';

const sectionsData = [
  {
    id: 1,
    title: 'Section 1: Seal Beach to Huntington Beach (South)',
    segments: [
      {
        segment: 'OC01',
        segmentName: 'Seal Beach (1st St. - North End Anaheim Bay)',
        distance: 1.6,
      },
      {
        segment: 'OC02',
        segmentName: 'Surfside (South of Anaheim Bay to 19th Street)',
        distance: 1.8,
      },
      {
        segment: 'OC03',
        segmentName: 'Sunset Beach (19th Street to Warner Avenue)',
        distance: 1.3,
      },
    ],
  },
  {
    id: 2,
    title: 'Section 2: Newport Beach to Laguna Beach',
    segments: [
      {
        segment: '[TEST 2]OC01',
        segmentName: '[TEST 2]Seal Beach (1st St. - North End Anaheim Bay)',
        distance: 1.6,
      },
      {
        segment: '[TEST 2]OC02',
        segmentName: '[TEST 2]Surfside (South of Anaheim Bay to 19th Street)',
        distance: 1.8,
      },
      {
        segment: '[TEST 2]OC03',
        segmentName: '[TEST 2]Sunset Beach (19th Street to Warner Avenue)',
        distance: 1.3,
      },
    ],
  },
];

function AddSectionPopup(addSection) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button color="#2D3748" colorScheme="white" variant="ghost" fontSize="16px" onClick={onOpen}>
        Add Section
      </Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Section</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>*Add section information here*</div>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                addSection();
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const SectionPage = () => {
  const [sections, setSections] = useState(sectionsData);
  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: 'New Section',
      segments: [],
    };
    setSections([...sections, newSection]);
  };
  return (
    <>
      {sections.map(sectionObj => {
        return (
          <>
            <Box h="25px" />
            <Section key={sectionObj.id} title={sectionObj.title} segments={sectionObj.segments} />
          </>
        );
      })}
      <Flex justify="space-between">
        <Box />
        <Box>{AddSectionPopup(addSection)}</Box>
      </Flex>
    </>
  );
};

export default SectionPage;
