'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
  statusCode?: number;
  message?: string;
  messageSubtitle?: string;
  details?: string;
}

const ErrorPage = ({
  statusCode = 404,
  message = 'Page Not Found',
  messageSubtitle = "The page you're looking for does not seem to exist.",
  details,
}: ErrorPageProps) => {
  const router = useRouter();

  return (
    <div className="container px-80">
      <Card className="flex flex-1 flex-col items-center justify-center bg-primary px-6 py-10 text-center shadow-lg">
        <CardHeader className="text-4xl font-bold text-primary-foreground">
          {statusCode}
        </CardHeader>
        <CardContent>
          <div className="mb-2 mt-3 flex flex-1 items-center justify-center text-2xl text-primary-foreground">
            {message}
          </div>
          <div className="mb-6 flex flex-1 items-center justify-center text-gray-200">
            {messageSubtitle}
          </div>
          {details && (
            <div className="mb-6 flex flex-1 items-center justify-center italic text-gray-200">
              {details}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="px-4 py-2"
            onClick={() => router.push('/')}
            variant="outline"
          >
            Go to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorPage;
