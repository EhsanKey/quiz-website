import AddIcon from '@/components/icons/add-icon';
import { Button } from '@/components/ui/button';
import React, { ReactNode } from 'react';

type AnswerGroupProps = {
  type: 'correct' | 'incorrect';
  children: ReactNode;
  handleAddAnswerItem?: () => void;
  disableAdd?: boolean;
};

const AnswerGroup = ({
  type,
  children,
  handleAddAnswerItem,
  disableAdd = false,
}: AnswerGroupProps) => {
  const isCorrect = type === 'correct';
  const borderColor = isCorrect ? 'border-l-[#3698D4]' : 'border-l-negative';
  const labelText = isCorrect ? 'Correct Answer' : 'Incorrect Answer';

  const onAddClick = () => {
    if (handleAddAnswerItem) {
      handleAddAnswerItem();
    }
  };

  return (
    <div
      className={`
        flex flex-col gap-4 border py-5 px-4 border-l-4 rounded-2 border-primary ${borderColor}
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-brand">{labelText}</span>

        <Button
          variant="outline"
          className="border-dashed border-secondary text-sm font-normal text-tertiary gap-1"
          disabled={isCorrect || disableAdd}
          onClick={onAddClick}
          type="button"
        >
          <AddIcon />
          Add
        </Button>
      </div>

      {children}
    </div>
  );
};

export default AnswerGroup;
