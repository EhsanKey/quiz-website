import React from 'react';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, Path } from 'react-hook-form';
import { NewQuestionSchemaType } from '../schema';
import TrashIcon from '@/components/icons/trash-icon';
import { Button } from '@/components/ui/button';

type AnswerInputFieldSimpleProps = {
  control: Control<NewQuestionSchemaType>;
  name: Path<NewQuestionSchemaType>;
  disabledRemove?: boolean;
  onRemove?: () => void;
};

const AnswerInputFieldSimple = ({
  control,
  name,
  disabledRemove = false,
  onRemove,
}: AnswerInputFieldSimpleProps) => {
  const formatValue = (val: unknown) => {
    return typeof val === 'string' || typeof val === 'number' ? val : '';
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex gap-4 items-center justify-center">
            <FormControl>
              <Input {...field} data-error={!!fieldState.error} value={formatValue(field.value)} />
            </FormControl>

            <Button
              variant="ghost"
              size="icon"
              className="p-0"
              type="button"
              onClick={onRemove}
              disabled={disabledRemove}
            >
              <TrashIcon />
            </Button>
          </div>
        </FormItem>
      )}
    />
  );
};

export default AnswerInputFieldSimple;
