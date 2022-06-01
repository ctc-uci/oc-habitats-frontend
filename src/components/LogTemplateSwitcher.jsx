import { React, useEffect, useState } from 'react';
import { OCHBackend } from '../common/utils';
import AdditionalSpeciesTab from './MonitorLog/AdditionalSpeciesTab';
import GeneralInfoTab from './MonitorLog/GeneralInfoTab';
import HumanActivity from './MonitorLog/HumanActivityTab';
import ListedSpeciesTab from './MonitorLog/ListedSpeciesTab';
import PredatorsTab from './MonitorLog/PredatorsTab';

const LogTemplateSwitcher = ({ type }) => {
  const [predators, setPredators] = useState([]);
  useEffect(async () => {
    const res = await OCHBackend.get('species', { withCredentials: true });
    setPredators(
      res.data
        .filter(s => s.isPredator && (!s.isListed || s.isNeither))
        .map(s => ({
          name: s.name,
          _id: s._id,
        })),
    );
  }, []);
  const switcher = {
    general: <GeneralInfoTab isTemplate />,
    'listed-species': <ListedSpeciesTab isTemplate />,
    'non-listed': <AdditionalSpeciesTab isTemplate />,
    predator: <PredatorsTab isTemplate predators={predators} />,
    'human-activity': <HumanActivity isTemplate />,
  };
  return switcher[type];
};

export default LogTemplateSwitcher;
