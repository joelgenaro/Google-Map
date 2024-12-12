import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Edit, LoaderCircleIcon, PlusCircle, Trash2 } from 'lucide-react';

interface ProjectActionsProps {
  onRegister: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isLoading: boolean
}

const ProjectActionsCard = ({
  onRegister,
  onEdit,
  onDelete,
  isLoading
}: ProjectActionsProps) => {
  return (
    <Card className="w-full self-start rounded-lg shadow-lg lg:w-1/6">
      <CardHeader className="rounded-t-lg bg-primary p-4 text-lg font-semibold text-white">
        Project Actions
      </CardHeader>
      <CardContent className="flex flex-row justify-around gap-4 p-4 lg:flex-col">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="flex flex-1 items-center justify-center rounded-lg"
                onClick={onRegister}
                variant="default"
                disabled={isLoading}
              >
                {
                  isLoading ? (
                    <>
                      <LoaderCircleIcon className="mr-2 h-6 w-6 animate-spin" />
                      <span>Requesting ...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-6 w-6" />
                      Request Report
                    </>
                  )
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent className="flex items-center justify-center">
              Request a Report
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="flex flex-1 items-center justify-center rounded-lg"
                onClick={onEdit}
                variant="secondary"
              >
                <Edit className="mr-2 h-6 w-6" />
                Edit
              </Button>
            </TooltipTrigger>
            <TooltipContent className="flex items-center justify-center">
              Edit this Project
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="flex flex-1 items-center justify-center rounded-lg p-2"
                onClick={onDelete}
                variant="destructive"
              >
                <Trash2 className="mr-2 h-6 w-6" />
                Delete
              </Button>
            </TooltipTrigger>
            <TooltipContent className="flex items-center justify-center">
              Delete this Project
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default ProjectActionsCard;
