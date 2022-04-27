import { React } from 'react';
import { Text, Grid, GridItem, Box } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

import EmergentIssuesCard from './EmergentIssuesCard';

const EmergentIssues = ({ month, year, emergentIssuesData }) => {
  return (
    <Box>
      <Text fontSize="24px" fontWeight="600" mt="64px">
        {month} {year} Emergent Issues
      </Text>
      <Grid mt="24px" templateColumns="repeat(3, 0.1fr)" gap="24px">
        {emergentIssuesData.map(issuesData => {
          return (
            <GridItem key={issuesData.id}>
              <EmergentIssuesCard
                title={issuesData.title}
                numIssues={issuesData.numIssues}
                issueData={issuesData.data}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
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
