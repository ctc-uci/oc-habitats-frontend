import { React } from 'react';
import { Text, Flex, SimpleGrid } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import EmergentIssuesCard from './EmergentIssuesCard';

const EmergentIssues = ({ month, year, emergentIssuesData }) => {
  return (
    <Flex direction="column" maxW="100%">
      <Text fontSize="24px" fontWeight="600" mt="64px">
        {month} {year} Emergent Issues
      </Text>
      {/* kind of scuffed; TO-DO: fix to make cards aligned with submissions stats cards */}
      <SimpleGrid columns={{ lg: 3, sm: 1 }} m={0} mt="24px" gap="24px">
        {emergentIssuesData.listedSpeciesInfo.map(issuesData => {
          return (
            <EmergentIssuesCard
              key={issuesData._id}
              title={`Injured ${issuesData._id}`}
              numIssues={issuesData.injured}
            />
          );
        })}
        {emergentIssuesData.emergents ? (
          Object.values(emergentIssuesData.emergents).map(data => {
            return (
              <EmergentIssuesCard
                key={data.title}
                title={data.title}
                numIssues={data.count}
                issueData={data.segments}
              />
            );
          })
        ) : (
          <> </>
        )}
      </SimpleGrid>
    </Flex>
  );
};

EmergentIssues.propTypes = {
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  emergentIssuesData: PropTypes.shape({
    emergents: PropTypes.shape({
      injuredTerrestrial: PropTypes.shape({
        title: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        segments: PropTypes.arrayOf(
          PropTypes.shape({
            segment: PropTypes.string,
            date: PropTypes.string,
            monitorLogId: PropTypes.string,
          }),
        ),
      }),
      speedingVehicles: PropTypes.shape({
        title: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        segments: PropTypes.arrayOf(
          PropTypes.shape({
            segment: PropTypes.string,
            date: PropTypes.string,
            monitorLogId: PropTypes.string,
          }),
        ).isRequired,
      }),
    }),
    listedSpeciesInfo: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        injured: PropTypes.number.isRequired,
        segments: PropTypes.shape({
          totalAdults: PropTypes.number,
          totalFledges: PropTypes.number,
          totalChicks: PropTypes.number,
        }).isRequired,
      }),
    ),
  }).isRequired,
};

export default EmergentIssues;
