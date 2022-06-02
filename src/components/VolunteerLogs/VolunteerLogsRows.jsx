import { Button, Checkbox, Icon } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { React } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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
    <Link to={`/create-log/${logId}`}>
      <Button bgColor="transparent" minW={2} h={6} px={2}>
        <Icon h={{ md: 5, base: 4 }} w={{ md: 5, base: 4 }} as={FiEdit3} />
      </Button>
    </Link>
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

Partners.propTypes = {
  sessionPartners: PropTypes.arrayOf(Object).isRequired,
};

EditButton.propTypes = {
  logId: PropTypes.string.isRequired,
  approval: PropTypes.string.isRequired,
};

export { DateFormat, Check, AllCheck, Partners, EditButton };
