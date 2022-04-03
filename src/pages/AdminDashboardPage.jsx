import { React } from 'react';
import { Text } from '@chakra-ui/react';
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
const numLogsCompleted = 13;
const numLogsNotSubmitted = 20;

const emergentIssuesData = [
  {
    id: 1,
    title: 'Injured California Least Terns',
    numIssues: 0,
  },
  {
    id: 2,
    title: 'Injured Western Snowy Plovers',
    numIssues: 0,
  },
  {
    id: 3,
    title: 'Injured Terrestrial Wildlife',
    numIssues: 2,
  },
  {
    id: 4,
    title: 'Speeding Vehicles',
    numIssues: 2,
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
];

const statsDataCompleted = [
  {
    id: 1,
    firstName: 'firstName',
    lastName: 'lastName',
    accountInfoLink: '/account',
  },
  {
    id: 2,
    firstName: 'NamesLongerThan25Characters',
    lastName: 'lastName',
    accountInfoLink: '/account',
  },
  {
    id: 3,
    firstName: 'firstName',
    lastName: 'lastName',
    accountInfoLink: '/account',
  },
  {
    id: 4,
    firstName: 'firstName',
    lastName: 'lastName',
    accountInfoLink: '/account',
  },
  {
    id: 5,
    firstName: 'firstName',
    lastName: 'lastName',
    accountInfoLink: '/account',
  },
  {
    id: 6,
    firstName: 'firstName',
    lastName: 'lastName',
    accountInfoLink: '/account',
  },
];

const statsDataNotSubmitted = [
  {
    id: 1,
    firstName: 'firstName',
    lastName: 'lastName',
    accountInfoLink: '/account',
  },
  {
    id: 2,
    firstName: 'NamesLongerThan25Characters',
    lastName: 'lastName',
    accountInfoLink: '/account',
  },
  {
    id: 3,
    firstName: 'firstName',
    lastName: 'lastName',
    accountInfoLink: '/account',
  },
  {
    id: 4,
    firstName: 'firstName',
    lastName: 'lastName',
    accountInfoLink: '/account',
  },
  {
    id: 5,
    firstName: 'firstName',
    lastName: 'lastName',
    accountInfoLink: '/account',
  },
  {
    id: 6,
    firstName: 'firstName',
    lastName: 'noSubmission',
    accountInfoLink: '/account',
  },
];

const AdminDashboardPage = () => {
  return (
    <>
      <Text fontSize="36px" fontWeight="600" ml="110px" mt="40px">
        Welcome back, {name}!
      </Text>

      <Text fontSize="24px" fontWeight="600" ml="110px" mt="50px">
        Notifications
      </Text>

      {numNotifications ? <LogNotification numNotifications={numNotifications} /> : <></>}

      <MonitorLogSubmissionStats
        month={month}
        year={year}
        numLogsCompleted={numLogsCompleted}
        numLogsNotSubmitted={numLogsNotSubmitted}
        statsDataCompleted={statsDataCompleted}
        statsDataNotSubmitted={statsDataNotSubmitted}
      />
      <EmergentIssues month={month} year={year} emergentIssuesData={emergentIssuesData} />
      <SightedListedSpecies month={month} year={year} speciesData={speciesData} />
    </>
  );
};

export default AdminDashboardPage;
