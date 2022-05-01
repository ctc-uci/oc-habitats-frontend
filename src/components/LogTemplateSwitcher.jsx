import { React } from 'react';
import AdditionalSpeciesTab from './MonitorLog/AdditionalSpeciesTab';
import GeneralInfoTab from './MonitorLog/GeneralInfoTab';
import HumanActivity from './MonitorLog/HumanActivityTab';
import ListedSpeciesTab from './MonitorLog/ListedSpeciesTab';
import PredatorsTab from './MonitorLog/PredatorsTab';

const switcher = {
  general: <GeneralInfoTab isTemplate />,
  'listed-species': <ListedSpeciesTab isTemplate />,
  'non-listed': <AdditionalSpeciesTab isTemplate />,
  predator: <PredatorsTab isTemplate />,
  'human-activity': <HumanActivity isTemplate />,
};

const LogTemplateSwitcher = ({ type }) => {
  return switcher[type];
};

export default LogTemplateSwitcher;
