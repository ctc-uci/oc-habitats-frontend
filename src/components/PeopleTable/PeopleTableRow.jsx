import React from 'react';
import PropTypes from 'prop-types';
import { Tr, Td, VStack, HStack, Flex, Avatar, Badge, Text, IconButton } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import styles from './PeopleTable.module.css';

const NameColumn = ({ data }) => {
  return (
    <Flex w="284px" h="72px" gap="12px" alignItems="center">
      <Avatar size="md" name={data.name} src="something" />
      <VStack alignItems="flex-start">
        <Text>{data.name}</Text>
        <Text color="#718096">{data.email}</Text>
        {data.training ? (
          <Badge
            className="training-badge"
            variant="capitalize"
            bgColor="ochOrange"
            fontSize="12px"
            alignSelf="stretch"
            borderRadius="6px"
            padding="2px 8px"
          >
            In-Training
          </Badge>
        ) : null}
      </VStack>
    </Flex>
  );
};

const SegmentColumn = ({ data }) => {
  return (
    <HStack w="100%" justifyContent="space-between">
      <VStack align="normal">
        {data.map((segment, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <HStack key={i}>
            <Text>{segment.name}</Text>
            <Text color="#718096">{segment.description}</Text>
          </HStack>
        ))}
      </VStack>
      <VStack justify="right">
        <IconButton icon={<BsThreeDotsVertical />} bg="transparent" />
      </VStack>
    </HStack>
  );
};

const PeopleTableRow = ({ data }) => {
  return (
    <>
      <Tr key={data.name} fontSize="14px">
        <Td>
          <NameColumn data={data} />
        </Td>
        <Td fontStyle="italic">{data.lastUpdated}</Td>
        <Td>
          <SegmentColumn data={data.assignedSegments} />
        </Td>
      </Tr>
    </>
  );
};

NameColumn.propTypes = {
  data: PropTypes.string.isRequired,
};

SegmentColumn.propTypes = {
  data: PropTypes.string.isRequired,
};

PeopleTableRow.propTypes = {
  data: PropTypes.string.isRequired,
};

export default PeopleTableRow;
