import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IAnswer, IQuestion } from '@/models/question';
import { UseFormReturn } from 'react-hook-form';
import { AnswerSchemaType } from '../schema';
import { Separator } from '@/components/ui/separator';

type QuestionFormProps = {
  form: UseFormReturn<AnswerSchemaType>;
  question: IQuestion;
  onSubmit: (data: IAnswer) => void;
};

const QuestionForm = ({ form, question, onSubmit }: QuestionFormProps) => {
  const handleSubmit = (data: AnswerSchemaType) => {
    const selectedAnswer = question.answers.find((answer) => answer.id.toString() === data.answer);

    if (selectedAnswer) {
      onSubmit(selectedAnswer);
    } else {
      console.error('Selected answer not found');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="answer"
          render={({ field, fieldState }) => (
            <FormItem className="gap-5">
              <FormLabel className="font-semibold text-base md:text-lg text-primary">
                {question.question}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  className="gap-4"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {question.answers.map((answer) => (
                    <FormItem className="flex items-center gap-2" key={answer.id}>
                      <FormControl>
                        <RadioGroupItem
                          value={answer.id.toString()}
                          id={`option-${answer.id}`}
                          data-error={fieldState.error ? true : false}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={`option-${answer.id}`}
                        className="font-normal text-sm md:text-base text-secondary"
                      >
                        {answer.answerText}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />
        <Button type="submit" className="mt-3">
          Submit answer
        </Button>
      </form>
    </Form>
  );
};
export default QuestionForm;
