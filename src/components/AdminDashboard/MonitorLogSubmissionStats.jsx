import { React } from 'react';
import { Text, HStack } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

import StatsCard from './StatsCard';

const cardTitles = ['Completed', 'Not Completed', 'Unassigned Segments'];
const cardDescriptions = [
  'Segments that logs have been submitted for by all assigned monitors',
  'Segments that logs have not been submitted for yet',
  'These segments have not been assigned to anyone this month',
];

const MonitorLogSubmissionStats = ({
  month,
  year,
  numLogsCompleted,
  numLogsNotCompleted,
  numSegsUnassigned,
  statsDataCompleted,
  statsDataNotCompleted,
  statsDataUnassigned,
}) => {
  const cardNums = [numLogsCompleted, numLogsNotCompleted, numSegsUnassigned];
  const cardData = [statsDataCompleted, statsDataNotCompleted, statsDataUnassigned];
  return (
    <>
      <Text fontSize="24px" fontWeight="600" ml="110px" mt="64px">
        {month} {year} Monitor Log Submission Stats
      </Text>

      <HStack h="218px" mt="24px" spacing="24px">
        {cardTitles.map((title, index) => {
          return (
            <StatsCard
              key={title}
              title={title}
              numLogs={cardNums[index]}
              description={cardDescriptions[index]}
              data={cardData[index]}
            />
          );
        })}
      </HStack>
    </>
  );
};

MonitorLogSubmissionStats.propTypes = {
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  numLogsCompleted: PropTypes.number.isRequired,
  numLogsNotCompleted: PropTypes.number.isRequired,
  numSegsUnassigned: PropTypes.number.isRequired,
  statsDataCompleted: PropTypes.arrayOf(
    PropTypes.shape({
      segId: PropTypes.string.isRequired,
      peopleAssigned: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          accountInfoLink: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  statsDataNotCompleted: PropTypes.arrayOf(
    PropTypes.shape({
      segId: PropTypes.string.isRequired,
      peopleAssigned: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          accountInfoLink: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  statsDataUnassigned: PropTypes.arrayOf(
    PropTypes.shape({
      segId: PropTypes.string.isRequired,
      peopleAssigned: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          accountInfoLink: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
};

export default MonitorLogSubmissionStats;
