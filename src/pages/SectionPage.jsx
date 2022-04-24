/* eslint-disable no-underscore-dangle */
import {
  Box,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Container,
  Text,
  VStack,
} from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import NewSectionSegmentPopup from '../components/NewSectionSegmentPopup';
import SectionTable from '../components/SectionTable/SectionTable';
import EditDeleteSectionPopup from '../components/SectionTable/EditDeleteSectionPopup';
import { OCHBackend } from '../common/utils';

const SectionPage = () => {
  const [sections, setSections] = useState([]); // sectionsData
  const [isLoading, setIsLoading] = useState(true);

  // const [change, setChange] = useState(false); // new
  const sectionOptions = sections.map(section => ({
    value: section._id,
    label: section._id,
  }));

  const getSections = async () => {
    try {
      setIsLoading(true);
      const res = await OCHBackend.get(`${process.env.REACT_APP_API_URL}/sections`);
      setSections(res.data);

      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getSections();
  }, []);

  return (
    <>
      <Box marginLeft="110px" marginRight="110px">
        <Heading align="left" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
          Sections & Segments
        </Heading>

        <Tabs variant="solid-rounded" size="lg" align="start" colorScheme="orange">
          <TabPanels>
            {sections.map(sectionObj => {
              return (
                <TabPanel key={sectionObj._id} padding="0px">
                  <NewSectionSegmentPopup
                    key={sectionObj._id}
                    sectionOptions={sectionOptions}
                    getSections={getSections}
                  />
                </TabPanel>
              );
            })}
          </TabPanels>
          <TabList
            paddingTop="32px"
            // alignItems="center"
            overflowY="hidden"
            sx={{
              scrollbarWidth: 'none',
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
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
                          <EditDeleteSectionPopup section={sectionObj} getSections={getSections} />
                        </div>
                      </VStack>
                    </HStack>
                    <br />

                    <SectionTable
                      sectionId={sectionObj.id}
                      loading={isLoading}
                      segments={sectionObj.segments}
                    />
                  </Container>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default SectionPage;
