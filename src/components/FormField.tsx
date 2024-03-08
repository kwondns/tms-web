import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormFieldProps = {
  className?: string;
  form: UseFormReturn<any>;
  title: string;
  placeholder: string;
  name: string;
};
export default function FormData(props: FormFieldProps) {
  const { className = '', form, title, placeholder, name } = props;
  return (
    <FormField
      control={form.control}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      name={name}
    />
  );
}

FormData.defaultProps = { className: '' };
