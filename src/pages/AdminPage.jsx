import React, { useState, useEffect } from 'react';
import { Container, Heading, Flex, Text } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { OCHBackend } from '../common/utils';
import GenerateReportModal from '../components/AdminPageTable/GenerateReportModal';
import ExportLogsModal from '../components/AdminPageTable/ExportLogsModal';
import SetReminderModal from '../components/AdminPageTable/SetReminderModal';
import AdminPageTable from '../components/AdminPageTable/AdminPageTable';
import AdminPageFilters from '../components/AdminPageTable/AdminPageFilters';

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
  const [pageSettings, setPageSettings] = useState({ pageIndex: 0, pageSize: 10 });

  // get data from backend
  const getSubmissions = async () => {
    try {
      setDataLoaded(false);
      const query = {
        segment: segmentFilter,
        date: dateFilter,
        status: approvalFilter,
        submitter: searchFilter,
        pageIndex: pageSettings.pageIndex,
        pageSize: pageSettings.pageSize,
      };
      const res = await OCHBackend.get(`submissions`, { params: query });
      setData(res.data);
      setPageCount(Math.ceil(res.data.total / pageSettings.pageSize));
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
  }, [pageSettings, segmentFilter, dateFilter, approvalFilter, searchFilter]);

  useEffect(() => {
    const m = new Map();
    for (let i = 0; i < data.length; i += 1) {
      m.set(data[i]._id, false);
    }
    setChecked(m);
  }, [segmentFilter, dateFilter, approvalFilter, searchFilter]);

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
          setPageSettings={setPageSettings}
        />
      </div>
    </Container>
  );
};

export default AdminPage;
