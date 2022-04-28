import { Box, Button, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FiEdit3 } from 'react-icons/fi';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import AdditionalSpeciesTab from './AdditionalSpeciesTab';
import GeneralInfoTab from './GeneralInfoTab';
import HumanActivityTab from './HumanActivityTab';
import ListedSpeciesTab from './ListedSpeciesTab';
import PredatorsTab from './PredatorsTab';

const EditSectionButton = ({ tabNum, jumpToTab }) => {
  return (
    <Button colorScheme="cyan" minW="150px" onClick={() => jumpToTab(tabNum)}>
      Edit Section
      <FiEdit3 style={{ marginLeft: '4px' }} />
    </Button>
  );
};

EditSectionButton.propTypes = {
  tabNum: PropTypes.number.isRequired,
  jumpToTab: PropTypes.func.isRequired,
};

const ReviewSubmitTab = ({ jumpToTab, assignedSegments, monitorPartners }) => {
  const parentForm = useFormContext();
  const nestedForm = useForm({ defaultValues: parentForm.getValues() });

  const createJumpButton = tabNum => {
    return <EditSectionButton tabNum={tabNum} jumpToTab={jumpToTab} />;
  };

  return (
    <FormProvider {...nestedForm}>
      <CollapsibleSection
        title="General Information"
        limitWidth={false}
        rightElement={createJumpButton(0)}
      >
        <Box mb="10">
          <GeneralInfoTab
            ochUsers={[]}
            showHeader={false}
            isDisabled
            assignedSegments={assignedSegments}
            monitorPartners={monitorPartners}
          />
        </Box>
      </CollapsibleSection>
      <CollapsibleSection title="Least Tern" limitWidth={false} rightElement={createJumpButton(1)}>
        <ListedSpeciesTab
          tab={0}
          speciesName="Least Tern"
          speciesCode="LETE"
          showHeader={false}
          isDisabled
        />
      </CollapsibleSection>
      <CollapsibleSection
        title="Snowy Plover"
        limitWidth={false}
        rightElement={createJumpButton(2)}
      >
        <ListedSpeciesTab
          tab={1}
          speciesName="Snowy Plover"
          speciesCode="WSPL"
          showHeader={false}
          isDisabled
        />
      </CollapsibleSection>
      <CollapsibleSection
        title="Additional Species"
        limitWidth={false}
        rightElement={createJumpButton(3)}
      >
        <AdditionalSpeciesTab showHeader={false} isDisabled />
      </CollapsibleSection>
      <CollapsibleSection title="Predators" limitWidth={false} rightElement={createJumpButton(4)}>
        <PredatorsTab showHeader={false} isDisabled />
      </CollapsibleSection>
      <CollapsibleSection
        title="Human Activity"
        limitWidth={false}
        rightElement={createJumpButton(5)}
      >
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

ReviewSubmitTab.propTypes = {
  jumpToTab: PropTypes.func.isRequired,
  assignedSegments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      segmentId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  monitorPartners: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ),
};

export default ReviewSubmitTab;
