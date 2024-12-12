import * as React from 'react';

import { cn } from '@/lib/utils';
import { CarbonMethodOptions } from '@/lib/constants';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  projectTitle?: string;
  location?: string;
  propertySize?: string;
  projectType?: Array<string>;
}

const ProjectManagementHeader = React.forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      className,
      title,
      projectTitle,
      location,
      propertySize,
      projectType,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'space-y-8 py-4',
        className
      )}
      {...props}
    >
      <div className="flex justify-between border-b-2 border-gray-600 pb-2 ml-8">
        <div className="flex gap-4">
          <h5>{projectTitle}</h5>
          <span className='text-sm text-gray-400'>{location}</span>
        </div>
        {propertySize && <span>Property size {propertySize}</span>}
        <div className='flex gap-4 justify-center items-center'>
          {projectType?.map((type, index) => {
            // Find the corresponding option for the current project type
            const option = CarbonMethodOptions.find(
              (option) => option.title === type
            );

            // If an option was found, render its icon, otherwise render the project type
            return <div key={index}>{option ? <option.icon /> : type}</div>;
          })}
        </div>
      </div>
      <div>
        <h4 className='font-semibold text-2xl text-airseed-dark-blue'>{title}</h4>
      </div>
    </div>
  )
);
ProjectManagementHeader.displayName = 'ProjectManagementHeader';

export { ProjectManagementHeader };
