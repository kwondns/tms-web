import { useRecoilValue } from 'recoil';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { PastType } from '@/types/TimeLine/past.type';
import { dateFormat } from '@/lib/date';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { onImagePasted } from '@/lib/markdown';
import { AuthAtom } from '@/stores/auth.store';
import FormData from '@/components/FormField';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import DateTimePicker from '@/components/DateTimePicker';
import { Button } from '@/components/ui/button';
import { useUpdatePastDay } from '@/hooks/TimeLine/usePast';
import { Input } from '@/components/ui/input';

type ActivityDocumentProps = {
  activity: PastType;
  index: number;
};

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: '제목을 입력하세요' }),
  content: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export default function PastDocument(props: ActivityDocumentProps) {
  const { activity, index } = props;
  const accessToken = useRecoilValue(AuthAtom);
  const [pastDetail, setPastDetail] = useState(activity.content);
  const { updatePast, isUpdating } = useUpdatePastDay();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: activity.id,
      title: activity.title,
      content: activity.content,
      startTime: activity.startTime,
      endTime: activity.endTime,
    },
    disabled: isUpdating,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updatePast(data);
  };

  return (
    <AccordionItem value={`item-${index}`}>
      <AccordionTrigger>
        <div className="flex flex-1 justify-between">
          <span>{activity.title}</span>
          <span>{dateFormat(activity.startTime, activity.endTime)}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex size-full flex-1 flex-col space-y-4">
            <div className="flex gap-x-4">
              <Input type="hidden" name="id" value={form.getValues('id')} />
              <FormData className="flex-1" form={form} placeholder="제목입력" title="제목" name="title" />
              <FormField
                control={form.control}
                name="startTime"
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel>시작 시간</FormLabel>
                    <FormControl>
                      <DateTimePicker form={form} name="startTime" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel>종료 시간</FormLabel>
                    <FormControl>
                      <DateTimePicker form={form} name="endTime" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <MDEditor
              className="flex w-full flex-1 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ol]:list-decimal [&_ul]:list-disc"
              height="100%"
              value={pastDetail}
              onChange={(value) => {
                setPastDetail(value as string);
                form.setValue('content', value as string);
              }}
              onPaste={async (event) => {
                await onImagePasted(
                  event,
                  event.clipboardData,
                  'time',
                  accessToken,
                  `${form.getValues('startTime')}`,
                  setPastDetail,
                );
              }}
              onDrop={async (event) => {
                await onImagePasted(
                  event,
                  event.dataTransfer,
                  'time',
                  accessToken,
                  `${form.getValues('startTime')}`,
                  setPastDetail,
                );
              }}
            />
            <Button type="submit" className="bg-secondary text-secondary-foreground my-4 w-full">
              과거 수정
            </Button>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
}
