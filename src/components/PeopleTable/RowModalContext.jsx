import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDisclosure } from '@chakra-ui/react';
import SegmentAssignmentModal from './SegmentAssignmentModal';
import { DeletePendingAccountModal, ConvertAccountTypeModal } from './AccountModals';

// Creating a context that allows any row to call
// a function that opens the given modal with data
const ModalContext = createContext({
  openSegmentAssignmentModal: () => {},
  openDeletePendingModal: () => {},
  openConvertAccountModal: () => {},
});

// Custom hook to allow children to use ModalContext
function useRowModalContext() {
  return useContext(ModalContext);
}

// Allows any row in the PeopleTable to open modals
// with the data from that row
const RowModalContextProvider = ({ children, segmentData }) => {
  // Data state variables for each modal
  const [segAssignData, setSegAssignData] = useState({});
  const [deletePendingData, setDeletePendingData] = useState({});
  const [convertAccountData, setConvertAccountData] = useState({});

  // Open and close functions for each modal
  const {
    isOpen: segAssignIsOpen,
    onOpen: segAssignOnOpen,
    onClose: segAssignOnClose,
  } = useDisclosure();
  const { isOpen: delPenIsOpen, onOpen: delPenOnOpen, onClose: delPenOnClose } = useDisclosure();
  const { isOpen: convAccIsOpen, onOpen: convAccOnOpen, onClose: convAccOnClose } = useDisclosure();

  // Helper functions to set data state then open each modal
  const openSegmentAssignmentWithData = data => {
    setSegAssignData(data);
    segAssignOnOpen();
  };
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
    openSegmentAssignmentModal: openSegmentAssignmentWithData,
    openDeletePendingModal: openDeletePendingWithData,
    openConvertAccountModal: openConvertAccountWithData,
  };

  // Provide context and render both modals
  return (
    <ModalContext.Provider value={modalFunctions}>
      <SegmentAssignmentModal
        userData={segAssignData}
        segmentData={segmentData}
        isOpen={segAssignIsOpen}
        onClose={segAssignOnClose}
      />
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
  segmentData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export { useRowModalContext, RowModalContextProvider };
