import PropTypes from 'prop-types';

// Pass in toast because can't call hooks in conditionals
const Toast = (toast, status) => {
  const containerStyle = { width: '100vw', fontWeight: 550 };
  const variant = 'subtle';
  const position = 'top';
  const isClosable = true;
  const duration = 5000;
  if (status === 'success') {
    return toast({
      description: 'Successfully saved changes!',
      position,
      status,
      variant,
      duration,
      isClosable,
      containerStyle,
    });
  }

  if (status === 'error') {
    return toast({
      description: 'Error: Unable to save',
      position,
      status,
      variant,
      duration,
      isClosable,
      containerStyle,
    });
  }

  if (status === 'password') {
    return toast({
      description: 'Error: Current passowrd is incorrect',
      position,
      status: 'error',
      variant,
      duration,
      isClosable,
      containerStyle,
    });
  }

  if (status === 'empty') {
    return toast({
      description: 'Error - Please enter a new passowrd',
      position,
      status: 'error',
      variant,
      duration,
      isClosable,
      containerStyle,
    });
  }

  if (status === 'unsaved') {
    return toast({
      description: `Careful - you have unsaved changes`,
      position,
      status: 'error',
      variant,
      duration,
      isClosable,
      containerStyle,
    });
  }
  return {};
};

Toast.propTypes = {
  toast: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
export default Toast;
