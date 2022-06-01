import { React } from 'react';
import { PropTypes } from 'prop-types';
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Stack,
  Input,
  Textarea,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { OCHBackend } from '../../common/utils';

const sectionSchema = yup.object({
  sectionId: yup.string().required('Section Id is required'),
  sectionName: yup.string().required('Section Name is required'),
  sectionMapLink: yup.string().required('Section Map Link is required'),
});

const ModalContentEditSection = ({ editSection, section, onClose }) => {
  const preloadedSection = {
    // eslint-disable-next-line no-underscore-dangle
    sectionId: section._id,
    sectionName: section.name,
    sectionMapLink: section.map,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedSection,
    resolver: yupResolver(sectionSchema),
    delayError: 750,
  });

  return (
    <>
      <ModalHeader>Edit Section</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(editSection)}>
          <Stack column="vertical">
            <FormControl isInvalid={errors?.sectionId}>
              <FormLabel htmlFor="sectionId">Section Id</FormLabel>
              <Input id="sectionId" placeholder="Section Id" {...register('sectionId')} />
              <FormErrorMessage>{errors.sectionId?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.sectionName}>
              <FormLabel htmlFor="sectionName">Section Name</FormLabel>
              <Input id="sectionName" {...register('sectionName')} />
              <FormErrorMessage>{errors.sectionName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.sectionMapLink}>
              <FormLabel htmlFor="sectionMapLink">Section Map Link</FormLabel>
              <Textarea id="sectionMapLink" {...register('sectionMapLink')} />
              <FormErrorMessage>{errors.sectionMapLink?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
          <ModalFooter pr={0}>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" bg="ochBlue" color="ochBlack" variant="solid" type="submit">
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </>
  );
};

const EditDeleteSectionPopup = ({ section, getSections }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const editSection = async newSection => {
    try {
      await OCHBackend.put(
        `/section/${newSection.sectionId}`,
        {
          _id: newSection.sectionId,
          name: newSection.sectionName,
          map: newSection.sectionMapLink,
        },
        { withCredentials: true },
      );
      toast({
        title: `Successfully updated Section ${newSection.sectionId}.`,
        status: 'success',
        isClosable: true,
      });
      getSections();
      onClose();
    } catch (err) {
      toast({
        title: `Unable to update Section ${newSection.sectionId}.`,
        description: err?.message,
        status: 'error',
        isClosable: true,
      });
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
  const deleteSection = async () => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      await OCHBackend.delete(`/section/${section._id}`);
      toast(
        {
          title: `Successfully deleted Section ${section._id}.`,
          status: 'success',
          isClosable: true,
        },
        { withCredentials: true },
      );
      getSections();
      onClose();
    } catch (err) {
      toast({
        title: `Unable to delete Section ${section._id}.`,
        description: err?.message,
        status: 'error',
        isClosable: true,
      });
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <>
      <Menu>
        <MenuButton>
          <Button
            size="sm"
            bg="#2BC0E3"
            variant="solid"
            aria-label="Edit Section"
            rightIcon={<FiEdit3 />}
          >
            Edit Section
          </Button>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Edit Section</MenuItem>
          <MenuItem>
            <Text color="red" onClick={deleteSection}>
              Delete Section
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalContentEditSection editSection={editSection} section={section} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

ModalContentEditSection.propTypes = {
  editSection: PropTypes.func.isRequired,
  section: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
EditDeleteSectionPopup.propTypes = {
  section: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
  }).isRequired,
  getSections: PropTypes.func.isRequired,
};
export default EditDeleteSectionPopup;
