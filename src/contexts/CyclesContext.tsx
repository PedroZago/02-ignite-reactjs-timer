import React, { ReactNode, createContext, useContext, useState } from 'react';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
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
  updateCycles: (newCycle: Cycle) => void;

  activeCycleId: string | null;
  updateActiveCycleId: (newCycleId: string) => void;

  amountSecondsPassed: number;
  updateAmountSecondsPassed: (secondsPassed: number) => void;
}

const CyclesContext = createContext({} as CyclesContextProps);

export const CyclesProvider: React.FC<CyclesProviderProps> = ({ children }) => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const markCurrentCycleAsFinished = () => {
    setCycles(oldState =>
      oldState.map(cycle =>
        cycle.id === activeCycleId
          ? { ...cycle, finishedDate: new Date() }
          : cycle
      )
    );
  };

  const markCurrentCycleAsInterrupted = () => {
    setCycles(oldState =>
      oldState.map(cycle =>
        cycle.id === activeCycleId
          ? { ...cycle, interruptedDate: new Date() }
          : cycle
      )
    );
    setActiveCycleId(null);
  };

  const updateCycles = (newCycle: Cycle) => {
    setCycles(oldState => [...oldState, newCycle]);
  };

  const updateActiveCycleId = (newCycleId: string) => {
    setActiveCycleId(newCycleId);
  };

  const updateAmountSecondsPassed = (secondsPassed: number) => {
    setAmountSecondsPassed(secondsPassed);
  };

  const createNewCycle = (data: CreateCycleData) => {
    const id = new Date().getTime().toString();

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    updateCycles(newCycle);
    updateActiveCycleId(id);
    updateAmountSecondsPassed(0);

    // reset();
  };

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,

        createNewCycle,
        markCurrentCycleAsFinished,
        markCurrentCycleAsInterrupted,

        cycles,
        updateCycles,

        activeCycleId,
        updateActiveCycleId,

        amountSecondsPassed,
        updateAmountSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export const useCycles = () => {
  return useContext(CyclesContext);
};
