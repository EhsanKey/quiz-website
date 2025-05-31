import { Button } from '@/components/ui/button';
import TrashIcon from '@/components/icons/trash-icon';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, Path } from 'react-hook-form';
import { EditQuestionSchemaType } from '../schema';
import { useAsyncRequest } from '@/app/hook/useAsyncRequest';
import { deleteAnswer } from '@/apis/services/answers/_services';
import customRevalidatePath from '@/utils/revalidatePath';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

type AnswerInputFieldProps = {
  control: Control<EditQuestionSchemaType>;
  name: Path<EditQuestionSchemaType>;
  onRemove?: () => void;
  disabledRemove?: boolean;
  answerId?: number | null;
};

const AnswerInputField = ({
  control,
  name,
  onRemove,
  disabledRemove = false,
  answerId = null,
}: AnswerInputFieldProps) => {
  const {
    execute: executeDeleteAnswer,
    loading: loadingDeleteAnswer,
    error,
  } = useAsyncRequest(deleteAnswer);
  const pathname = usePathname();

  const handleRemoveClick = async () => {
    if (answerId) {
      await executeDeleteAnswer(answerId);
      await customRevalidatePath('/dashboard');
      if (error) return toast.error('Failed to delete answer. Please try again.');
      toast.success('Answer deleted successfully.');
      customRevalidatePath(pathname);
    }
    onRemove?.();
  };

  const formatValue = (val: unknown) => {
    return typeof val === 'string' || typeof val === 'number' ? val : '';
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex gap-4 items-center">
            <FormControl>
              <Input {...field} data-error={!!fieldState.error} value={formatValue(field.value)} />
            </FormControl>

            <Button
              variant="ghost"
              size="icon"
              className="p-0"
              type="button"
              onClick={handleRemoveClick}
              disabled={loadingDeleteAnswer || disabledRemove}
            >
              <TrashIcon />
            </Button>
          </div>
        </FormItem>
      )}
    />
  );
};

export default AnswerInputField;
