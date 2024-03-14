import MDEditor from '@uiw/react-md-editor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PresentType } from '@/types/TimeLine/present.type';
import { MarkdownAtom } from '@/stores/TimeLine/present';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import FormData from '@/components/FormField';
import DateTimePicker from '@/components/DateTimePicker';
import { onImagePasted } from '@/lib/markdown';
import { AuthAtom } from '@/stores/auth.store';
import { useUpdatePresent } from '@/hooks/TimeLine/usePresent';
import { Button } from '@/components/ui/button';

type TimeLinePresentTemplateProps = {
  data: PresentType;
};

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export default function TimeLinePresentTemplate(props: TimeLinePresentTemplateProps) {
  const { data } = props;
  const accessToken = useRecoilValue(AuthAtom);
  const [content, setContent] = useRecoilState(MarkdownAtom);

  const { updatePresent, isUpdating } = useUpdatePresent();
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updatePresent(data);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      startTime: data.startTime ?? '',
      endTime: data.endTime ?? '',
      title: data.title ?? '',
      content: data.content ?? '',
    },
  });

  return (
    <div className="flex h-full flex-1 flex-col">
      <Form {...form}>
        <form className="flex h-full flex-1 flex-col" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-x-4 p-4 md:py-8">
            <FormData className="flex-1" form={form} name="title" placeholder="제목" title="제목" />
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
          <div className="mx-4 flex justify-end gap-x-4 px-4 md:gap-x-12">
            <Button
              type="submit"
              className="bg-secondary text-secondary-foreground content-center p-2  md:p-4 md:text-xl lg:text-2xl"
              disabled={isUpdating}
            >
              임시 저장
            </Button>
          </div>
          <div className="flex max-h-full w-full flex-1 overflow-auto p-4">
            <MDEditor
              className="flex w-full flex-1 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ol]:list-decimal [&_ul]:list-disc"
              height="100%"
              value={content}
              onChange={(value) => {
                setContent(value as string);
                form.setValue('content', value as string);
              }}
              onPaste={async (event) => {
                await onImagePasted(
                  event,
                  event.clipboardData,
                  'time',
                  accessToken,
                  `${form.getValues('startTime')}`,
                  setContent,
                );
              }}
              onDrop={async (event) => {
                await onImagePasted(
                  event,
                  event.dataTransfer,
                  'time',
                  accessToken,
                  `${form.getValues('startTime')}`,
                  setContent,
                );
              }}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
