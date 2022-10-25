import React, { useEffect, useState } from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import { useUserContext } from '../common/UserContext/UserContext';
import { OCHBackend } from '../common/utils';
import YourLogsDescriptions from '../components/VolunteerLogs/YourLogsDescription';
import VolunteerLogsTable from '../components/VolunteerLogs/VolunteerLogsTable';
import ExportLogsModal from '../components/AdminPageTable/ExportLogsModal';

// TO DO:
//    - export selected logs
//    - connect edit log button

const VolunteerLogs = () => {
  const [data, setData] = useState({ results: [], total: 0 });
  const [pageCount, setPageCount] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [checked, setChecked] = useState(new Map());
  const [allChecked, setAllChecked] = useState(false);
  const [fetchSettings, setFetchSettings] = useState({ pageIndex: 0, pageSize: 10 });

  const user = useUserContext();
  const submitterQuery = `${user.userData.firstName} ${user.userData.lastName}`;

  const getSubmissions = async () => {
    try {
      setDataLoaded(false);
      const { sortBy } = fetchSettings;
      const query = {
        submitter: submitterQuery,
        pageIndex: fetchSettings.pageIndex,
        pageSize: fetchSettings.pageSize,
        sort: sortBy && sortBy.length === 1 ? sortBy[0].id : null,
        sortAscending: sortBy && sortBy.length === 1 ? !sortBy[0].desc : null,
      };
      const res = await OCHBackend.get('/submissions', { params: query, withCredentials: true });
      setData(res.data);
      setPageCount(Math.ceil(res.data.total / fetchSettings.pageSize));
      setDataLoaded(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getSubmissions();
  }, [fetchSettings]);

  useEffect(() => {
    const m = new Map();
    for (let i = 0; i < data.results.length; i += 1) {
      m.set(data.results[i]._id, false);
    }
    setChecked(m);
  }, [data]);

  const getCheckedIds = () => {
    const res = [];
    checked.forEach((v, k) => {
      if (v) {
        res.push(k);
      }
    });
    return res;
  };

  return (
    <Container maxW="container.xl">
      <Heading mt="40px" mb="20px">
        Your Monitor Logs
      </Heading>
      <YourLogsDescriptions />

      <Box my="20px">
        <ExportLogsModal logs={getCheckedIds()} />
      </Box>

      <VolunteerLogsTable
        tableData={data}
        pageCount={pageCount}
        checked={checked}
        setChecked={setChecked}
        allChecked={allChecked}
        setAllChecked={setAllChecked}
        isLoading={!dataLoaded}
        setFetchSettings={setFetchSettings}
      />

      <YourLogsDescriptions copyright />
    </Container>
  );
};

export default VolunteerLogs;
