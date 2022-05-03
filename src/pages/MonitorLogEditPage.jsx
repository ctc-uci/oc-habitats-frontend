/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  FormLabel,
  Heading,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Tabs,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { React, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowUp, FiCheck } from 'react-icons/fi';
// import { OCHBackend } from '../common/utils';
import LogTemplateSwitcher from '../components/LogTemplateSwitcher';
import NewQuestionModal from '../components/NewQuestionModal';

import { OCHBackend } from '../common/utils';

const MonitorLogEditPage = () => {
  const formMethods = useForm({});
  const navigate = useNavigate();

  const checkInModal = useDisclosure();
  const addQuestionModal = useDisclosure();

  const [activeTab, setActiveTab] = useState(0);
  // tab # will be dynamic with dynamic listed species
  const totalTabs = 7;

  const topRef = useRef();

  const returnToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  // state for tab switcher
  const [currentTemplate, setCurrentTemplate] = useState('general');

  // state for form in add question popup
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [tooltip, setTooltip] = useState();

  const addQuestion = async () => {
    const form = await OCHBackend.put(`/forms/update/${currentTemplate}`, {
      newField: {
        title,
        fieldType: type,
        static: true,
        tooltip,
      },
    });

    console.log(form);
    addQuestionModal.onClose();
  };

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
                onChange={e => setCurrentTemplate(e.target.value)}
              >
                <option value="general">General Information </option>
                <option value="listed-species">Listed Species</option>
                <option value="non-listed">Non-Listed Species</option>
                <option value="predator">Predators</option>
                <option value="human-activity">Human Activity</option>
              </Select>
              <Spacer />
              {currentTemplate !== 'non-listed' && currentTemplate !== 'predator' && (
                <>
                  <Button
                    bgColor="ochOrange"
                    // type="submit"
                    onClick={addQuestionModal.onOpen}
                  >
                    + Add Question
                  </Button>

                  <Modal
                    w="460px"
                    h="512px"
                    bgColor="rgba(253, 253, 253, 1)"
                    px="15px"
                    py="10px"
                    isOpen={addQuestionModal.isOpen}
                    onClose={addQuestionModal.onClose}
                  >
                    <ModalContent>
                      <ModalHeader>Add Question</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Box>
                          <FormControl>
                            <FormControl>
                              <FormLabel htmlFor="title">Question Title</FormLabel>
                              <Input
                                id="title"
                                type="text"
                                value={title}
                                placeholder="Title"
                                onChange={({ target }) => setTitle(target.value)}
                                w="412px"
                                mb="20px"
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel htmlFor="type">Question Type</FormLabel>
                              <RadioGroup
                                id="type"
                                onChange={e => setType(e)}
                                value={type}
                                maxW="700px"
                                defaultValue="TEXT"
                              >
                                <HStack spacing="2px" mb="10px">
                                  <Radio value="TEXT" mr="10px">
                                    Text Input
                                  </Radio>
                                  <Radio value="NUMBER">Number Input</Radio>
                                </HStack>
                              </RadioGroup>
                              <FormControl>
                                <FormLabel>Tooltip (optional)</FormLabel>
                                <Textarea
                                  value={tooltip}
                                  onChange={({ target }) => setTooltip(target.value)}
                                  placeholder="Type here..."
                                  w="412px"
                                  h="128px"
                                  mb="20px"
                                />
                              </FormControl>
                            </FormControl>
                          </FormControl>
                        </Box>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          type="submit"
                          bgColor="ochBlue"
                          w="412px"
                          h="40px"
                          onClick={addQuestion}
                        >
                          Add Question
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              )}
            </HStack>
            <LogTemplateSwitcher type={currentTemplate} />
          </Tabs>
          <Flex
            alignItems="center"
            justifyContent="center"
            bg="ochGrey"
            position="fixed"
            w="100%"
            left="0"
            bottom="0"
            h="16"
            zIndex="banner"
          >
            <Flex width="100%" maxWidth="1500px" p="32px">
              <Button
                onClick={returnToTop}
                variant="outline"
                color="white"
                _hover={{ color: 'black', backgroundColor: 'white' }}
              >
                Return to Top <FiArrowUp style={{ marginLeft: '4px' }} />
              </Button>
              <Spacer />
              {activeTab !== totalTabs - 1 && (
                <Button
                  colorScheme="cyan"
                  type="submit"
                  //  onClick={handleSubmit}
                >
                  {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
                  Save Changes
                </Button>
              )}
              {activeTab === totalTabs - 1 && (
                <Button
                  colorScheme="green"
                  type="submit"
                  //  onClick={handleSubmit}
                >
                  {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
                  Submit Log <FiCheck style={{ marginLeft: '4px' }} />
                </Button>
              )}
            </Flex>
          </Flex>
        </FormProvider>
      </Box>
    </Flex>
  );
};

export default MonitorLogEditPage;
