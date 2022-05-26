/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
import { Box, Flex, Heading, HStack, Select, Spacer, Tabs, useDisclosure } from '@chakra-ui/react';
import { React, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import LogTemplateSwitcher from '../components/LogTemplateSwitcher';

const MonitorLogEditPage = () => {
  const formMethods = useForm({});

  const checkInModal = useDisclosure();

  const [activeTab, setActiveTab] = useState(0);

  const topRef = useRef();

  // state for tab switcher
  const [currentTemplate, setCurrentTemplate] = useState('general');

  useEffect(async () => {
    checkInModal.onOpen();
  }, []);

  return (
    <Flex w="100%" justifyContent="center">
      <Box w="1500px">
        <FormProvider {...formMethods}>
          <Heading ref={topRef} px="32px" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
            Monitor Log Template
          </Heading>
          <Tabs
            variant="solid-rounded"
            size="lg"
            align="start"
            colorScheme="orange"
            index={activeTab}
            onChange={setActiveTab}
            isLazy
          >
            <HStack>
              <Select
                placeholder="Select option"
                maxW="300px"
                value={currentTemplate}
                onChange={e => {
                  setCurrentTemplate(e.target.value);
                }}
              >
                <option value="general">General Information </option>
                <option value="listed-species">Listed Species</option>
                <option value="non-listed">Non-Listed Species</option>
                <option value="predator">Predators</option>
                <option value="human-activity">Human Activity</option>
              </Select>
              <Spacer />
            </HStack>
            <LogTemplateSwitcher type={currentTemplate} />
          </Tabs>
        </FormProvider>
      </Box>
    </Flex>
  );
};

export default MonitorLogEditPage;
