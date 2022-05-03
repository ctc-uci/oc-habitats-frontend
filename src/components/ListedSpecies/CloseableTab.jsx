import { CloseIcon } from '@chakra-ui/icons';
import { useTab, Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import React from 'react';

const CloseableTab = React.forwardRef(function CustomTab(props, ref) {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps['aria-selected'];

  const buttonStyleProps = {
    color: isSelected ? 'black' : 'initial',
    bg: isSelected ? 'ochOrange' : 'initial',
    borderColor: isSelected ? 'ochOrange' : 'gray.200',
    borderWidth: '1px',
    borderRadius: 'full',
  };

  return (
    <ButtonGroup isAttached colorScheme="orange">
      <Button {...tabProps} {...buttonStyleProps} mr="-px" borderRightWidth="0">
        {tabProps.children}
      </Button>
      <IconButton
        {...buttonStyleProps}
        borderLeftWidth="0"
        onFocus={() => {}}
        onClick={tabProps.onClose}
        aria-label="Delete tab"
        icon={<CloseIcon />}
      />
    </ButtonGroup>
  );
});

export default CloseableTab;
