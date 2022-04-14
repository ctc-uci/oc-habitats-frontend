import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  HStack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import GeneralInfoTab from './GeneralInfoTab';

const ReviewSubmitTab = () => {
  // const { control, register, getValues, watch } = useFormContext();
  const parentForm = useFormContext();
  const nestedForm = useForm({ defaultValues: parentForm.getValues() });
  return (
    <FormProvider {...nestedForm}>
      {/* <Button onClick={test}>Test</Button> */}
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
            <GeneralInfoTab ochUsers={[]} showHeader={false} isDisabled />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </FormProvider>
  );
};

export default ReviewSubmitTab;
