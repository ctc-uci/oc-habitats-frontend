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
  Stack,
} from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import NewSectionSegmentPopup from '../components/NewSectionSegmentPopup';
import SectionTable from '../components/SectionTable/SectionTable';
import EditDeleteSectionPopup from '../components/SectionTable/EditDeleteSectionPopup';
import { OCHBackend } from '../common/utils';
import { useUserContext } from '../common/UserContext/UserContext';

const SectionPage = () => {
  const [sections, setSections] = useState([]); // sectionsData
  const [isLoading, setIsLoading] = useState(true);
  const user = useUserContext();

  // const [change, setChange] = useState(false); // new
  const sectionOptions = sections.map(section => ({
    value: section._id,
    label: section._id,
  }));

  const getSections = async () => {
    try {
      setIsLoading(true);
      const res = await OCHBackend.get(`${process.env.REACT_APP_API_URL}/sections`);
      // sort sections by id
      setSections(res.data.sort((a, b) => a._id.localeCompare(b._id)));

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
      <Box mx={{ md: '110px', base: '10px' }} mb={{ md: 10, base: 20 }}>
        <Heading align="left" fontWeight="600" fontSize={{ md: '36px', base: '24px' }} mt="40px">
          Sections & Segments
        </Heading>

        <Tabs variant="solid-rounded" size="lg" align="start" colorScheme="orange">
          {user.userData.role === 'admin' && (
            <TabPanels mt="32px">
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
          )}
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
                    borderColor="ochBlack"
                    borderWidth="1px"
                    _selected={{ color: 'ochBlack', bg: 'ochOrange' }}
                    whiteSpace="nowrap"
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
                    <Heading
                      fontWeight="600"
                      fontSize={{ md: '20px', base: '18px' }}
                      mb="4px"
                      mt="40px"
                      align="left"
                    >
                      <>
                        Section {sectionObj._id} - <Text as="u">{sectionObj.name}</Text>
                      </>
                    </Heading>
                    {user.userData.role === 'admin' && (
                      <Stack
                        direction={{ md: 'row', base: 'column' }}
                        w="100%"
                        justifyContent="space-between"
                        spacing="10"
                      >
                        <HStack align="flex-start">
                          <Text
                            fontWeight="400"
                            fontSize={{ md: '18px', base: '14px' }}
                            display="inline"
                          >
                            <>
                              Select the <BsThreeDotsVertical style={{ display: 'inline' }} />{' '}
                              button on a row in the table to view, edit, or delete a Segment.
                            </>
                          </Text>
                        </HStack>
                        <HStack justify="flex-end" sx={{ marginTop: '16px !important' }}>
                          <EditDeleteSectionPopup section={sectionObj} getSections={getSections} />
                        </HStack>
                      </Stack>
                    )}
                    {user.userData.role === 'volunteer' && (
                      <Box mt={2}>
                        <Text
                          fontWeight="400"
                          fontSize={{ md: '18px', base: '14px' }}
                          align="left"
                          display="inline"
                        >
                          If you pay for parking (not to exceed $6 without approval), please submit
                          your receipts for reimbursement with your name and segment.
                        </Text>
                      </Box>
                    )}
                    <br />

                    <SectionTable
                      sectionId={sectionObj._id}
                      loading={isLoading}
                      segments={sectionObj.segments}
                      allSections={sections}
                      updateSections={getSections}
                      role={user.userData.role}
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
