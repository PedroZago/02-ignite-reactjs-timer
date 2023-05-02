import React from 'react';
import { useFormContext } from 'react-hook-form';

import { NewCycleFormData } from '../..';
import { useCycles } from '../../../../contexts/CyclesContext';
import * as S from './styles';

export const NewCycleForm = () => {
  const { activeCycle } = useCycles();
  const { register } = useFormContext<NewCycleFormData>();

  return (
    <S.FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <S.TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        {...register('task', { disabled: !!activeCycle })}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Banana" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <S.MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        {...register('minutesAmount', {
          valueAsNumber: true,
          disabled: !!activeCycle,
        })}
      />

      <span>minutos.</span>
    </S.FormContainer>
  );
};
