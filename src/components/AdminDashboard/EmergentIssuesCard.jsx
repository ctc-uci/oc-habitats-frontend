import { React } from 'react';
import { Text, Box, Flex } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';

const EmergentIssuesCard = ({ title, numIssues }) => {
  return (
    <Box w="390px" h="132px" borderWidth="1px" bg="#E2E8F0" borderRadius="12px">
      <Text ml="24px" mt="24px" fontSize="20px" fontWeight="500">
        {title}
      </Text>
      <Flex
        ml="24px"
        mt="16px"
        flexDirection="row"
        justify="space-between"
        height="40px"
        align="center"
      >
        <Box>
          <Text fontSize="36px" fontWeight="700">
            {numIssues}
          </Text>
        </Box>
        <Box mr="24px">{numIssues ? <ExternalLinkIcon boxSize="2em" /> : <></>}</Box>
      </Flex>
    </Box>
  );
};

EmergentIssuesCard.propTypes = {
  title: PropTypes.string.isRequired,
  numIssues: PropTypes.number.isRequired,
};

export default EmergentIssuesCard;
