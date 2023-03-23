import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import {
  Badge,
  Container,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useMediaQuery,
  Box,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { OCHBackend } from '../common/utils';
import AdminPageFilters from '../components/AdminPageTable/AdminPageFilters';
import AdminPageTable from '../components/AdminPageTable/AdminPageTable';
import ExportLogsModal from '../components/AdminPageTable/ExportLogsModal';
import GenerateReportModal from '../components/AdminPageTable/GenerateReportModal';
// import SetReminderModal from '../components/AdminPageTable/SetReminderModal';

const AdminPage = () => {
  const [segmentFilter, setSegmentFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [approvalFilter, setApprovalFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [data, setData] = useState({ results: [], total: 0 });
  const [allLogs, setAllLogs] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [segments, setSegments] = useState([]);

  const [checked, setChecked] = useState(new Map());
  const [allChecked, setAllChecked] = useState(false);
  const [fetchSettings, setFetchSettings] = useState({ pageIndex: 0, pageSize: 10 });

  const [isMobile] = useMediaQuery('(max-width: 768px)');

  // get data from backend
  const getSubmissions = async () => {
    try {
      setDataLoaded(false);
      const { sortBy } = fetchSettings;
      const query = {
        segment: segmentFilter,
        date: dateFilter,
        status: approvalFilter,
        submitter: searchFilter,
        pageIndex: fetchSettings.pageIndex,
        pageSize: fetchSettings.pageSize,
        sort: sortBy?.length === 1 ? sortBy[0].id : null,
        sortAscending: sortBy?.length === 1 ? !sortBy[0].desc : null,
      };
      const res = await OCHBackend.get('submissions', { params: query, withCredentials: true });
      setData(res.data);
      setPageCount(Math.ceil(res.data.total / fetchSettings.pageSize));
      setDataLoaded(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const getAllLogs = async () => {
    try {
      const { sortBy } = fetchSettings;
      const query = {
        segment: segmentFilter,
        date: dateFilter,
        status: approvalFilter,
        submitter: searchFilter,
        sort: sortBy?.length === 1 ? sortBy[0].id : null,
        sortAscending: sortBy?.length === 1 ? !sortBy[0].desc : null,
      };
      const res = await OCHBackend.get('submissions', { params: query, withCredentials: true });
      setAllLogs(res.data.results);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    return [];
  };

  // get segments from backend
  const getSegments = async () => {
    try {
      const res = await OCHBackend.get(`segments`, { withCredentials: true });
      setSegments(
        res.data.map(s => ({
          label: s.segmentId,
          value: s._id,
        })),
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getSubmissions();
    getAllLogs();
  }, [fetchSettings, segmentFilter, dateFilter, approvalFilter, searchFilter]);

  useEffect(() => {
    const m = new Map();
    for (let i = 0; i < data.results.length; i += 1) {
      m.set(data.results[i]._id, false);
    }
    setChecked(m);
  }, [data.results, segmentFilter, dateFilter, approvalFilter, searchFilter]);

  useEffect(() => {
    getSegments();
  }, []);

  const checkCount = () => [...checked].filter(c => c[1])?.length;
  const getCheckedIds = () => [...checked].filter(c => c[1] === true).map(c => c[0]);

  return (
    <Container maxW="container.xl" h="fit-content">
      <div>
        <Heading mt={{ md: '40px', base: '24px' }} mb={{ md: '50px', base: '24px' }}>
          Monitor Log Submissions
        </Heading>
        <Flex gap={{ md: '24px', base: '12px' }} direction={{ md: 'row', base: 'column' }}>
          <GenerateReportModal />
          <ExportLogsModal logs={getCheckedIds()} all={false} />
          <ExportLogsModal logs={allLogs.map(l => l._id)} all />
          {/* <SetReminderModal /> */}
        </Flex>

        {!isMobile && (
          <Box my={4}>
            <Text as="b">Notes</Text>
            <UnorderedList>
              <ListItem>
                Click on a column header (e.g.{' '}
                <Badge px={0} variant="solid" bg="transparent" textColor="black">
                  Log Date
                </Badge>
                ) to sort by descending <ArrowDownIcon /> or ascending <ArrowUpIcon />. Sorting is
                alphanumeric for{' '}
                <Badge px={0} variant="solid" bg="transparent" textColor="black">
                  segment
                </Badge>
                ,{' '}
                <Badge px={0} variant="solid" bg="transparent" textColor="black">
                  segment name
                </Badge>
                , and{' '}
                <Badge px={0} variant="solid" bg="transparent" textColor="black">
                  approval status
                </Badge>
                .
              </ListItem>
              <ListItem>
                Only approved logs can be exported. Generate report will fail if there are no{' '}
                <Badge variant="solid" colorScheme="green">
                  approved
                </Badge>{' '}
                logs for the month.
              </ListItem>
              <ListItem>
                Additionally, when exporting selected logs, only those that have been approved will
                be exported and reflected in the Excel file.
              </ListItem>
            </UnorderedList>
          </Box>
        )}
        <AdminPageFilters
          segments={segments}
          segmentFilter={segmentFilter}
          setSegmentFilter={setSegmentFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          approvalFilter={approvalFilter}
          setApprovalFilter={setApprovalFilter}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          checked={checkCount()}
        />
        <AdminPageTable
          tableData={data}
          isLoading={!dataLoaded}
          pageCount={pageCount}
          checked={checked}
          setChecked={setChecked}
          allChecked={allChecked}
          setAllChecked={setAllChecked}
          setFetchSettings={setFetchSettings}
        />
      </div>
    </Container>
  );
};

export default AdminPage;
