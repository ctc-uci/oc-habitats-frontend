import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Text } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const descriptions = {
  admin: {
    header: 'Admin',
    description: (
      <>
        Select the <BsThreeDotsVertical style={{ display: 'inline' }} /> button on a row in the
        table to view or edit an Admin profile.
      </>
    ),
  },
  volunteer: {
    header: 'Volunteer',
    description: (
      <>
        Select the <BsThreeDotsVertical style={{ display: 'inline' }} /> button on a row in the
        table to view or edit a Volunteer profile.
      </>
    ),
  },
};

const PeopleTableDescription = ({ variant }) => {
  return (
    <>
      <Heading fontWeight="600" fontSize="20px" mb="4px" mt="40px" align="left">
        {descriptions[variant].header}
      </Heading>
      <Text fontWeight="400" fontSize="18px" align="left" display="inline">
        {descriptions[variant].description}
      </Text>
    </>
  );
};

PeopleTableDescription.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default PeopleTableDescription;
