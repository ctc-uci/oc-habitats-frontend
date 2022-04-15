import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import AdditionalSpeciesTab from './AdditionalSpeciesTab';
import GeneralInfoTab from './GeneralInfoTab';
import HumanActivityTab from './HumanActivityTab';
import ListedSpeciesTab from './ListedSpeciesTab';

const ReviewSubmitTab = () => {
  const parentForm = useFormContext();
  const nestedForm = useForm({ defaultValues: parentForm.getValues() });
  return (
    <FormProvider {...nestedForm}>
      <CollapsibleSection title="General Information" limitWidth={false}>
        <GeneralInfoTab ochUsers={[]} showHeader={false} isDisabled />
      </CollapsibleSection>
      <Box mt="10">
        <CollapsibleSection title="Least Tern" limitWidth={false}>
          <ListedSpeciesTab
            tab={0}
            speciesName="Least Tern"
            speciesCode="LETE"
            showHeader={false}
            isDisabled
          />
        </CollapsibleSection>
      </Box>
      <CollapsibleSection title="Snowy Plover" limitWidth={false}>
        <ListedSpeciesTab
          tab={1}
          speciesName="Snowy Plover"
          speciesCode="WSPL"
          showHeader={false}
          isDisabled
        />
      </CollapsibleSection>
      <CollapsibleSection title="Additional Species" limitWidth={false}>
        <AdditionalSpeciesTab showHeader={false} isDisabled />
      </CollapsibleSection>
      <CollapsibleSection title="Human Activity" limitWidth={false}>
        <HumanActivityTab showHeader={false} isDisabled />
      </CollapsibleSection>
      <Text fontStyle="oblique">
        Any person gathering and/or submitting data in this document acknowledges that the data is
        solely owned by OC Habitats™ and is copyright protected. Data is not to be shared with other
        organizations absent written permission from OC Habitats™. ©2022 OC Habitats™. All Rights
        Reserved. If you have questions, please contact OC Habitats at 949.697.8651 or
        och@ochabitats.org.
      </Text>
    </FormProvider>
  );
};

export default ReviewSubmitTab;
