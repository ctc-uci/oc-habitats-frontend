import { React } from 'react';
import { Text, Grid, GridItem } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

import EmergentIssuesCard from './EmergentIssuesCard';

const EmergentIssues = ({ month, year, emergentIssuesData }) => {
  return (
    <>
      <Text fontSize="24px" fontWeight="600" ml="110px" mt="64px">
        {month} {year} Emergent Issues
      </Text>
      <Grid ml="110px" mt="24px" templateColumns="repeat(4, 0.1fr)" gap="24px">
        {emergentIssuesData.map(issuesData => {
          return (
            <GridItem key={issuesData.id}>
              <EmergentIssuesCard title={issuesData.title} numIssues={issuesData.numIssues} />
            </GridItem>
          );
        })}
      </Grid>
    </>
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
    }),
  ).isRequired,
};

export default EmergentIssues;
