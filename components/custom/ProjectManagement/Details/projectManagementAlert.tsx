"use client"
import * as React from 'react';
import { cn } from '@/lib/utils';
import { FilledCircleWarning } from '@/components/icons';
import { useRouter } from 'next/navigation';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  alertID?: string;
  projectID?: string;
}

const ProjectManagementAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, content, alertID, projectID, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [shouldRender, setShouldRender] = React.useState(true);
    const router = useRouter();

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 500);
    };

    if (!shouldRender) {
      return null;
    }

    const handleViewAlerts = () => {
      router.push(`/project-management/details/${projectID}/alerts`);
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between mb-4 py-2 px-4 border border-yellow-400 rounded-sm bg-yellow-50 transition-opacity duration-500',
          isVisible ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <FilledCircleWarning fill="#FFA500" />
          <span className="text-sm">{content}</span>
        </div>
        <div className="space-x-2">
          <button className="border-r border-gray-600 pr-2 text-sm text-gray-600 hover:text-gray-800">
            Raise issue
          </button>
          <button onClick={handleClose} className="border-r border-gray-600 pr-2 text-sm text-gray-600 hover:text-gray-800">
            Ignore
          </button>
          <button onClick={handleViewAlerts} className="pr-4 text-sm text-gray-600 hover:text-gray-800">
            View alerts
          </button>
          <button onClick={handleClose} className="text-base text-gray-600 hover:text-gray-800">
            X
          </button>
        </div>
      </div>
    );
  }
);
ProjectManagementAlert.displayName = 'ProjectManagementAlert';

export { ProjectManagementAlert };