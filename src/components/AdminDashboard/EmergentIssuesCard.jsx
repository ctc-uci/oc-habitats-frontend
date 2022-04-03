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
        <Box mr="24px">{numIssues ? StatsPopUp(title, numIssues, issueData) : <></>}</Box>
      </Flex>
    </Box>
  );
};

EmergentIssuesCard.propTypes = {
  title: PropTypes.string.isRequired,
  numIssues: PropTypes.number.isRequired,
  issueData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      accountInfoLink: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default EmergentIssuesCard;
