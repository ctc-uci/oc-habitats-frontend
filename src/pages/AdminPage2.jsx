import React, { useState } from 'react';
import { Container, Heading, Flex, Text } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import GenerateReportModal from '../components/AdminPageTable/GenerateReportModal';
import ExportLogsModal from '../components/AdminPageTable/ExportLogsModal';
import SetReminderModal from '../components/AdminPageTable/SetReminderModal';
import AdminPageTable from '../components/AdminPageTable/AdminPageTable';
// import Pagination from '../components/AdminPageTable/Pagination';
import AdminPageFilters from '../components/AdminPageTable/AdminPageFilters';

const dummySegments = ['OCH01', 'OCH02', 'OCH03', 'OCH04'];

const dummy = [
  {
    generalFieldValues: {
      surveySegment: 'OC01',
      date: '2022-04-06T00:00:00.000Z',
      startTime: '3:00PM',
      endTime: '5:00PM',
      temperature: 80,
      cloudCover: 70,
      precipitation: 'none',
      windSpeed: 50,
      windDirection: 'east',
      tides: 20,
      habitatType: 'dunes',
      habitatWidth: 10,
    },
    _id: '624e42f5f1fa5957fced27d2',
    listedSpeciesEntries: [
      {
        speciesId: 'Mammoth',
        numAdults: 1,
        numFledges: 2,
        numChicks: 0,
        timeObserved: '3:40PM',
        map: 1,
        habitatDescription: 'musty',
        gps: [
          {
            longitude: 123.123,
            latitude: 321.321,
            _id: '624e42f5f1fa5957fced27d4',
          },
        ],
        crossStreet: 'somewhere',
        bandsSexBehavior: [
          {
            topLeftBand: ['X'],
            topRightBand: ['X'],
            bottonLeftBand: ['X'],
            bottomRightBand: ['X'],
            bandingCode: 'Y',
            sex: 'Male',
            nestAndEggs: ['Eggs'],
            behaviors: ['Behaviors'],
            _id: '624e42f5f1fa5957fced27d5',
          },
        ],
        additionalNotes: 'so many fields',
        _id: '624e42f5f1fa5957fced27d3',
      },
    ],
    submitter: 'Krabs',
    submittedAt: '2022-04-07T01:48:37.539Z',
    lastEditedAt: '2022-04-06T00:00:00.000Z',
    isSubmittedByTrainee: false,
    isApproved: true,
    sessionPartners: ['someone'],
    generalAdditionalFieldValues: [],
    additionalSpeciesEntries: [],
    predatorAdditionalFieldValues: [],
    humanActivityAdditionalFieldValues: [],
    __v: 0,
  },
];

const AdminPage = () => {
  // const [checkCount, setCheckCount] = useState(0);
  const checkCount = 0;
  const [segmentFilter, setSegmentFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [approvalFilter, setApprovalFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  return (
    <Container maxW="container.xl">
      <div>
        <Heading mt="40px" mb="50px">
          Monitor Log Submissions
        </Heading>
        <Flex gap="24px">
          <GenerateReportModal />
          <ExportLogsModal count={checkCount} />
          <SetReminderModal />
        </Flex>
        <Text font size="md" fontWeight="700px" mt="24px" mb="16px">
          Click on a column header (e.g. <span className="bold">DATE</span>) to sort by descending{' '}
          <ChevronDownIcon /> or ascending <ChevronUpIcon />. Sorting is alphanumeric for{' '}
          <span className="bold">SEGMENT</span>, <span className="bold">VOLUNTEER(S)</span>, and
          <span className="bold"> APPROVAL STATUS</span>.
        </Text>
        {/* <pre>
          {JSON.stringify(
            {
              segmentFilter,
              dateFilter,
              approvalFilter,
              searchFilter,
            },
            null,
            2,
          )}
        </pre> */}
        <AdminPageFilters
          segments={dummySegments}
          checkCount={checkCount}
          segmentFilter={segmentFilter}
          setSegmentFilter={setSegmentFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          approvalFilter={approvalFilter}
          setApprovalFilter={setApprovalFilter}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <AdminPageTable tableData={dummy} />
        {/* <Pagination /> */}
      </div>
    </Container>
  );
};

export default AdminPage;
