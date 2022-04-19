/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
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
  Container,
  Text,
  VStack,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { BsThreeDotsVertical } from 'react-icons/bs';
// import Section from '../components/Section';
import CreateNew from '../components/NewSectionSegmentPopup';
import SectionTable from '../components/SectionTable/SectionTable';

const tempData = {
  id: 1,
  title: 'sdadsdfssdf',
  segments: [
    {
      segment: 'OCH01',
      name: 'Seal Beach',
      description: '1st St. - North End of Anaheim Bay',
      mapLink: 'http://example.com',
      parking: 'here is how you park',
    },
    {
      segment: 'OCH01',
      name: 'Seal Beach',
      description: '1st St. - North End of Anaheim Bay',
      mapLink: 'http://example.com',
      parking: 'here is how you park2',
    },
    {
      segment: 'OCH01',
      name: 'Seal Beach',
      description: '1st St. - North End of Anaheim Bay',
      mapLink: 'http://example.com',
      parking: 'here is how you park2',
    },
    {
      segment: 'OCH01',
      name: 'Seal Beach',
      description: '1st St. - North End of Anaheim Bay',
      mapLink: 'http://example.com',
      parking: 'here is how you park2',
    },
    {
      segment: 'OCH01',
      name: 'Seal Beach',
      description: '1st St. - North End of Anaheim Bay',
      mapLink: 'http://example.com',
      parking: 'here is how you park2',
    },
  ],
};

const sectionsData = [
  {
    id: 1,
    title: 'Seal Beach to Huntington Beach (South)',
    segments: [
      {
        segment: 'OC01',
        segmentName: 'Seal Beach',
        segmentLocation: '1st St. - North End Anaheim Bay',
        link: 'https://chakra-ui.com',
        parking: 'Park somewhere',
        distance: 1.6,
      },
      {
        segment: 'OC02',
        segmentName: 'Surfside',
        segmentLocation: 'South of Anaheim Bay to 19th Street',
        link: 'https://chakra-ui.com',
        parking: 'Park somewhere',
        distance: 1.8,
      },
      {
        segment: 'OC03',
        segmentName: 'Sunset Beach',
        segmentLocation: '19th Street to Warner Avenue',
        link: 'https://chakra-ui.com',
        parking: 'Park somewhere',
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
  const [sections, setSections] = useState([]); // sectionsData
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [change, setChange] = useState(true);

  const getSections = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/sections`);
      setSections(res.data);

      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const addSection = (newSecId, newSecName, newSecMapLink) => {
    const newSection = {
      id: newSecId,
      title: newSecName,
      segments: [],
    };
    setSections([...sections, newSection]);
  };

  // const updateSectionTitle = (sectionId, newSecTitle) => {
  //   let updatedSection = -1;
  //   for (let i = 0; i < sections.length; i += 1) {
  //     if (sections[i].id === sectionId) {
  //       updatedSection = i;
  //       break;
  //     }
  //   }
  //   const updatedSecTitle = [...sections];
  //   updatedSecTitle[updatedSection].title = newSecTitle;
  //   setSections(updatedSecTitle);
  // };

  // const deleteSection = sectionId => {
  //   const updatedSegSections = [...sections].filter(section => section.id !== sectionId);
  //   setSections(updatedSegSections);
  // };

  const addSegment = (
    sectionId,
    newSegId,
    newSegName,
    newSegDescription,
    newSegMap,
    newSegParking,
  ) => {
    const newSegment = {
      segment: newSegId,
      name: newSegName,
      description: newSegDescription,
      map: newSegMap,
      parking: newSegParking,
    };
    const newSegSections = [...sections];
    const { segments } = newSegSections.filter(section => section.id === sectionId)[0];
    newSegSections.filter(section => section.id === sectionId)[0].segments = [
      ...segments,
      newSegment,
    ];
    setSections(newSegSections);
  };

  // const updateSegment = (sectionId, segmentId, updatedSeg, updatedSegName, updatedSegDist) => {
  //   const newSegment = {
  //     segment: updatedSeg,
  //     segmentName: updatedSegName,
  //     distance: updatedSegDist,
  //   };
  //   let updatedSection = -1;
  //   for (let i = 0; i < sections.length; i += 1) {
  //     if (sections[i].id === sectionId) {
  //       updatedSection = i;
  //       break;
  //     }
  //   }
  //   const { segments } = sections[updatedSection];
  //   let updatedSegment = -1;
  //   for (let i = 0; i < segments.length; i += 1) {
  //     if (segments[i].segment === segmentId) {
  //       updatedSegment = i;
  //       break;
  //     }
  //   }
  //   const updatedSegSections = [...sections];
  //   updatedSegSections[updatedSection].segments[updatedSegment] = newSegment;
  //   setSections(updatedSegSections);
  // };

  // const deleteSegment = (sectionId, segmentId) => {
  //   // step 1 find section with segment
  //   // step 2 find the segment within the section
  //   // step 3 delete and update sectionsData
  //   let searchDeleteSection = -1;
  //   for (let i = 0; i < sections.length; i += 1) {
  //     if (sections[i].id === sectionId) {
  //       searchDeleteSection = i;
  //       break;
  //     }
  //   }
  //   const { segments } = sections[searchDeleteSection];
  //   const updatedSegSections = [...sections];
  //   updatedSegSections[searchDeleteSection].segments = segments.filter(
  //     segment => segment.segment !== segmentId,
  //   );
  //   setSections(updatedSegSections);
  // };

  useEffect(() => {
    getSections();
  }, [change]);

  return (
    <>
      <Box marginLeft="110px">
        <Heading align="left" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
          Sections & Segments
        </Heading>

        <Tabs variant="solid-rounded" size="lg" align="start" colorScheme="orange">
          <TabPanels>
            {sections.map(sectionObj => {
              return (
                <TabPanel key={sectionObj._id} padding="0px">
                  <CreateNew
                    key={sectionObj._id}
                    onAddSection={(newSecId, newSecName, newSecMapLink) =>
                      addSection(newSecId, newSecName, newSecMapLink)
                    }
                    onAddSegment={(
                      newSegId,
                      newSegName,
                      newSegDescription,
                      newSegMap,
                      newSegParking,
                    ) =>
                      addSegment(
                        sectionObj._id,
                        newSegId,
                        newSegName,
                        newSegDescription,
                        newSegMap,
                        newSegParking,
                      )
                    }
                  />
                </TabPanel>
              );
            })}
          </TabPanels>
          <TabList paddingTop="32px" alignItems="center">
            <HStack spacing="24px">
              {sections.map(sectionObj => {
                return (
                  <Tab
                    key={sectionObj._id}
                    style={{ height: '40px' }}
                    _selected={{ color: 'ochBlack', bg: 'ochOrange' }}
                  >
                    Section {sectionObj._id}
                  </Tab>
                );
              })}
            </HStack>
          </TabList>
          <TabPanels>
            {sections.map(sectionObj => {
              return (
                <TabPanel key={sectionObj._id} padding="0px">
                  <Container maxW="container.x1">
                    <Heading fontWeight="600" fontSize="20px" mb="4px" mt="40px" align="left">
                      <>
                        Section {sectionObj._id} - <Text as="u">{sectionObj.name}</Text>
                      </>
                    </Heading>
                    <HStack w="100%" justifyContent="space-between" spacing="10">
                      <VStack>
                        <Text fontWeight="400" fontSize="18px" align="left" display="inline">
                          <>
                            Select the <BsThreeDotsVertical style={{ display: 'inline' }} /> button
                            on a row in the table to view, edit, or delete a Segment.
                          </>
                        </Text>
                      </VStack>
                      <VStack>
                        <div>
                          <Button
                            size="sm"
                            bg="#2BC0E3"
                            variant="solid"
                            aria-label="Edit Section"
                            rightIcon={<EditIcon />}
                            onClick={onOpen}
                          >
                            Edit Section
                          </Button>
                        </div>
                      </VStack>
                    </HStack>
                    <br />

                    <SectionTable
                      // variant="volunteer"
                      // userData={volunteerData}
                      // segments={segments}
                      // loading={isLoading}
                      sectionId={sectionObj.id}
                      loading={false}
                      segments={sectionObj.segments}
                    />
                  </Container>
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
