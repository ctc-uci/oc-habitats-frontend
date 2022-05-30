import { React } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Badge, Text, Icon } from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';

const DateFormat = ({ date }) => {
  return new Date(date).toLocaleDateString();
};

const Check = ({ checked, setChecked, id }) => {
  return (
    <Checkbox
      bg="white"
      isChecked={checked.get(id)}
      onChange={event => {
        if (event.target.checked) {
          const remainingChecks = new Map(checked);
          remainingChecks.set(id, true);
          setChecked(remainingChecks);
        } else {
          const remainingChecks = new Map(checked);
          remainingChecks.set(id, false);
          setChecked(remainingChecks);
        }
      }}
    />
  );
};

const AllCheck = ({ checked, setChecked, allChecked, setAllChecked }) => {
  const handleAllChecked = () => {
    const newCheckedData = new Map(checked);
    if (allChecked) {
      newCheckedData.forEach((value, keys) => {
        newCheckedData.set(keys, false);
      });
    } else {
      newCheckedData.forEach((value, keys) => {
        newCheckedData.set(keys, true);
      });
    }
    setAllChecked(!allChecked);
    setChecked(newCheckedData);
  };

  return <Checkbox bg="white" isChecked={allChecked} onChange={handleAllChecked} />;
};

const ApplyBadge = ({ approval }) => {
  if (approval === 'UNDER_REVIEW') {
    return (
      <Badge variant="solid" colorScheme="blue">
        UNDER REVIEW
      </Badge>
    );
  }

  if (approval === 'UNSUBMITTED') {
    return (
      <Badge variant="solid" colorScheme="gray">
        DRAFT
      </Badge>
    );
  }

  if (approval === 'RESUBMITTED') {
    return (
      <Badge variant="solid" colorScheme="purple">
        RESUBMITTED
      </Badge>
    );
  }

  if (approval === 'EDITS_REQUESTED') {
    return (
      <Badge variant="solid" colorScheme="red">
        EDITS REQUESTED
      </Badge>
    );
  }

  if (approval === 'APPROVED') {
    return (
      <Badge variant="solid" colorScheme="green">
        APPROVED
      </Badge>
    );
  }

  return <Text fontSize="xs">{approval}</Text>;
};

const Partners = ({ sessionPartners }) => {
  if (sessionPartners.length === 0) {
    return '';
  }
  const names = sessionPartners.map(
    partner => `${partner.firstName.charAt(0)}. ${partner.lastName}`,
  );
  return <p>{names.join(', ')}</p>;
};

const EditButton = ({ logId, approval }) => {
  // console.log(logId);
  if (approval === 'APPROVED') {
    return '';
  }

  return (
    <Button bgColor="transparent" minW={2} h={6} px={2}>
      <Icon h={{ md: 5, base: 4 }} w={{ md: 5, base: 4 }} as={FiEdit3} />
    </Button>
  );
};

Check.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  checked: PropTypes.object.isRequired,
  setChecked: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

AllCheck.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  checked: PropTypes.object.isRequired,
  setChecked: PropTypes.func.isRequired,
  allChecked: PropTypes.bool.isRequired,
  setAllChecked: PropTypes.func.isRequired,
};

ApplyBadge.propTypes = {
  approval: PropTypes.string.isRequired,
};

Partners.propTypes = {
  sessionPartners: PropTypes.arrayOf(Object).isRequired,
};

EditButton.propTypes = {
  logId: PropTypes.string.isRequired,
  approval: PropTypes.string.isRequired,
};

export { DateFormat, Check, AllCheck, ApplyBadge, Partners, EditButton };
