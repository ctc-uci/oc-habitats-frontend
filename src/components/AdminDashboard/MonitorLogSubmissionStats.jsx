import { React } from 'react';
import {
  Text,
  Box,
  Flex,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';

function StatsPopUp(title, numLogs, statsData) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton icon={<ExternalLinkIcon boxSize="2em" />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="20px" fontWeight="medium">
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="36px" fontWeight="bold">
              {numLogs}
            </Text>
            {statsData.map(data => {
              const name = `${data.firstName} ${data.lastName}`;
              return (
                <Flex key={data.id} justify="space-between">
                  <Text>{name.substring(0, 25) + (name.length > 25 ? '...' : '')}</Text>
                  <a href={data.accountInfoLink}>
                    <Text textDecoration="underline">Details</Text>
                  </a>
                </Flex>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const MonitorLogSubmissionStats = ({
  month,
  year,
  numLogsCompleted,
  numLogsNotSubmitted,
  statsDataCompleted,
  statsDataNotSubmitted,
}) => {
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
            <Box mr="24px">
              {numLogsCompleted ? (
                StatsPopUp('Completed', numLogsCompleted, statsDataCompleted)
              ) : (
                <></>
              )}
            </Box>
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
            <Box mr="24px">
              {numLogsNotSubmitted ? (
                StatsPopUp('Not Submitted', numLogsNotSubmitted, statsDataNotSubmitted)
              ) : (
                <></>
              )}
            </Box>
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
  statsDataCompleted: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      accountInfoLink: PropTypes.string.isRequired,
    }),
  ).isRequired,
  statsDataNotSubmitted: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      accountInfoLink: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MonitorLogSubmissionStats;
