import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDisclosure } from '@chakra-ui/react';
import SegmentAssignmentModal from './SegmentAssignmentModal';
import {
  DeletePendingAccountModal,
  ClearSegmentModal,
  ConvertAccountTypeModal,
} from './AccountModals';

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
const RowModalContextProvider = ({ children, segmentData, refreshData }) => {
  // Data state variables for each modal
  const [segAssignData, setSegAssignData] = useState({});
  const [clearSegAssignData, setClearSegAssignData] = useState({});
  const [deletePendingData, setDeletePendingData] = useState({});
  const [convertAccountData, setConvertAccountData] = useState({});

  // Open and close functions for each modal
  const {
    isOpen: segAssignIsOpen,
    onOpen: segAssignOnOpen,
    onClose: segAssignOnClose,
  } = useDisclosure();
  const {
    isOpen: clearSegAssignIsOpen,
    onOpen: clearSegAssignOnOpen,
    onClose: clearSegAssignOnClose,
  } = useDisclosure();
  const { isOpen: delPenIsOpen, onOpen: delPenOnOpen, onClose: delPenOnClose } = useDisclosure();
  const { isOpen: convAccIsOpen, onOpen: convAccOnOpen, onClose: convAccOnClose } = useDisclosure();

  // Helper functions to set data state then open each modal
  const openSegmentAssignmentWithData = data => {
    setSegAssignData(data);
    segAssignOnOpen();
  };
  const openClearSegmentsWithData = data => {
    setClearSegAssignData(data);
    clearSegAssignOnOpen();
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
    openClearSegmentsModal: openClearSegmentsWithData,
    openDeletePendingModal: openDeletePendingWithData,
    openConvertAccountModal: openConvertAccountWithData,
  };

  // Provide context and render both modals
  return (
    <ModalContext.Provider value={modalFunctions}>
      <SegmentAssignmentModal
        userData={segAssignData}
        segmentData={segmentData}
        refreshData={refreshData}
        isOpen={segAssignIsOpen}
        onClose={segAssignOnClose}
      />
      <ClearSegmentModal
        userData={clearSegAssignData}
        refreshData={refreshData}
        isOpen={clearSegAssignIsOpen}
        onClose={clearSegAssignOnClose}
      />
      <DeletePendingAccountModal
        userData={deletePendingData}
        refreshData={refreshData}
        isOpen={delPenIsOpen}
        onClose={delPenOnClose}
      />
      <ConvertAccountTypeModal
        userData={convertAccountData}
        refreshData={refreshData}
        isOpen={convAccIsOpen}
        onClose={convAccOnClose}
      />
      {children}
    </ModalContext.Provider>
  );
};

RowModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  segmentData: PropTypes.array.isRequired,
  refreshData: PropTypes.func.isRequired,
};

export { useRowModalContext, RowModalContextProvider };
