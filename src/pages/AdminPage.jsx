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
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [checked, setChecked] = useState(new Map());
  const [allChecked, setAllChecked] = useState(false);

  // get data from backend
  const getSubmissions = async () => {
    try {
      const res = await OCHBackend.get(`submissions`);
      setData(res.data);
      setDataLoaded(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  useEffect(() => {
    const m = new Map();
    for (let i = 0; i < data.length; i += 1) {
      // eslint-disable-next-line dot-notation
      m.set(data[i]['_id'], false);
    }
    setChecked(m);
  }, [dataLoaded]);

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
          segments={['O1', 'O2']}
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
          checked={checked}
          setChecked={setChecked}
          allChecked={allChecked}
          setAllChecked={setAllChecked}
        />
      </div>
    </Container>
  );
};

export default AdminPage;
