import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  ModalFooter,
  useToast,
  RadioGroup,
  Radio,
  Flex,
  InputGroup,
  Input,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { AiOutlineClockCircle } from 'react-icons/ai';

const ReminderSelect = ({ setModalStep, onClose }) => {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <ModalHeader>Schedule a Reminder</ModalHeader>
      <ModalBody>
        <Text>Would you like to...</Text>
        <RadioGroup value={selected} onChange={val => setSelected(val)}>
          <Radio value="oneTimeReminder">Schedule a 1-time reminder</Radio>
          <Radio value="monthlyReminder">
            <Flex flexDirection="column">
              <Text whiteSpace="nowrap">Reschedule the monthly reminder</Text>
              <Text as="i">Monthly Reminders are currently sent on the 20th.</Text>
              <Text as="i">Monitor Logs are currently due on the 28th.</Text>
            </Flex>
          </Radio>
        </RadioGroup>
      </ModalBody>

      <ModalFooter>
        <Button mr="12px" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button
          bg="ochBlue"
          variant="solidNoHover"
          disabled={!selected}
          onClick={() => setModalStep(selected)}
        >
          Next
        </Button>
      </ModalFooter>
    </>
  );
};
const OneTimeReminder = ({ onSubmit, onClose }) => {
  const [step, setStep] = useState(0);
  const [reminderDate, setReminderDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const toast = useToast();

  const StepOne = () => (
    <div>
      <Text>Select a data and time you&apos;d like to schedule a reminder for.</Text>
      <DatePicker
        selected={reminderDate}
        showTimeSelect
        inline
        onChange={date => setReminderDate(date)}
      />
    </div>
  );
  const StepOneNextBtns = () => (
    <>
      <Button mr="12px" onClick={() => setReminderDate(null)}>
        Clear
      </Button>
      <Button
        bg="ochBlue"
        variant="solidNoHover"
        disabled={!reminderDate}
        onClick={() => setStep(1)}
      >
        Next
      </Button>
    </>
  );

  const StepTwo = () => (
    <div>
      <Text>Select a due date and time</Text>
      <DatePicker selected={dueDate} showTimeSelect inline onChange={date => setDueDate(date)} />
    </div>
  );
  const StepTwoNextBtns = () => (
    <>
      <Button mr="12px" onClick={() => setDueDate(null)}>
        Clear
      </Button>
      <Button
        bg="ochBlue"
        variant="solidNoHover"
        disabled={!dueDate}
        onClick={() => {
          onClose();
          onSubmit({ reminderDate, dueDate });
          toast({
            title: (
              <Text>
                Scheduled a Reminder to Submit Monitor Logs by{' '}
                {dueDate.toLocaleString('default', { month: 'long' })} {dueDate.getDate()}{' '}
                {dueDate.getFullYear()} at {dueDate.toLocaleTimeString()}!
              </Text>
            ),
            description: (
              <Text>
                This reminder is scheduled to send on{' '}
                {reminderDate.toLocaleString('default', { month: 'long' })} {reminderDate.getDate()}{' '}
                {reminderDate.getFullYear()} at {reminderDate.toLocaleTimeString()} to monitors that
                haven&apos;t submitted logs.
              </Text>
            ),
            status: 'success',
            duration: 7000,
            isClosable: true,
          });
        }}
      >
        Schedule Reminder
      </Button>
    </>
  );

  const subModalContent = {
    0: <StepOne />,
    1: <StepTwo />,
  };
  const modalButtons = {
    0: <StepOneNextBtns />,
    1: <StepTwoNextBtns />,
  };

  return (
    <>
      <ModalHeader>Schedule a 1-Time Reminder</ModalHeader>
      <ModalBody>{subModalContent[step]}</ModalBody>
      <ModalFooter>{modalButtons[step]}</ModalFooter>
    </>
  );
};

const MonthlyReminder = ({ onClose, onSubmit }) => {
  // TODO: fetch current reminder/due date from backend
  const [monthlyReminder, setMonthlyReminder] = useState(1);
  const [reminderTime, setReminderTime] = useState(() => {
    const date = new Date();
    date.setHours(13);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  });
  const [monthlyDue, setMonthlyDue] = useState(1);
  const [dueTime, setDueTime] = useState(() => {
    const date = new Date();
    date.setHours(13);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  });

  const convertDay = day => {
    if (
      day % 100 === 11 ||
      day % 100 === 12 ||
      day % 100 === 13 ||
      day % 100 === 14 ||
      day % 100 === 15 ||
      day % 100 === 16 ||
      day % 100 === 17 ||
      day % 100 === 18 ||
      day % 100 === 19
    ) {
      return <sup>th</sup>;
    }
    if (day % 10 === 1) {
      return <sup>st</sup>;
    }
    if (day % 10 === 2) {
      return <sup>nd</sup>;
    }
    if (day % 10 === 3) {
      return <sup>th</sup>;
    }

    return <sup>th</sup>;
  };

  const toast = useToast();
  const setMonthly = () => {
    onClose();

    toast({
      title: (
        <Text>
          Scheduled a Reminder to Submit Monitor Logs by {monthlyReminder}
          {convertDay(monthlyReminder)} at {reminderTime.toLocaleTimeString()}!
        </Text>
      ),
      description: (
        <Text>
          This reminder is scheduled to send on {monthlyReminder}
          {convertDay(monthlyReminder)} at {reminderTime.toLocaleTimeString()} to monitors that
          haven&apos;t submitted logs.
        </Text>
      ),
      status: 'success',
      duration: 7000,
      isClosable: true,
    });
    toast({
      title: (
        <Text>
          Rescheduled the Monthly Due Date to {monthlyDue}
          {convertDay(monthlyDue)} at {dueTime.toLocaleTimeString()}!
        </Text>
      ),
      description: (
        <Text>
          This reminder is scheduled to send on {monthlyDue}
          {convertDay(monthlyDue)} at {dueTime.toLocaleTimeString()} to monitors that haven&apos;t
          submitted logs.
        </Text>
      ),
      status: 'success',
      duration: 7000,
      isClosable: true,
    });
  };

  return (
    <>
      <ModalHeader>Reschedule Monthly Reminder</ModalHeader>
      <ModalBody>
        <Text>
          Current Reminder Date: {monthlyReminder}
          {convertDay(monthlyReminder)} at {reminderTime.toLocaleTimeString()}
        </Text>
        <Text>
          Current Due Date: {monthlyDue}
          {convertDay(monthlyReminder)} at {dueTime.toLocaleTimeString()}
        </Text>
        <br />
        <Text>Reminder Date</Text>
        <Select onChange={e => setMonthlyReminder(e.target.value)}>
          {Array.from(Array(31).keys(), n => n + 1).map(date => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </Select>
        <Text>Reminder Time</Text>
        <InputGroup>
          <Input
            className="without-meridiem"
            type="time"
            value={reminderTime.toLocaleTimeString()}
            onChange={e => {
              const now = new Date();
              const dateTime = now.toISOString();
              const date = dateTime.split('T')[0];
              setReminderTime(new Date(`${date} ${e.target.value}`));
            }}
          />
        </InputGroup>
        <br />
        <Text>Due Date</Text>
        <Select onChange={e => setMonthlyDue(e.target.value)}>
          {Array.from(Array(31).keys(), n => n + 1).map(date => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </Select>
        <Text>Due Time</Text>
        <InputGroup>
          <Input
            className="without-meridiem"
            type="time"
            value={dueTime}
            onChange={e => {
              const now = new Date();
              const dateTime = now.toISOString();
              const date = dateTime.split('T')[0];
              setDueTime(new Date(`${date} ${e.target.value}`));
            }}
          />
        </InputGroup>
      </ModalBody>

      <ModalFooter>
        <Button mr="12px" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button
          bg="ochBlue"
          variant="solidNoHover"
          onClick={() => {
            setMonthly();
            onSubmit({ reminderTime, monthlyReminder, dueTime, monthlyDue });
          }}
        >
          Schedule Reminder
        </Button>
      </ModalFooter>
    </>
  );
};

// modal for the set reminder button
const SetReminderModal = () => {
  const [modalStep, setModalStep] = useState('reminderSelect');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = data => {
    // TODO make backend call for reminder
    // eslint-disable-next-line no-console
    console.log(`Submitting: ${JSON.stringify(data, null, 2)}`);
  };

  useEffect(() => {
    setModalStep('reminderSelect');
  }, [isOpen]);

  const modalContent = {
    reminderSelect: <ReminderSelect setModalStep={setModalStep} onClose={onClose} />,
    oneTimeReminder: <OneTimeReminder onSubmit={onSubmit} onClose={onClose} />,
    monthlyReminder: <MonthlyReminder onSubmit={onSubmit} onClose={onClose} />,
  };

  // const toast = useToast();
  return (
    <>
      <Button
        bg="ochBlue"
        variant="solidNoHover"
        onClick={onOpen}
        rightIcon={<AiOutlineClockCircle />}
      >
        Set Reminder
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>{modalContent[modalStep]}</ModalContent>
      </Modal>
    </>
  );
};

ReminderSelect.propTypes = {
  setModalStep: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

OneTimeReminder.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

MonthlyReminder.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SetReminderModal;
