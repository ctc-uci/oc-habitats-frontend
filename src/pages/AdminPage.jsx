import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Badge, Container, Flex, Heading, Text } from '@chakra-ui/react';
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
  const [pageCount, setPageCount] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [segments, setSegments] = useState([]);

  const [checked, setChecked] = useState(new Map());
  const [allChecked, setAllChecked] = useState(false);
  const [fetchSettings, setFetchSettings] = useState({ pageIndex: 0, pageSize: 10 });

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
        sort: sortBy.length === 1 ? sortBy[0].id : null,
        sortAscending: sortBy.length === 1 ? !sortBy[0].desc : null,
      };
      const res = await OCHBackend.get(`submissions`, { params: query });
      setData(res.data);
      setPageCount(Math.ceil(res.data.total / fetchSettings.pageSize));
      setDataLoaded(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  // get segments from backend
  const getSegments = async () => {
    try {
      const res = await OCHBackend.get(`segments`);
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

  const checkCount = () => {
    let count = 0;
    checked.forEach(val => {
      if (val) {
        count += 1;
      }
    });
    return count;
  };

  return (
    <Container maxW="container.xl">
      <div>
        <Heading mt="40px" mb="50px">
          Monitor Log Submissions
        </Heading>
        <Flex gap="24px">
          <GenerateReportModal />
          <ExportLogsModal count={checkCount()} />
          {/* <SetReminderModal /> */}
        </Flex>

        <Text my="20px">
          Click on a column header (e.g.{' '}
          <Badge px={0} variant="solid" bg="transparent" textColor="black">
            Date
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
        </Text>
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
