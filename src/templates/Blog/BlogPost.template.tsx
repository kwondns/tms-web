import MDEditor from '@uiw/react-md-editor';
import { useRecoilValue } from 'recoil';
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import FormData from '@/components/FormField';
import { Input } from '@/components/ui/input';
import Img from '@/components/Img';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { onImagePasted } from '@/lib/markdown';
import { Button } from '@/components/ui/button';
import { AuthAtom } from '@/stores/auth.store';
import { BlogPostDetailType } from '@/types/Blog/blog.type';
import { useCreateBlogPost, useUpdateBlogPost } from '@/hooks/Blog/useBlog';

type BlogPostTemplateProps = {
  // eslint-disable-next-line react/require-default-props
  post?: BlogPostDetailType;
};

const NewPostSchema = z.object({
  category: z.string(),
  content: z.string(),
  tag: z.array(z.string()),
  preview_content: z.string(),
  preview_image: z.union([z.instanceof(File), z.string()]),
  title: z.string(),
  visible: z.boolean(),
});

const UpdatePostSchema = z.object({
  category: z.union([z.null(), z.string()]).optional(),
  content: z.union([z.string(), z.null()]).optional(),
  tag: z.array(z.string()).optional(),
  preview_content: z.string().optional(),
  preview_image: z.union([z.instanceof(File), z.string()]).optional(),
  title: z.string().optional(),
  visible: z.boolean().optional(),
});
type KeyType = keyof z.infer<typeof NewPostSchema>;
export default function BlogPostTemplate(props: BlogPostTemplateProps) {
  const { post } = props;
  const accessToken = useRecoilValue(AuthAtom);
  const [tag, setTag] = useState<string>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [inputContent, setInputContent] = useState<string>('');
  const { createPost, isCreating } = useCreateBlogPost();
  const { updatePost, isUpdating } = useUpdateBlogPost();
  const form = useForm<z.infer<typeof NewPostSchema>>({
    resolver: zodResolver(post ? UpdatePostSchema : NewPostSchema),
    defaultValues: {
      category: post?.category ?? '',
      content: post?.content ?? '',
      tag: post?.tag ?? [],
      preview_content: post?.preview_content ?? '',
      preview_image: post?.preview_image ?? '',
      title: post?.title ?? '',
      visible: post?.visible ?? true,
    },
  });

  useEffect(() => {
    if (post) {
      setInputContent(post.content);
      form.setValue('content', post.content);
      setPreviewImage(post.preview_image);
    }
  }, [post]);

  const isPending = isUpdating || isCreating;

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setTag(value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // ! 한글 입력 시 마지막에 추가로 입력되는 것을 방지
    // ! 2번 발생하는 이벤트 중 첫 이벤트를 무시하도록 함
    if (['Enter', ','].includes(event.key) && !event.nativeEvent.isComposing) {
      const { value } = event.currentTarget;
      event.preventDefault();
      const inputValue = value.trim();
      const prevValue = form.getValues('tag');
      if (prevValue.includes(inputValue)) return;
      form.setValue('tag', [...prevValue, inputValue]);
      setTag('');
    }
  };

  const onSubmit = (data: z.infer<typeof NewPostSchema>) => {
    if (post) {
      const updatedItems = Object.keys(post).filter((key) => {
        if (['id', 'created_at', 'updated_at', 'text_color', 'bg_color'].includes(key)) return false;
        if (key === 'tag') return JSON.stringify(post.tag) !== JSON.stringify(data.tag);
        return post[key] !== data[key as KeyType];
      });
      const payload: { [key: string]: z.infer<typeof NewPostSchema>[keyof z.infer<typeof NewPostSchema>] } = {};
      updatedItems.forEach((key) => {
        payload[key] = data[key as KeyType];
      });
      if (payload.preview_image) {
        payload.prevImage = post.preview_image;
      }
      if (Object.keys(payload).length === 0) return;
      updatePost({ id: post.id, ...payload });
    } else createPost(data);
  };
  const onClickTagBadge = (event: MouseEvent<HTMLDivElement>) => {
    const { id } = event.currentTarget;
    const replaceValue = form.getValues('tag').filter((v) => v !== id);
    form.setValue('tag', replaceValue, { shouldValidate: true });
  };
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
            form.setValue('preview_image', image);
          }
        };
      } catch (error) {
        toast('이미지 생성 실패!', { type: 'error', autoClose: 1000 });
      }
    }
  };
  return (
    <div className="flex flex-1 flex-col pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex size-full flex-1 flex-col space-y-4">
          <div className="flex gap-x-4">
            <FormData className="flex-1" form={form} placeholder="제목입력" title="제목" name="title" />
            <FormData
              className="flex-1"
              form={form}
              title="소개글"
              placeholder="간단 소개글 입력"
              name="preview_content"
            />
          </div>
          <FormField
            control={form.control}
            render={({ field: { value, onChange, ...others } }) => (
              <FormItem>
                <FormLabel>미리보기 이미지</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="미리보기 이미지 등록" onChange={onChangeUploadFile} {...others} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="preview_image"
          />
          {previewImage && previewImage?.includes('project') ? (
            <Img className="object-contain" src={previewImage} alt="preview" target="port" />
          ) : (
            <img src={previewImage as string} alt="preview" />
          )}
          <Label className="flex-1">Tags</Label>
          <div className="flex gap-x-4">
            <Input
              id="tag"
              placeholder="EX) React.JS, Next.JS"
              value={tag}
              onChange={onChangeValue}
              onKeyDown={onKeyDown}
            />
          </div>
          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
            name="tag"
          />
          <div className="flex">
            <div className="flex-1">
              {form.getValues('tag').map((value, index) => (
                <Badge
                  className="mr-1.5 cursor-pointer border-2 border-rose-300"
                  style={{ backgroundColor: post?.bg_color[index], color: post?.text_color[index] }}
                  variant="outline"
                  key={value}
                  id={value}
                  onClick={onClickTagBadge}
                >
                  {value}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-x-4">
            <FormData className="flex-1" form={form} title="Category" placeholder="카테고리 입력" name="category" />
            <FormField
              control={form.control}
              render={({ field: { value, onChange, ...others } }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormLabel>공개 여부</FormLabel>
                  <FormControl>
                    <Switch checked={value} onCheckedChange={onChange} {...others} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="visible"
            />
          </div>
          <div className="flex max-h-full min-h-[300px] w-full flex-1 overflow-auto p-4">
            <MDEditor
              className="flex max-h-[100vw] min-h-[300px] w-full flex-1 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ol]:list-decimal [&_ul]:list-disc"
              height="100%"
              value={inputContent}
              onChange={(value) => {
                setInputContent(value as string);
                form.setValue('content', value as string);
              }}
              onPaste={async (event) => {
                await onImagePasted(
                  event,
                  event.clipboardData,
                  'blog',
                  accessToken,
                  `blog/${form.getValues('title')}`,
                  setInputContent,
                );
              }}
              onDrop={async (event) => {
                await onImagePasted(
                  event,
                  event.dataTransfer,
                  'blog',
                  accessToken,
                  `blog/${form.getValues('title')}`,
                  setInputContent,
                );
              }}
            />
          </div>
          <Button type="submit" className="bg-secondary text-secondary-foreground w-full" disabled={isPending}>
            게시글 등록
          </Button>
        </form>
      </Form>
    </div>
  );
}
