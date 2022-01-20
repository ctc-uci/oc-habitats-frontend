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
  Input,
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
  let newSecName = 'defaultName';
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
            {/* <div>*Add section information here*</div> */}
            <Input
              placeholder="Enter section name here"
              onChange={event => {
                newSecName = event.target.value;
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                addSection(newSecName);
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

  const addSection = newSecName => {
    const newSection = {
      id: sections.length + 1,
      title: newSecName,
      segments: [],
    };
    setSections([...sections, newSection]);
  };

  const addSegment = (sectionId, newSegId, newSegName, newSegDist) => {
    const newSegment = {
      segment: newSegId,
      segmentName: newSegName,
      distance: newSegDist,
    };
    const newSegSections = [...sections];
    const { segments } = newSegSections.filter(section => section.id === sectionId)[0];
    newSegSections.filter(section => section.id === sectionId)[0].segments = [
      ...segments,
      newSegment,
    ];
    setSections(newSegSections);
  };

  const updateSegment = (sectionId, segmentId, updatedSeg, updatedSegName, updatedSegDist) => {
    const newSegment = {
      segment: updatedSeg,
      segmentName: updatedSegName,
      distance: updatedSegDist,
    };
    const updatedSegSections = [...sections];
    const { segments } = updatedSegSections.filter(section => section.id === sectionId)[0];
    const leftSegments = [];
    const rightSegments = [];
    let lastLeftInd = 0;
    console.log(segments);
    for (
      lastLeftInd = 0;
      lastLeftInd < segments.length && segments[lastLeftInd].segment !== segmentId;
      lastLeftInd += 1
    ) {
      leftSegments.push(segments[lastLeftInd]);
    }
    for (let rightInd = lastLeftInd + 1; rightInd < segments.length; rightInd += 1) {
      rightSegments.push(segments[rightInd]);
    }
    updatedSegSections.filter(section => section.id === sectionId)[0].segments = [
      leftSegments,
      newSegment,
      rightSegments,
    ];

    setSections(updatedSegSections);
  };

  return (
    <>
      {sections.map(sectionObj => {
        return (
          <>
            <Box h="25px" />
            <Section
              key={sectionObj.id}
              title={sectionObj.title}
              segments={sectionObj.segments}
              onAddSegment={(newSeg, newSegName, newSegDist) =>
                addSegment(sectionObj.id, newSeg, newSegName, newSegDist)
              }
              onUpdateSegment={(segmentId, updatedSeg, updatedSegName, updatedSegDist) =>
                updateSegment(sectionObj.id, segmentId, updatedSeg, updatedSegName, updatedSegDist)
              }
            />
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
