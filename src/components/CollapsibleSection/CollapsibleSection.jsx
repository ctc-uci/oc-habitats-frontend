import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Stack,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { React } from 'react';

const CollapsibleSection = ({ title, children, limitWidth, rightElement }) => {
  return (
    <VStack w="100%" align="start" spacing="2em" maxW={limitWidth ? '900px' : ''}>
      <Accordion allowMultiple="true" defaultIndex={[0]} width="100%">
        <AccordionItem borderColor="white" spacing={10}>
          <Stack direction={{ md: 'row', base: 'column' }} marginBottom="4">
            <AccordionButton
              padding="0"
              _focus={{ boxShadow: 'none' }}
              _hover={{ backgroundColor: 'none' }}
            >
              <Heading as="h3" size="md" marginRight="2">
                {title}
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            {rightElement}
          </Stack>

          <AccordionPanel padding="0" width="100%">
            {children}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

CollapsibleSection.defaultProps = {
  limitWidth: true,
  rightElement: null,
};

CollapsibleSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  limitWidth: PropTypes.bool,
  rightElement: PropTypes.node,
};
export default CollapsibleSection;
