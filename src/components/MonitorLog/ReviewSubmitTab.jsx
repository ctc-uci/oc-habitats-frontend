import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import GeneralInfoTab from './GeneralInfoTab';

const ReviewSubmitTab = () => {
  const { register, getValues } = useFormContext();
  const nestedForm = useForm({
    defaultValues: getValues(),
  });
  return (
    <FormProvider {...nestedForm}>
      <Accordion allowMultiple="true" defaultIndex={[0]}>
        <AccordionItem borderColor="white" spacing={10}>
          <HStack>
            <AccordionButton
              padding="0"
              _focus={{ boxShadow: 'none' }}
              _hover={{ backgroundColor: 'none' }}
            >
              <Text mr="10px" fontSize="24px" fontWeight={550}>
                General Information
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </HStack>
          <AccordionPanel padding="0">
            <GeneralInfoTab ochUsers={[]} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </FormProvider>
  );
};

export default ReviewSubmitTab;
