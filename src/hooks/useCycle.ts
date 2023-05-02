import { useContext } from 'react';

import { CyclesContext } from '../contexts/CyclesContext';

export const useCycles = () => {
  return useContext(CyclesContext);
};
