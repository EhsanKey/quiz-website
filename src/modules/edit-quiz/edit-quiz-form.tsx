'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

import AnswerGroup from './components/answer-group';
import FormActions from './components/form-actions';
import { EditQuestionSchemaType, editQuestionSchema } from './schema';
import { Textarea } from '@/components/ui/textarea';
import { useAsyncRequest } from '@/app/hook/useAsyncRequest';
import { updateQuestionWithAnswers } from '@/apis/services/question/_services';
import { IQuestion } from '@/models/question';
import { use, useEffect, useRef, useState } from 'react';

import AnswerInputField from './components/AnswerInputField';
import customRevalidatePath from '@/utils/revalidatePath';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';

type EditQuizFormProps = {
  questionsPromise: Promise<IQuestion>;
};

const EditQuizForm = ({ questionsPromise }: EditQuizFormProps) => {
  const { execute, loading, error } = useAsyncRequest(updateQuestionWithAnswers);

  const questions = use(questionsPromise);
  const router = useRouter();

  const [disabledActions, setDisabledActions] = useState({
    disableAdd: false,
    disableRemove: false,
  });

  const defaultValues: EditQuestionSchemaType = {
    question: questions.question,
    correctAnswer: { value: '', answerId: 0 },
    incorrectAnswers: [{ value: '', answerId: 0 }],
  };

  if (questions.answers && questions.answers.length > 0) {
    const correct = questions.answers.find((a) => a.isCorrect);
    const incorrect = questions.answers.filter((a) => !a.isCorrect);

    defaultValues.correctAnswer = correct
      ? { value: correct.answerText, answerId: correct.id }
      : { value: '', answerId: 0 };

    defaultValues.incorrectAnswers = incorrect.map((ans) => ({
      value: ans.answerText,
      answerId: ans.id,
    }));
  }

  const initialValuesRef = useRef<EditQuestionSchemaType>(defaultValues);

  const form = useForm<EditQuestionSchemaType>({
    resolver: zodResolver(editQuestionSchema),
    defaultValues,
  });

  const { control, handleSubmit, getValues, watch } = form;

  useEffect(() => {
    const incorrectAnswers = getValues('incorrectAnswers');
    console.log('incorrectAnswers: ', incorrectAnswers);

    if (incorrectAnswers.length === 3) {
      setDisabledActions({ disableAdd: true, disableRemove: false });
    } else if (incorrectAnswers.length === 1) {
      setDisabledActions({ disableAdd: false, disableRemove: true });
    } else {
      setDisabledActions({ disableAdd: false, disableRemove: false });
    }
  }, [watch('incorrectAnswers')]);

  const incorrectAnswersArray = useFieldArray({
    control,
    name: 'incorrectAnswers',
  });

  const findChangedFields = (initial: EditQuestionSchemaType, current: EditQuestionSchemaType) => {
    const changedFields: string[] = [];

    if (initial.question !== current.question) {
      changedFields.push('question');
    }

    if (initial.correctAnswer.value !== current.correctAnswer.value) {
      changedFields.push('correctAnswer.value');
    }

    current.incorrectAnswers.forEach((ans, idx) => {
      if (JSON.stringify(ans) !== JSON.stringify(initial.incorrectAnswers[idx])) {
        changedFields.push(`incorrectAnswers[${idx}]`);
      }
    });

    return changedFields;
  };

  const onSubmit = async (values: EditQuestionSchemaType) => {
    const changedFields = findChangedFields(initialValuesRef.current, values);

    await execute({
      id: questions.id,
      values,
      changedFields,
    });

    if (error) return toast.error('Failed to update question. Please try again.');

    await customRevalidatePath('/dashboard');
    await customRevalidatePath(`/dashboard/edit-quiz/${questions.id}`);
    toast.success('Question updated successfully!');
    router.push('/dashboard');
  };

  const handleAddAnswerItem = () => {
    incorrectAnswersArray.append({ value: '', isNew: true });
  };

  const handleRemoveAnswerItem = (index: number) => {
    incorrectAnswersArray.remove(index);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-9 lg:space-y-6">
        <FormField
          control={control}
          name="question"
          render={({ field, fieldState }) => (
            <FormItem className="pt-3 flex flex-col gap-4">
              <FormLabel className="text-sm font-semibold md:text-[22px]">Question</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  data-error={!!fieldState.error}
                  placeholder="Enter your Question Here ....."
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <div>
            <Label className="text-sm font-semibold md:text-[22px]">Answers</Label>
            <span className="font-montserrat text-xs font-normal md:text-sm text-tertiary">
              Fill Correct Answers & Incorrect Answers .
            </span>
          </div>
          <AnswerGroup type="correct">
            <AnswerInputField control={control} name="correctAnswer.value" disabledRemove={true} />
          </AnswerGroup>

          <AnswerGroup
            type="incorrect"
            handleAddAnswerItem={handleAddAnswerItem}
            disableAdd={disabledActions.disableAdd}
          >
            {incorrectAnswersArray.fields.map((item, index) => {
              const incorrectAnswers = getValues('incorrectAnswers');
              const nonNewAnswers = incorrectAnswers.filter((a) => !a.isNew);
              const isNew = item.isNew;
              const canDelete = isNew || nonNewAnswers.length > 1;

              return (
                <AnswerInputField
                  key={index}
                  control={control}
                  name={`incorrectAnswers.${index}.value`}
                  onRemove={() => handleRemoveAnswerItem(index)}
                  disabledRemove={!canDelete || disabledActions.disableRemove}
                  answerId={getValues(`incorrectAnswers.${index}.answerId`) || null}
                />
              );
            })}
          </AnswerGroup>
        </div>

        <FormActions loading={loading} />
      </form>
    </Form>
  );
};

export default EditQuizForm;
