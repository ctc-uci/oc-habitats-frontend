import { React } from 'react';
import {
  Text,
  Box,
  Flex,
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

function StatsPopUp(title, numIssues, issueData) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton bg="#F7FAFC" icon={<ExternalLinkIcon boxSize="2em" />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="20px" fontWeight="medium">
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="36px" fontWeight="bold">
              {numIssues}
            </Text>
            {issueData.map(data => {
              return (
                <Flex key={data.id} justify="space-between">
                  <Text>{data.segment}</Text>
                  <Text>{data.date}</Text>
                  <a href={data.monitorLogLink}>
                    <Text textDecoration="underline">MonitorLog</Text>
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

const EmergentIssuesCard = ({ title, numIssues, issueData }) => {
  return (
    <Box
      w={{ lg: '32%', sm: '100%' }}
      borderWidth="1px"
      bg="#F7FAFC"
      borderRadius="12px"
      borderColor="#E2E8F0"
      p={6}
    >
      <Text fontSize="20px" fontWeight="500">
        {title}
      </Text>
      <Flex mt="10px" flexDirection="row" justify="space-between" height="40px" align="center">
        <Box>
          <Text fontSize="36px" fontWeight="700">
            {numIssues}
          </Text>
        </Box>
        <Box>{numIssues ? StatsPopUp(title, numIssues, issueData) : <></>}</Box>
      </Flex>
    </Box>
  );
};

EmergentIssuesCard.defaultProps = {
  issueData: [],
};

EmergentIssuesCard.propTypes = {
  title: PropTypes.string.isRequired,
  numIssues: PropTypes.number.isRequired,
  issueData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      segment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      monitorLogLink: PropTypes.string.isRequired,
    }),
  ),
};

export default EmergentIssuesCard;
