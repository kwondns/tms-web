import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthImage from '@/components/AuthImage';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useAuth } from '@/hooks/useAuth';

const formSchema = z.object({
  username: z.string().min(2, { message: '2글자 이상 입력!' }),
  password: z.string().min(8, { message: '8글자 이상 입력!' }),
});

export default function AuthTemplate() {
  const { auth, isPending } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', password: '' },
    disabled: isPending,
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    auth(data);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="fle x-1 w-full max-w-[80vw] p-12">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="flex justify-center">
            <AuthImage />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="flex w-full items-center px-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="사용자 입력" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="username"
                />
                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="암호 입력" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="password"
                />
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <p className="text-right text-xs text-slate-600">&copy; Kwondns 2024</p>
              </form>
            </Form>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </div>
  );
}
