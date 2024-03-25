import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCreateStack, useDeleteStack, useUpdateStack } from '@/hooks/PortFolio/useStack';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormData from '@/components/FormField';
import StackStore from '@/stores/PortFolio/stack.store';

const formSchema = z.object({
  img: z.union([z.instanceof(File), z.string()]),
  url: z.string(),
  name: z.string().min(2, { message: '2글자 이상 입력!' }),
  category: z.string(),
  tech: z.enum(['front', 'back', 'etc']),
  recent: z.boolean(),
});

export default function StackUpdate() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const selectStack = useRecoilValue(StackStore);
  const { createStack, isCreating } = useCreateStack();
  const { updateStack, isUpdating } = useUpdateStack();
  const { deleteStack, isDeleting } = useDeleteStack();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: '', name: '', category: '', tech: 'front', recent: true },
    disabled: isCreating || isUpdating || isDeleting,
  });
  useEffect(() => {
    form.setValue('img', selectStack?.img ?? '');
    form.setValue('url', selectStack?.url ?? '');
    form.setValue('name', selectStack?.name ?? '');
    form.setValue('category', selectStack?.category ?? '');
    form.setValue('tech', selectStack?.tech ?? 'front');
    form.setValue('recent', selectStack?.recent ?? true);
  }, [selectStack]);
  const onChangeUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { files } = event.currentTarget;
    if (files) {
      const image = files[0];
      try {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          if (reader.result) {
            const result = reader.result as string;
            setPreviewImage(result);
            form.setValue('img', image);
          }
        };
      } catch (error) {
        toast('이미지 생성 실패!', { type: 'error', autoClose: 1000 });
      }
    }
  };
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (selectStack) {
      const payload = { ...data, img: data.img as string };
      updateStack(payload);
    } else {
      const payload = { ...data, img: data.img as File };
      createStack(payload);
    }
  };

  const onClickDelete = () => {
    const payload = form.getValues();
    deleteStack({ ...payload, img: payload.img as string });
  };
  return (
    <>
      <SheetTrigger asChild>
        <Button className="w-full" variant="outline">
          추가
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Stack</SheetTitle>
          <SheetDescription>스택을 변경합니다.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 w-full space-y-4">
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-1">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="front" />
                        </FormControl>
                        <FormLabel className="font-normal">Front</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="back" />
                        </FormControl>
                        <FormLabel className="font-normal">Back</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="etc" />
                        </FormControl>
                        <FormLabel className="font-normal">ETC</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="tech"
            />
            <FormData form={form} name="name" placeholder="EX) React.JS" title="Name" />
            <FormData form={form} name="url" placeholder="공식 홈페이지 주소" title="URL" />
            <FormField
              control={form.control}
              render={({ field: { value, onChange, ...others } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" placeholder="이미지 등록" {...others} onChange={onChangeUploadFile} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="img"
            />
            {previewImage && <img src={previewImage} alt="preview" />}
            <FormField
              control={form.control}
              render={({ field: { value, ...others } }) => (
                <FormItem>
                  <FormLabel>최근 사용</FormLabel>
                  <FormControl>
                    <Input type="checkbox" defaultChecked={value} {...others} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="recent"
            />
            <FormData form={form} name="category" placeholder="EX) Design, Server Infra" title="Category" />
            <SheetFooter>
              <Button type="submit" className="w-full">
                적용하기
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={onClickDelete}
                disabled={!selectStack || isDeleting}
              >
                삭제하기
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </>
  );
}
