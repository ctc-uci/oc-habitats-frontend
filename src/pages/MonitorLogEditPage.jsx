/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
import { Box, Flex, Heading, HStack, Select, Spacer, Tabs, useDisclosure } from '@chakra-ui/react';
import { React, useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
// import { OCHBackend } from '../common/utils';
import LogTemplateSwitcher from '../components/LogTemplateSwitcher';
import NewQuestionModal from '../components/NewQuestionModal';

const MonitorLogEditPage = () => {
  const formMethods = useForm({});
  // for prettier
  // const navigate = useNavigate();

  const checkInModal = useDisclosure();

  const [activeTab, setActiveTab] = useState(0);
  // tab # will be dynamic with dynamic listed species
  // const totalTabs = 7;

  const topRef = useRef();
  /*
  const returnToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  */
  // state for tab switcher
  const [currentTemplate, setCurrentTemplate] = useState('general');
  // const form = await OCHBackend.post('/forms/create/field', {
  //   formType: currentTemplate,
  //   fieldBody: {
  //     title,
  //     fieldType: type,
  //     tooltip,
  //   }
  //   },
  // });

  // console.log(form);
  // };

  useEffect(async () => {
    checkInModal.onOpen();

    try {
      // const [userData, monitorPartnersData] = await Promise.all([
      //  OCHBackend.get('users/me', { withCredentials: true }),
      //  OCHBackend.get('users/monitorPartners', { withCredentials: true }),
      // ]);
      // setUser(userData.data);
      // setMonitorPartners(monitorPartnersData.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
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
              {currentTemplate !== 'non-listed' && currentTemplate !== 'predator' && (
                <NewQuestionModal currentTemplate={currentTemplate} />
              )}
            </HStack>
            <LogTemplateSwitcher type={currentTemplate} />
          </Tabs>
        </FormProvider>
      </Box>
    </Flex>
  );
};

export default MonitorLogEditPage;
