import { ButtonGroup, Button, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const EditLogFooter = ({ editForm, submissionId }) => {
  const toast = useToast();
  return (
    <>
      <ButtonGroup>
        <Link to={`/review-log/${submissionId}`}>
          <Button
            variant="outline"
            color="white"
            _hover={{ color: 'black', backgroundColor: 'gray.200' }}
            onClick={editForm}
          >
            Exit Edit Mode
          </Button>
        </Link>
        <Button
          colorScheme="cyan"
          type="submit"
          onClick={async () => {
            await editForm();
            toast({
              title: 'Log saved.',
              status: 'success',
            });
          }}
        >
          {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
          Save Changes
        </Button>
      </ButtonGroup>
    </>
  );
};

EditLogFooter.propTypes = {
  submissionId: PropTypes.string.isRequired,
  editForm: PropTypes.func.isRequired,
};

export default EditLogFooter;
