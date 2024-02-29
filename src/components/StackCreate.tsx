import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

const formSchema = z.object({
  img: z.string(),
  url: z.string(),
  name: z.string().min(2, { message: '2글자 이상 입력!' }),
  category: z.string(),
  tech: z.enum(['front', 'back', 'etc']),
});
// TODO
export default function StackCreate() {
  const { createStack, isPending } = useCreateStack();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { img: '', url: '', name: '', category: '', tech: 'front' },
    disabled: isPending,
  });
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
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="EX) React.JS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="name"
            />
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="공식 홈페이지 주소" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="url"
            />
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" placeholder="이미지 등록" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="img"
            />
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>category</FormLabel>
                  <FormControl>
                    <Input placeholder="EX) Design, Server Infra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="category"
            />

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

// <div className="grid gap-4 py-4">
//   <div className="grid grid-cols-4 items-center gap-4">
//     <Label htmlFor="name" className="text-right">
//       Name
//     </Label>
//     <Input id="name" value="Pedro Duarte" className="col-span-3" />
//   </div>
//   <div className="grid grid-cols-4 items-center gap-4">
//     <Label htmlFor="username" className="text-right">
//       Username
//     </Label>
//     <Input id="username" value="@peduarte" className="col-span-3" />
//   </div>
// </div>
