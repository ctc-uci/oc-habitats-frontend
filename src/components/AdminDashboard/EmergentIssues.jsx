import { React } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

import { useRowSelect } from 'react-table';
import EmergentIssuesCard from './EmergentIssuesCard';

const EmergentIssues = ({ month, year, emergentIssuesData }) => {
  return (
    <Flex direction="column" maxW="100%">
      <Text fontSize="24px" fontWeight="600" mt="64px">
        {month} {year} Emergent Issues
      </Text>
      <Flex wrap="wrap" justify="left" m={0} mt="24px" gap="24px">
        {emergentIssuesData.map(issuesData => {
          return (
            <EmergentIssuesCard
              key={issuesData.id}
              title={issuesData.title}
              numIssues={issuesData.numIssues}
              issueData={issuesData.data}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

EmergentIssues.propTypes = {
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  emergentIssuesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      numIssues: PropTypes.number.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          segment: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          monitorLogLink: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
};

export default EmergentIssues;
