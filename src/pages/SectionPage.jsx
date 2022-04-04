import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { React, useState } from 'react';
import Section from '../components/Section';
import NewSectionSegmentPopup from '../components/NewSectionSegmentPopup';

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

function CreateNewSectionSegment(onAddSegment, addSection) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <Button size="md" bg="#2BC0E3" variant="solid" rightIcon={<AddIcon />} onClick={onOpen}>
        Create New Section or Segment
      </Button> */}
      <NewSectionSegmentPopup />
    </>
  );
}

function AddSectionPopup(addSection) {
  let newSecName = '';
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* <Button color="#2D3748" colorScheme="white" variant="ghost" fontSize="16px" onClick={onOpen}>
        + Add a section
      </Button> */}

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

  const updateSectionTitle = (sectionId, newSecTitle) => {
    let updatedSection = -1;
    for (let i = 0; i < sections.length; i += 1) {
      if (sections[i].id === sectionId) {
        updatedSection = i;
        break;
      }
    }
    const updatedSecTitle = [...sections];
    updatedSecTitle[updatedSection].title = newSecTitle;
    setSections(updatedSecTitle);
  };

  const deleteSection = sectionId => {
    const updatedSegSections = [...sections].filter(section => section.id !== sectionId);
    setSections(updatedSegSections);
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
    let updatedSection = -1;
    for (let i = 0; i < sections.length; i += 1) {
      if (sections[i].id === sectionId) {
        updatedSection = i;
        break;
      }
    }
    const { segments } = sections[updatedSection];
    let updatedSegment = -1;
    for (let i = 0; i < segments.length; i += 1) {
      if (segments[i].segment === segmentId) {
        updatedSegment = i;
        break;
      }
    }
    const updatedSegSections = [...sections];
    updatedSegSections[updatedSection].segments[updatedSegment] = newSegment;
    setSections(updatedSegSections);
  };

  const deleteSegment = (sectionId, segmentId) => {
    // step 1 find section with segment
    // step 2 find the segment within the section
    // step 3 delete and update sectionsData
    let searchDeleteSection = -1;
    for (let i = 0; i < sections.length; i += 1) {
      if (sections[i].id === sectionId) {
        searchDeleteSection = i;
        break;
      }
    }
    const { segments } = sections[searchDeleteSection];
    const updatedSegSections = [...sections];
    updatedSegSections[searchDeleteSection].segments = segments.filter(
      segment => segment.segment !== segmentId,
    );
    setSections(updatedSegSections);
  };

  return (
    <>
      <Box marginLeft="110px">
        <Heading align="left" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
          Sections & Segments
        </Heading>
        {CreateNewSectionSegment(addSegment, addSection)}
        <Tabs variant="solid-rounded" size="lg" align="start" colorScheme="orange">
          <TabList paddingTop="32px" alignItems="center">
            <HStack spacing="24px">
              {sections.map(sectionObj => {
                return (
                  <Tab
                    key={sectionObj.id}
                    style={{ height: '40px' }}
                    _selected={{ color: 'ochBlack', bg: 'ochOrange' }}
                  >
                    Section {sectionObj.id}
                  </Tab>
                );
              })}
            </HStack>
          </TabList>
          <TabPanels>
            {sections.map(sectionObj => {
              return (
                <TabPanel key={sectionObj.id} padding="0px">
                  <Box h="25px" />
                  <Section
                    key={sectionObj.id}
                    title={sectionObj.title}
                    segments={sectionObj.segments}
                    onAddSegment={(newSeg, newSegName, newSegDist) =>
                      addSegment(sectionObj.id, newSeg, newSegName, newSegDist)
                    }
                    onUpdateSegment={(segmentId, updatedSeg, updatedSegName, updatedSegDist) =>
                      updateSegment(
                        sectionObj.id,
                        segmentId,
                        updatedSeg,
                        updatedSegName,
                        updatedSegDist,
                      )
                    }
                    onDeleteSegment={segmentId => deleteSegment(sectionObj.id, segmentId)}
                    onUpdateSectionTitle={newSecTitle =>
                      updateSectionTitle(sectionObj.id, newSecTitle)
                    }
                    onDeleteSection={() => deleteSection(sectionObj.id)}
                  />
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
        <Flex justify="space-between">
          <Box />
          <Box>{AddSectionPopup(addSection)}</Box>
        </Flex>
      </Box>
    </>
  );
};

export default SectionPage;
