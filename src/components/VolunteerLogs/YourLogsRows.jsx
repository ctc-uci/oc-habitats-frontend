import { React } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Badge, Text } from '@chakra-ui/react';

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
        draft
      </Badge>
    );
  }

  if (approval === 'RESUBMITTED') {
    return (
      <Badge variant="solid" colorScheme="purple">
        {approval}
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
    <Badge variant="solid" colorScheme="green">
      APPROVED
    </Badge>;
  }
  return <Text fontSize="xs">{approval}</Text>;
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

ApplyBadge.propTypes = {
  approval: PropTypes.string.isRequired,
};

export { DateFormat, Check, AllCheck, ApplyBadge };
