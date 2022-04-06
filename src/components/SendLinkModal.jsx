/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ChakraProvider,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import Checkmark from '../assets/Check.png';
import { sendInviteLink, NPOBackend } from '../utils/auth_utils';

const ModalOne = ({ count, setCount }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendLink = async e => {
    try {
      e.preventDefault();
      const backendUser = await NPOBackend.get(`/users/email/${email}`);
      if (backendUser.data.user) {
        throw new Error('This email is already in use. Please enter a new email address.');
      }
      await sendInviteLink(email);
      setErrorMessage('');
      setEmail('');
      setCount(count + 1);
    } catch (err) {
      setErrorMessage(err.message);
      console.log(errorMessage);
    }
  };

  return (
    <div>
      <Text fontSize="xl" fontWeight="bold" style={{ alignSelf: 'flex-start' }}>
        Send registration link via email:
      </Text>
      <Input
        placeholder="e.g.: name@findyouranchor.us"
        value={email}
        size="lg"
        color="#7D7D7D"
        bg="#F6F6F6"
        onChange={e => setEmail(e.target.value)}
      />
      <p>{errorMessage}</p>
      <Button onClick={handleSendLink} color="white" bg="#345E80" iconSpacing="120px">
        Send Link
      </Button>
    </div>
  );
};

const ModalTwo = () => (
  <div>
    <img src={Checkmark} alt="Green Checkmark" />
    <Text fontSize="2xl" fontWeight="bold" textAlign="center">
      LINK SENT!
    </Text>
    <Text color="#3182CE" textAlign="center">
      Recipient will receive link in their inbox shortly...
    </Text>
    <Button color="white" bg="#1F2F38">
      Resend Link
    </Button>
  </div>
);

const SendLinkModalContent = () => {
  const [countState, setCountState] = useState(0);

  const modalStates = [
    <ModalOne key="" count={countState} setCount={setCountState} />,
    <ModalTwo key="" />,
  ];

  return modalStates[countState];
};

const SendLinkModal = ({ isOpen, onClose }) => {
  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <SendLinkModalContent />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

ModalOne.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.number.isRequired,
};

SendLinkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SendLinkModal;