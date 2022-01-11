import { React } from 'react';
import { Box } from '@chakra-ui/react';
import Section from '../components/Section';

const sectionsData = [
  {
    id: 1,
    title: 'Section 1: Seal Beach to Huntington Beach (South)',
    segments: [
      {
        segment: 'OC01',
        segmentName: 'Seal Beach (1st St. - North End Anaheim Bay)',
        distance: 1.6,
      },
      {
        segment: 'OC02',
        segmentName: 'Surfside (South of Anaheim Bay to 19th Street)',
        distance: 1.8,
      },
      {
        segment: 'OC03',
        segmentName: 'Sunset Beach (19th Street to Warner Avenue)',
        distance: 1.3,
      },
    ],
  },
  {
    id: 2,
    title: 'Section 2: Newport Beach to Laguna Beach',
    segments: [
      {
        segment: '[TEST 2]OC01',
        segmentName: '[TEST 2]Seal Beach (1st St. - North End Anaheim Bay)',
        distance: 1.6,
      },
      {
        segment: '[TEST 2]OC02',
        segmentName: '[TEST 2]Surfside (South of Anaheim Bay to 19th Street)',
        distance: 1.8,
      },
      {
        segment: '[TEST 2]OC03',
        segmentName: '[TEST 2]Sunset Beach (19th Street to Warner Avenue)',
        distance: 1.3,
      },
    ],
  },
];

const SectionPage = () => {
  return (
    <>
      {sectionsData.map(sectionObj => {
        return (
          <>
            <Box h="25px" />
            <Section key={sectionObj.id} title={sectionObj.title} segments={sectionObj.segments} />
          </>
        );
      })}
    </>
  );
};

export default SectionPage;
