import { differenceInSeconds } from 'date-fns';
import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';

import {
  addNewCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions';
import { Cycle, CyclesState, cyclesReducer } from '../reducers/cycles/reducer';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesProviderProps {
  children: ReactNode;
}

interface CyclesContextProps {
  activeCycle?: Cycle;
  createNewCycle: (data: CreateCycleData) => void;
  markCurrentCycleAsFinished: () => void;
  markCurrentCycleAsInterrupted: () => void;
  cycles: Cycle[];
  activeCycleId: string | null;
  amountSecondsPassed: number;
  updateAmountSecondsPassed: (secondsPassed: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextProps);

export const CyclesProvider: React.FC<CyclesProviderProps> = ({ children }) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    } as CyclesState,
    initialState => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0'
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState;
    }
  );

  const { activeCycleId, cycles } = cyclesState;
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  const markCurrentCycleAsFinished = () => dispatch(finishCurrentCycleAction());

  const markCurrentCycleAsInterrupted = () =>
    dispatch(interruptCurrentCycleAction());

  const updateAmountSecondsPassed = (secondsPassed: number) =>
    setAmountSecondsPassed(secondsPassed);

  const createNewCycle = (data: CreateCycleData) => {
    const id = new Date().getTime().toString();

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    updateAmountSecondsPassed(0);
  };

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        createNewCycle,
        markCurrentCycleAsFinished,
        markCurrentCycleAsInterrupted,
        cycles,
        activeCycleId,
        amountSecondsPassed,
        updateAmountSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
