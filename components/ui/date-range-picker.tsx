'use client';

import { addDays, format, parse } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { date } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  dateRange?: string;
  setDateRange?: (dateRange: string) => void;
  onDateRangeChange?: (formattedDateRange: string) => void;
}

const DatePickerWithRange = ({
  dateRange: controlledDateRange,
  setDateRange: setControlledDateRange,
  onDateRangeChange,
  className,
}: DatePickerWithRangeProps) => {
  const parseDateRange = (dateRange: string): DateRange => {
    const [fromStr, toStr] = dateRange.split(' - ');
    const from = parse(fromStr, 'LLL dd, y', new Date());
    const to = toStr ? parse(toStr, 'LLL dd, y', new Date()) : undefined;
    return { from, to };
  };

  const formatDateRange = (dateRange: DateRange): string => {
    return dateRange.from
      ? dateRange.to
        ? `${format(dateRange.from, 'LLL dd, y')} - ${format(dateRange.to, 'LLL dd, y')}`
        : format(dateRange.from, 'LLL dd, y')
      : '';
  };

  const [defaultDateRange, setDefaultDateRange] = React.useState<DateRange>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const dateRange = controlledDateRange
    ? parseDateRange(controlledDateRange)
    : defaultDateRange;

  const setDateRange = (newDateRange: DateRange | undefined) => {
    const formattedDateRange = newDateRange
      ? formatDateRange(newDateRange)
      : '';
    if (setControlledDateRange) {
      setControlledDateRange(formattedDateRange);
    } else {
      setDefaultDateRange(newDateRange || { from: new Date(), to: undefined });
    }
    if (onDateRangeChange) {
      onDateRangeChange(formattedDateRange);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y')} -{' '}
                  {format(dateRange.to, 'LLL dd, y')}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerWithRange;
