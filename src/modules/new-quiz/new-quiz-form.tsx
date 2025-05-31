'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAsyncRequest } from '@/app/hook/useAsyncRequest';
import { createQuestionWithAnswers } from '@/apis/services/question/_services';
import { useRouter } from 'next/navigation';

import AnswerGroup from './components/answer-group';
import FormActions from './components/form-actions';
import AnswerInputField from './components/answer-input-field';

import { NewQuestionSchemaType, newQuestionSchema } from './schema';
import customRevalidatePath from '@/utils/revalidatePath';
import { Label } from '@radix-ui/react-dropdown-menu';
import { toast } from 'react-toastify';

const NewQuizForm: React.FC = () => {
  const router = useRouter();
  const { execute, error, loading } = useAsyncRequest(createQuestionWithAnswers);

  const [disabledActions, setDisabledActions] = useState({
    disableAdd: false,
    disableRemove: false,
  });

  const form = useForm<NewQuestionSchemaType>({
    resolver: zodResolver(newQuestionSchema),
    defaultValues: {
      question: '',
      correctAnswer: '',
      incorrectAnswers: [{ value: '' }],
    },
  });

  const { control, getValues, handleSubmit, watch } = form;

  useEffect(() => {
    const incorrectAnswers = getValues('incorrectAnswers');

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

  const onSubmit = async (values: NewQuestionSchemaType) => {
    await execute(values);
    if (error) return toast.error('Failed to create question. Please try again.');

    toast.success('Question created successfully.');
    await customRevalidatePath('/dashboard');
    router.push('/dashboard');
  };

  const handleAddAnswerItem = () => {
    const currentList = getValues('incorrectAnswers');
    if (currentList.length === 3) return;
    incorrectAnswersArray.append({ value: '' });
  };

  const handleRemoveAnswerItem = (index: number) => {
    const currentList = getValues('incorrectAnswers');
    if (currentList.length === 0) return;
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
            <AnswerInputField control={control} name="correctAnswer" disabledRemove={true} />
          </AnswerGroup>

          <AnswerGroup
            type="incorrect"
            handleAddAnswerItem={handleAddAnswerItem}
            disableAdd={disabledActions.disableAdd}
          >
            {incorrectAnswersArray.fields.map((item, index) => (
              <AnswerInputField
                key={item.id}
                control={control}
                name={`incorrectAnswers.${index}.value`}
                disabledRemove={disabledActions.disableRemove}
                onRemove={() => handleRemoveAnswerItem(index)}
              />
            ))}
          </AnswerGroup>
        </div>

        <FormActions loading={loading} />
      </form>
    </Form>
  );
};

export default NewQuizForm;
