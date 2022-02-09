import { React } from 'react';
import { VStack } from '@chakra-ui/react';
import App from '../components/Table/Table';

//  const data = React.useMemo(() => makeRows, []);
const PeoplePage = () => {
  return (
    <VStack spacing="72px" align="left">
      <App />
    </VStack>
  );
};
export default PeoplePage;
