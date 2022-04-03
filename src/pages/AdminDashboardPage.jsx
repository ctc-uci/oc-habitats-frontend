import { React } from 'react';
import { Text, Grid, GridItem } from '@chakra-ui/react';

import MonitorLogSubmissionStats from '../components/AdminDashboard/MonitorLogSubmissionStats';
import EmergentIssuesCard from '../components/AdminDashboard/EmergentIssuesCard';

const name = 'Peter';
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const month = monthNames[new Date().getMonth()];
const year = new Date().getUTCFullYear();
const numLogsCompleted = 13;
const numLogsNotSubmitted = 20;

const AdminDashboardPage = () => {
  return (
    <>
      <Text fontSize="36px" fontWeight="600" ml="110px" mt="40px">
        Welcome back, {name}!
      </Text>
      <Text fontSize="24px" fontWeight="600" ml="110px" mt="50px">
        Notifications
      </Text>

      <MonitorLogSubmissionStats
        month={month}
        year={year}
        numLogsCompleted={numLogsCompleted}
        numLogsNotSubmitted={numLogsNotSubmitted}
      />

      <Text fontSize="24px" fontWeight="600" ml="110px" mt="64px">
        {month} {year} Emergent Issues
      </Text>
      <Grid ml="110px" templateColumns="repeat(4, 0.1fr)" gap="24px">
        <GridItem>
          <EmergentIssuesCard title="Injured California Least Terns" numIssues={0} />
        </GridItem>
        <GridItem>
          <EmergentIssuesCard title="Injured Western Snowy Plovers" numIssues={0} />
        </GridItem>
        <GridItem>
          <EmergentIssuesCard title="Injured Terrestrial Wildlife" numIssues={2} />
        </GridItem>
        <GridItem>
          <EmergentIssuesCard title="Speeding Vehicles" numIssues={2} />
        </GridItem>
      </Grid>

      <Text fontSize="24px" fontWeight="600" ml="110px" mt="64px">
        {month} {year} Sighted Listed Species
      </Text>
    </>
  );
};

export default AdminDashboardPage;
