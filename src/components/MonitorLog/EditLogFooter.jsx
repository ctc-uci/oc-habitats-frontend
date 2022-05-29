import { ButtonGroup, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const EditLogFooter = ({ role, submitForm, formMethods }) => {
  if (role === 'admin') {
    return (
      <>
        <ButtonGroup>
          <Button>Exit Edit Mode</Button>
          <Button
            colorScheme="cyan"
            type="submit"
            onClick={() => {
              formMethods.setValue({ status: 'RESUBMITTED' });
              submitForm();
            }}
          >
            {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
            Save Changes
          </Button>
        </ButtonGroup>
      </>
    );
  }

  return (
    <Button>
      <Button
        colorScheme="cyan"
        type="submit"
        onClick={() => {
          formMethods.setValue({ status: 'RESUBMITTED' });
          submitForm();
        }}
      >
        {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
        Save Changes
      </Button>
    </Button>
  );
};

EditLogFooter.propTypes = {
  role: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formMethods: PropTypes.object.isRequired,
};

export default EditLogFooter;
