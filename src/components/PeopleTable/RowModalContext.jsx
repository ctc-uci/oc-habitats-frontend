import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDisclosure } from '@chakra-ui/react';
import { DeletePendingAccountModal, ConvertAccountTypeModal } from './RowMenuModals';

// Creating a context that allows any row to call
// a function that opens the given modal with data
const ModalContext = createContext({
  openDeletePendingModal: () => {},
  openConvertAccountModal: () => {},
});

// Custom hook to allow children to use ModalContext
function useRowModalContext() {
  return useContext(ModalContext);
}

// Allows any row in the PeopleTable to open DeletePendingAccountModal
// and ConvertAccountTypeModal with the data from that row
const RowModalContextProvider = ({ children }) => {
  // Data state variables for each modal
  const [deletePendingData, setDeletePendingData] = useState({});
  const [convertAccountData, setConvertAccountData] = useState({});

  // Open and close functions for each modal
  const { isOpen: delPenIsOpen, onOpen: delPenOnOpen, onClose: delPenOnClose } = useDisclosure();
  const { isOpen: convAccIsOpen, onOpen: convAccOnOpen, onClose: convAccOnClose } = useDisclosure();

  // Helper functions to set data state then open each modal
  const openDeletePendingWithData = data => {
    setDeletePendingData(data);
    delPenOnOpen();
  };
  const openConvertAccountWithData = data => {
    setConvertAccountData(data);
    convAccOnOpen();
  };

  // Set functions for context
  const modalFunctions = {
    openDeletePendingModal: openDeletePendingWithData,
    openConvertAccountModal: openConvertAccountWithData,
  };

  // Provide context and render both modals
  return (
    <ModalContext.Provider value={modalFunctions}>
      <DeletePendingAccountModal
        userData={deletePendingData}
        isOpen={delPenIsOpen}
        onClose={delPenOnClose}
      />
      <ConvertAccountTypeModal
        userData={convertAccountData}
        isOpen={convAccIsOpen}
        onClose={convAccOnClose}
      />
      {children}
    </ModalContext.Provider>
  );
};

RowModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useRowModalContext, RowModalContextProvider };
