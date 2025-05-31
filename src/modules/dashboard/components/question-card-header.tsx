import { deleteQuestion } from '@/apis/services/question/_services';
import { useAsyncRequest } from '@/app/hook/useAsyncRequest';
import MenuDotsIcon from '@/components/icons/menu-dots-icon';
import { Button, buttonVariants } from '@/components/ui/button';
import Chip from '@/components/ui/chip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import customRevalidatePath from '@/utils/revalidatePath';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

type QuizCardHeaderProps = {
  quizId: number;
  quizDate: string;
  quizTitle?: string;
};

const QuizCardHeader = ({ quizId, quizDate, quizTitle }: QuizCardHeaderProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { execute: handleDelete, loading, error } = useAsyncRequest(deleteQuestion);

  const handleDeleteClick = async () => {
    await handleDelete(quizId);
    if (error) return toast.error('Failed to delete question. Please try again.');
    setOpenModal(false);
    toast.success('Question deleted successfully.');
    await customRevalidatePath('/dashboard');
  };

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center text-tertiary font-normal text-xs gap-2">
        <span>John Doe</span>
        <span className="text-xl leading-none">•</span>
        <span>{quizDate}</span>
      </div>
      <div className="flex items-center gap-1 ">
        <Chip variant="positive">Publish</Chip>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuDotsIcon className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                className={buttonVariants({ className: 'w-full' })}
                href={`/dashboard/edit-quiz/${quizId}`}
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant="outline"
                className="border-negative text-negative"
                onClick={() => setOpenModal(true)}
              >
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader className="gap-4 md:gap-6">
            <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
              <DialogTitle className="font-medium text-base">
                <span className="text-negative">Delete</span> : {quizTitle} ?
              </DialogTitle>

              <DialogDescription className="font-normal text-sm leading-6">
                Are you sure you want to delete [<span className="text-negative">{quizTitle}</span>]
                ?
              </DialogDescription>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-normal text-base">Reason</Label>
              <Textarea placeholder="Write a reason" />
            </div>

            <DialogFooter className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                className="border-primary text-foreground"
                onClick={() => setOpenModal(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                className="bg-negative text-light"
                onClick={handleDeleteClick}
                disabled={loading}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default QuizCardHeader;
