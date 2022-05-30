import React, { useEffect, useState } from 'react';
import { Badge, Box, Button, Container, Heading, Icon, Text } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { CgSoftwareUpload } from 'react-icons/cg';
import { useUserContext } from '../common/UserContext/UserContext';
import { OCHBackend } from '../common/utils';
import YourLogsTable from '../components/VolunteerLogs/YourLogsTable';

// TO-DO:
//    - fix checkboxes
//    - export selected logs
//    - connect edit log button
//    - disable sort on monitor partners
//    - check + fix multiple monitor partners
//    - clean up
//    - mobile

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
        sort: sortBy.length === 1 ? sortBy[0].id : null,
        sortAscending: sortBy.length === 1 ? !sortBy[0].desc : null,
      };
      const res = await OCHBackend.get('/submissions', { params: query });
      setData(res.data);
      setPageCount(Math.ceil(res.data.total / fetchSettings.pageSize));
      setDataLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSubmissions();
  }, [fetchSettings]);

  return (
    <Container maxW="container.xl">
      <Heading mt="40px" mb="20px">
        Your Monitor Logs
      </Heading>
      <Text>
        Click on a row to view that monitor log. You may edit and resubmit logs with these approval
        statuses:{' '}
        <Badge variant="solid" colorScheme="red">
          Edits Requested
        </Badge>
        ,{' '}
        <Badge variant="solid" colorScheme="blue">
          Under Review
        </Badge>
        ,{' '}
        <Badge variant="solid" colorScheme="gray">
          Draft
        </Badge>
      </Text>
      <Text>
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

      <Button my="20px" bgColor="ochBluePress" color="white" _hover={{ opacity: 0.8 }}>
        Export Selected Logs <Icon ml="6px" w={5} h={5} as={CgSoftwareUpload} />
      </Button>

      <YourLogsTable
        tableData={data}
        pageCount={pageCount}
        checked={checked}
        setChecked={setChecked}
        allChecked={allChecked}
        setAllChecked={setAllChecked}
        isLoading={!dataLoaded}
        setFetchSettings={setFetchSettings}
      />

      <Box h="20px" />
      <Text as="i">
        Any person gathering and/or submitting data in this document acknowledges that the data is
        solely owned by OC Habitats&trade; and is copyright protected. Data is not to be shared with
        other organizations absent written permission from OC Habitats&trade;. &copy;2022 OC
        Habitats&trade;. All Rights Reserved. If you have questions, please contact OC Habitats at
        949.697.8651 or och@ochabitats.org.
      </Text>
    </Container>
  );
};

export default VolunteerLogs;
