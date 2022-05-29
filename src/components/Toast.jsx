import PropTypes from 'prop-types';
// Pass in toast because can't call hooks in conditionals
const Toast = (toast, status) => {
  const containerStyle = { width: '100vw', fontWeight: 550 };
  const variant = 'subtle';
  const position = 'top';
  const isClosable = true;
  const duration = 5000;
  let description = '';

  if (status === '') {
    return null;
  }

  if (status === 'success') {
    description = 'Successfully saved changes!';
  }

  if (status === 'error') {
    description = 'Error: Unable to save, please try again later.';
  }

  if (status === 'password') {
    description = 'Error: Current password is incorrect';
  }

  if (status === 'empty') {
    description = 'Error: Please enter a new password';
  }

  if (status === 'unsaved') {
    description = 'Careful - you have unsaved changes';
  }

  if (status === 'weak') {
    description = 'Error - Password should be at least 6 characters';
  }

  return toast({
    description,
    position,
    status: status === 'success' ? status : 'error',
    variant,
    duration,
    isClosable,
    containerStyle,
  });
};

Toast.propTypes = {
  toast: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
export default Toast;
