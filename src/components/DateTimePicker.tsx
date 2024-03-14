import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ChangeEventHandler, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

type DateTimePickerProps = {
  form: UseFormReturn<any>;
  name: string;
};
export default function DateTimePicker(props: DateTimePickerProps) {
  const { form, name } = props;
  const dateTime = form.getValues(name);
  const [selected, setSelected] = useState<Date>(dateTime ? new Date(dateTime) : new Date());
  const [time, setTime] = useState(dateTime ? dateTime.split('T')[1].replace('Z', '') : '00:00');
  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTime(time);
      return;
    }
    const [hours, minutes] = time.split(':').map((str: string) => parseInt(str, 10));
    let targetDate: Date;
    if (selected) targetDate = selected;
    else targetDate = new Date();
    const newSelectedDate = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
      hours,
      minutes,
    );
    setSelected(newSelectedDate);
    const newDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), hours, minutes);
    form.setValue(name, newDate.toISOString());
    setTime(time);
  };
  const handleDaySelect = (date: Date | undefined) => {
    if (!time || !date) {
      return;
    }
    const [hours, minutes] = time.split(':').map((str: string) => parseInt(str, 10));
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
    setSelected(newDate);
    form.setValue(name, newDate.toISOString());
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={`w-full pl-3 text-left font-normal ${!form.getValues()} && 'text-muted-foreground`}
          >
            {form.getValues(name) ? format(form.getValues(name), 'Pp') : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto size-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleDaySelect}
          footer={<input className="text-gray-700" type="time" value={time} onChange={handleTimeChange} />}
        />
      </PopoverContent>
    </Popover>
  );
}
