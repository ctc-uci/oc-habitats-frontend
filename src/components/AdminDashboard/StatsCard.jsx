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
  Button,
} from '@chakra-ui/react';
import { ExternalLinkIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';

function DetailsPopUp(segId, peopleAssigned) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pAssigned = [...peopleAssigned];

  return (
    <>
      <Button onClick={onOpen} variant="unstyled">
        <Text textDecoration="underline">Details</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <IconButton
            mr="352px"
            mt="15px"
            ml="15px"
            w="16px"
            h="32px"
            variant="ghost"
            icon={<ArrowBackIcon boxSize="1.25em" />}
            onClick={() => onClose()}
          />
          <ModalHeader fontSize="20px" fontWeight="medium">
            Monitors Assigned to {segId}
          </ModalHeader>
          <ModalBody>
            {pAssigned.map(data => {
              const name = `${data.firstName} ${data.lastName}`;
              return (
                <Flex mt="16px" flexDirection="column" key={data.id} justify="space-between">
                  <a href={data.accountInfoLink}>
                    <Text textDecoration="underline" fontWeight="medium">
                      {name.substring(0, 25) + (name.length > 25 ? '...' : '')}
                    </Text>
                  </a>

                  <Text>{data.email}</Text>
                </Flex>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function StatsPopUp(title, numLogs, statsData) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        bg="#F7FAFC"
        icon={<ExternalLinkIcon boxSize="2em" variant="unstyle" />}
        onClick={onOpen}
      />

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
              const people = [...data.peopleAssigned];
              return (
                <Flex key={data.segId} justify="space-between">
                  <Text>Segment {data.segId}</Text>
                  {DetailsPopUp(data.segId, people)}
                </Flex>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const StatsCard = ({ title, numLogs, description, data }) => {
  return (
    <Box h="228px" maxW="390px" borderWidth="1px" ml="110px" bg="#F7FAFC" borderRadius="12px">
      <Text ml="24px" mt="24px" fontSize="20px" fontWeight="500">
        {title}
      </Text>
      <Flex flexDirection="row" justify="space-between" height="40px" align="center">
        <Box ml="24px" mt="16px" mb="5px">
          <Text fontSize="36px" fontWeight="700">
            {numLogs}
          </Text>
        </Box>
        <Box mr="24px">{numLogs ? StatsPopUp(title, numLogs, data) : <></>}</Box>
      </Flex>
      <Text ml="24px" mr="41px" mt="30px" mb="24px" fontSize="20px">
        {description}
      </Text>
    </Box>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  numLogs: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      segId: PropTypes.string.isRequired,
      peopleAssigned: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          accountInfoLink: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
};

export default StatsCard;
