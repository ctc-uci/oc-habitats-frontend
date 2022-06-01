/* eslint-disable no-console */
import { React, useState, useEffect } from 'react';
import { Text, Box } from '@chakra-ui/react';
import MonitorLogSubmissionStats from '../components/AdminDashboard/MonitorLogSubmissionStats';
import SightedListedSpecies from '../components/AdminDashboard/SightedListedSpecies';
import EmergentIssues from '../components/AdminDashboard/EmergentIssues';
import LogNotification from '../components/AdminDashboard/LogNotification';
import { OCHBackend } from '../common/utils';
import { useUserContext } from '../common/UserContext/UserContext';

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

const AdminDashboardPage = () => {
  const { userData } = useUserContext();
  const [info, setInfo] = useState({
    listedSpeciesInfo: [],
    completedSubmissions: { submissions: [] },
    uncompletedSubmissions: [],
    emergentIssuesData: {},
    unassignedSegments: [],
    notCompletedCount: 0,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await OCHBackend.get('/dashboard');
        setInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    return () => {};
  }, []);

  const getNotificationNum = () => {
    let notificationNum = 0;
    if (info.uncompletedSubmissions) {
      const underReview = info.uncompletedSubmissions.filter(
        submissionType => submissionType._id === 'UNDER_REVIEW',
      );
      notificationNum = underReview.submissions ? underReview.submissions.length : 0;
    }
    return notificationNum;
  };

  const numNotifications = getNotificationNum();

  return (
    <Box mx={{ lg: '100px', sm: '40px' }} my="40px" mb={{ lg: 0, xs: '170px' }}>
      <Text fontSize={{ md: '4xl', sm: '2xl' }} fontWeight="600">
        Welcome back, {userData.firstName}!
      </Text>

      <Text fontSize="24px" fontWeight="600" mt="50px">
        Notifications
      </Text>

      {numNotifications ? <LogNotification numNotifications={numNotifications} /> : <></>}

      <MonitorLogSubmissionStats
        month={month}
        year={year}
        numLogsCompleted={info.completedSubmissions.submissions.length}
        numLogsNotCompleted={info.notCompletedCount}
        numSegsUnassigned={info.unassignedSegments.length}
        statsDataCompleted={info.completedSubmissions.submissions}
        statsDataNotCompleted={info.uncompletedSubmissions}
        statsDataUnassigned={info.unassignedSegments}
      />
      <EmergentIssues
        month={month}
        year={year}
        emergentIssuesData={{
          listedSpeciesInfo: info.listedSpeciesInfo,
          emergents: info.emergentIssueData,
        }}
      />
      <SightedListedSpecies month={month} year={year} speciesData={info.listedSpeciesInfo} />
    </Box>
  );
};

export default AdminDashboardPage;
