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

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

function StatsPopUp(title, numIssues, issueData) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton bg="#F7FAFC" icon={<ExternalLinkIcon boxSize="2em" />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingY={5}>
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
                <Flex key={data.segmentId} justify="space-between">
                  <Text>{data.segmentId}</Text>
                  <Text>{formatDate(data.date)}</Text>
                  <a href={`/review-log/${data.monitorLogId}`}>
                    <Text
                      textDecoration="underline"
                      textUnderlineOffset={1}
                      _hover={{ opacity: '0.6' }}
                    >
                      Monitor Log
                    </Text>
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

const EmergentIssuesCard = ({ title, numIssues, issueData = [] }) => {
  return (
    <Box w="100%" borderWidth="1px" bg="#F7FAFC" borderRadius="12px" borderColor="#E2E8F0" p={6}>
      <Text fontSize="20px" fontWeight="500">
        {title}
      </Text>
      <Flex mt="10px" flexDirection="row" justify="space-between" height="40px" align="center">
        <Box>
          <Text fontSize="36px" fontWeight="700">
            {numIssues}
          </Text>
        </Box>
        <Box>{issueData.length ? StatsPopUp(title, numIssues, issueData) : <></>}</Box>
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
      segmentId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      monitorLogId: PropTypes.string.isRequired,
    }),
  ),
};

export default EmergentIssuesCard;
