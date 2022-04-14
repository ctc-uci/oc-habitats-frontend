import PropTypes from 'prop-types';

// Pass in toast because can't call hooks in conditionals
const Toast = (toast, status) => {
  const containerStyle = { width: '100vw', fontWeight: 550 };
  const variant = 'subtle';
  const position = 'top';
  const isClosable = true;
  const duration = 5000;
  let description = '';
  if (status === 'success') {
    description = 'Successfully saved changes!';
  }

  if (status === 'error') {
    description = 'Error: Unable to save';
  }

  if (status === 'password') {
    description = 'Error: Current passowrd is incorrect';
  }

  if (status === 'empty') {
    description = 'Error: Please enter a new passowrd';
  }

  if (status === 'unsaved') {
    description = 'Careful - you have unsaved changes';
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
