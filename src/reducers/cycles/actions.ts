import { Cycle } from './reducer';

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
}

export const addNewCycleAction = (newCycle: Cycle) => {
  return { type: ActionTypes.ADD_NEW_CYCLE, payload: { newCycle } };
};

export const interruptCurrentCycleAction = () => {
  return { type: ActionTypes.INTERRUPT_CURRENT_CYCLE };
};

export const finishCurrentCycleAction = () => {
  return { type: ActionTypes.FINISH_CURRENT_CYCLE };
};
