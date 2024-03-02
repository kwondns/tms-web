import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCreateStack } from '@/hooks/PortFolio/useStack';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormData from '@/components/FormField';

const formSchema = z.object({
  img: z.instanceof(File),
  url: z.string(),
  name: z.string().min(2, { message: '2글자 이상 입력!' }),
  category: z.string(),
  tech: z.enum(['front', 'back', 'etc']),
});

export default function StackCreate() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { createStack, isPending } = useCreateStack();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: '', name: '', category: '', tech: 'front' },
    disabled: isPending,
  });
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
    createStack(data);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full" variant="outline">
          추가
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Stack</SheetTitle>
          <SheetDescription>스택을 추가합니다.</SheetDescription>
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
            <FormData form={form} name="URL" placeholder="공식 홈페이지 주소" title="url" />
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
            <FormData form={form} name="category" placeholder="EX) Design, Server Infra" title="Category" />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" className="w-full">
                  생성하기
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
StackCreate.defaultProps = { isEdit: false };
