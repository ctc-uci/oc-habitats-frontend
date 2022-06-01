import { React } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Badge, Text, HStack } from '@chakra-ui/react';

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

const VolunteerColumn = ({ data }) => {
  return (
    <HStack>
      <Text>
        {data.submitter?.firstName} {data.submitter?.lastName}
      </Text>
      {data.isSubmittedByTrainee && (
        <Badge variant="solid" colorScheme="orange">
          IN TRAINING
        </Badge>
      )}
    </HStack>
  );
};
DateFormat.propTypes = {
  date: PropTypes.string.isRequired,
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

VolunteerColumn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export { DateFormat, Check, AllCheck, VolunteerColumn };
