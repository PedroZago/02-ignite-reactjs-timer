import { Cycle } from './reducer';

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
}

interface AddNewCycleActionProps {
  type: ActionTypes.ADD_NEW_CYCLE;
  payload: { newCycle: Cycle };
}

interface FinishCurrentCycleActionProps {
  type: ActionTypes.FINISH_CURRENT_CYCLE;
}

interface InterruptCurrentCycleActionProps {
  type: ActionTypes.INTERRUPT_CURRENT_CYCLE;
}

export type ActionsProp =
  | AddNewCycleActionProps
  | FinishCurrentCycleActionProps
  | InterruptCurrentCycleActionProps;

export const addNewCycleAction = (newCycle: Cycle): AddNewCycleActionProps => {
  return { type: ActionTypes.ADD_NEW_CYCLE, payload: { newCycle } };
};

export const interruptCurrentCycleAction =
  (): InterruptCurrentCycleActionProps => {
    return { type: ActionTypes.INTERRUPT_CURRENT_CYCLE };
  };

export const finishCurrentCycleAction = (): FinishCurrentCycleActionProps => {
  return { type: ActionTypes.FINISH_CURRENT_CYCLE };
};
