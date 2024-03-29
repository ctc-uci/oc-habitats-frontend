import { Box, Button, Text, Icon } from '@chakra-ui/react';
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
    <Button colorScheme="cyan" w="155px" onClick={() => jumpToTab(tabNum)}>
      Edit Section
      <Icon as={FiEdit3} ml={2} />
    </Button>
  );
};

EditSectionButton.propTypes = {
  tabNum: PropTypes.number.isRequired,
  jumpToTab: PropTypes.func.isRequired,
};

const ReviewSubmitTab = ({
  jumpToTab,
  assignedSegments,
  monitorPartners,
  predators,
  listedSpecies,
  additionalSpecies,
}) => {
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
      {listedSpecies.map((species, idx) => (
        <CollapsibleSection
          key={species._id}
          title={species.name}
          limitWidth={false}
          rightElement={createJumpButton(idx + 1)}
        >
          <ListedSpeciesTab
            speciesName={species.name}
            speciesCode={species.code}
            speciesId={species._id}
            showHeader={false}
            isDisabled
          />
        </CollapsibleSection>
      ))}
      <CollapsibleSection
        title="Additional Species"
        limitWidth={false}
        rightElement={createJumpButton(listedSpecies.length + 1)}
      >
        <AdditionalSpeciesTab showHeader={false} isDisabled species={additionalSpecies} />
      </CollapsibleSection>
      <CollapsibleSection
        title="Predators"
        limitWidth={false}
        rightElement={createJumpButton(listedSpecies.length + 2)}
      >
        <PredatorsTab showHeader={false} isDisabled predators={predators} />
      </CollapsibleSection>
      <CollapsibleSection
        title="Human Activity"
        limitWidth={false}
        rightElement={createJumpButton(listedSpecies.length + 3)}
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
  ).isRequired,
  monitorPartners: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  predators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  additionalSpecies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string,
    }),
  ).isRequired,
  listedSpecies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string,
    }),
  ).isRequired,
};

export default ReviewSubmitTab;
