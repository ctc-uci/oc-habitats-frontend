import { React } from 'react';
import { Text, Box } from '@chakra-ui/react';
import MonitorLogSubmissionStats from '../components/AdminDashboard/MonitorLogSubmissionStats';
import SightedListedSpecies from '../components/AdminDashboard/SightedListedSpecies';
import EmergentIssues from '../components/AdminDashboard/EmergentIssues';
import LogNotification from '../components/AdminDashboard/LogNotification';

// Data to be received from Database
const name = 'Peter';

const numNotifications = 2;

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
const numLogsCompleted = 5;
const numLogsNotCompleted = 5;
const numSegsUnassigned = 3;

const emergentIssuesData = [
  {
    id: 1,
    title: 'Injured California Least Terns',
    numIssues: 0,
    issuesData: [],
  },
  {
    id: 2,
    title: 'Injured Western Snowy Plovers',
    numIssues: 0,
    issuesData: [],
  },
  {
    id: 3,
    title: 'Injured Terrestrial Wildlife',
    numIssues: 2,
    data: [
      {
        id: 1,
        segment: 'OCXX',
        date: 'MM-DD-YYYY',
        monitorLogLink: '/logs',
      },
      {
        id: 1,
        segment: 'OCXX',
        date: 'MM-DD-YYYY',
        monitorLogLink: '/logs',
      },
    ],
  },
  {
    id: 4,
    title: 'Speeding Vehicles',
    numIssues: 2,
    data: [
      {
        id: 1,
        segment: 'OCXX',
        date: 'MM-DD-YYYY',
        monitorLogLink: '/logs',
      },
      {
        id: 1,
        segment: 'OCXX',
        date: 'MM-DD-YYYY',
        monitorLogLink: '/logs',
      },
    ],
  },
];

const speciesData = [
  {
    id: 1,
    speciesName: 'California Least Terns',
    data: [
      {
        segment: 'OC01',
        adults: 6,
        fledges: 3,
        chicks: 1,
      },
      {
        segment: 'OC09a',
        adults: 4,
        fledges: 2,
        chicks: 0,
      },
      {
        segment: 'OC09b',
        adults: 2,
        fledges: 1,
        chicks: 0,
      },
    ],
  },
  {
    id: 2,
    speciesName: 'Western Snowy Plovers',
    data: [
      {
        segment: 'OC01',
        adults: 6,
        fledges: 3,
        chicks: 1,
      },
      {
        segment: 'OC09a',
        adults: 4,
        fledges: 2,
        chicks: 0,
      },
      {
        segment: 'OC09b',
        adults: 2,
        fledges: 1,
        chicks: 0,
      },
    ],
  },
  {
    id: 4,
    speciesName: 'California Least Terns',
    data: [
      {
        segment: 'OC01',
        adults: 6,
        fledges: 3,
        chicks: 1,
      },
      {
        segment: 'OC09a',
        adults: 4,
        fledges: 2,
        chicks: 0,
      },
      {
        segment: 'OC09b',
        adults: 2,
        fledges: 1,
        chicks: 0,
      },
    ],
  },
  {
    id: 3,
    speciesName: 'New Listed',
    data: [],
  },
];

const statsDataCompleted = [
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'NamesLongerThan25Characters',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
];

const statsDataNotCompleted = [
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'NamesLongerThan25Characters',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
];

const statsDataUnassigned = [
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'NamesLongerThan25Characters',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
  {
    segId: 'XX',
    peopleAssigned: [
      {
        id: 1,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
      {
        id: 2,
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'finitial.lastname@ochabitats.org',
        accountInfoLink: '/account',
      },
    ],
  },
];

const AdminDashboardPage = () => {
  return (
    <Box mx={{ lg: '100px', sm: '40px' }} my="40px" mb={{ lg: 0, xs: '170px' }}>
      <Text fontSize={{ md: '4xl', sm: '2xl' }} fontWeight="600">
        Welcome back, {name}!
      </Text>

      <Text fontSize="24px" fontWeight="600" mt="50px">
        Notifications
      </Text>

      {numNotifications ? <LogNotification numNotifications={numNotifications} /> : <></>}

      <MonitorLogSubmissionStats
        month={month}
        year={year}
        numLogsCompleted={numLogsCompleted}
        numLogsNotCompleted={numLogsNotCompleted}
        numSegsUnassigned={numSegsUnassigned}
        statsDataCompleted={statsDataCompleted}
        statsDataNotCompleted={statsDataNotCompleted}
        statsDataUnassigned={statsDataUnassigned}
      />
      <EmergentIssues month={month} year={year} emergentIssuesData={emergentIssuesData} />
      <SightedListedSpecies month={month} year={year} speciesData={speciesData} />
    </Box>
  );
};

export default AdminDashboardPage;
