import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Switch } from '@/components/ui/switch';
import React from 'react';

const NewQuizHeader = () => {
  return (
    <div className="flex justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Quiz Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New Quiz</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 justify-end">
          <span className="font-medium text-base font-montserrat text-primary">Status</span>
          <Switch className="bg-negative data-[state=checked]:bg-positive-dark" />
        </div>
        <span className="font-normal text-[8px] font-montserrat text-tertiary">
          Your post will be saved as a public
        </span>
      </div>
    </div>
  );
};

export default NewQuizHeader;
