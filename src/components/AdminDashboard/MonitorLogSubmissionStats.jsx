import { React } from 'react';
import { Text, Box, Flex, Spacer, HStack } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';

const MonitorLogSubmissionStats = ({ month, year, numLogsCompleted, numLogsNotSubmitted }) => {
  return (
    <>
      <Text fontSize="24px" fontWeight="600" ml="110px" mt="64px">
        {month} {year} Monitor Log Submission Stats
      </Text>

      <HStack h="218px" mt="24px" spacing="24px">
        <Box maxW="390px" borderWidth="1px" ml="110px" bg="#E2E8F0" borderRadius="12px">
          <Text ml="24px" mt="24px" fontSize="20px" fontWeight="500">
            Completed
          </Text>
          <Flex flexDirection="row" justify="space-between" height="40px" align="center">
            <Box ml="24px" mt="16px" mb="5px">
              <Text fontSize="36px" fontWeight="700">
                {numLogsCompleted}
              </Text>
            </Box>
            <Box mr="24px">{numLogsCompleted ? <ExternalLinkIcon boxSize="2em" /> : <></>}</Box>
          </Flex>
          <Text ml="24px" mr="41px" mt="30px" mb="24px" fontSize="20px">
            Monitors that have submitted logs for their assigned segments
          </Text>
        </Box>

        <Box maxW="390px" borderWidth="1px" bg="#E2E8F0" borderRadius="12px">
          <Text ml="24px" mt="24px" fontSize="20px" fontWeight="500">
            Not Submitted
          </Text>
          <Flex flexDirection="row" justify="space-between" height="40px" align="center">
            <Box ml="24px" mt="16px" mb="5px">
              <Text fontSize="36px" fontWeight="700">
                {numLogsNotSubmitted}
              </Text>
            </Box>
            <Box mr="24px">{numLogsNotSubmitted ? <ExternalLinkIcon boxSize="2em" /> : <></>}</Box>
          </Flex>
          <Text ml="24px" mr="41px" mt="30px" mb="24px" fontSize="20px">
            Monitors that have not submitted logs for their assigned segments
          </Text>
        </Box>
      </HStack>
    </>
  );
};

MonitorLogSubmissionStats.propTypes = {
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  numLogsCompleted: PropTypes.number.isRequired,
  numLogsNotSubmitted: PropTypes.number.isRequired,
};

export default MonitorLogSubmissionStats;
