import MDEditor from '@uiw/react-md-editor';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, DragEvent, KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateProject, useUpdateProject } from '@/hooks/PortFolio/useProject';
import FormData from '@/components/FormField';
import { onImagePasted } from '@/lib/markdown';
import { AuthAtom } from '@/stores/auth.store';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ProjectType } from '@/types/PortFolio/project.type';
import Img from '@/components/Img';
import DNDImg from '@/components/DNDImg';

type PortFolioProjectTemplateProps = {
  // eslint-disable-next-line react/require-default-props
  defaultProject?: ProjectType;
};

const formSchema = z.object({
  title: z.string().min(4, { message: '제목을 입력하세요' }),
  shorten_content: z.string(),
  preview_image: z.union([z.instanceof(File), z.string()]),
  date: z.string(),
  db: z.string(),
  visible: z.boolean(),
  link: z.string(),
  front_tag: z.string().array(),
  back_tag: z.string().array(),
  projectMoreDetail: z.string(),
  images: z.array(z.instanceof(File).or(z.string())),
  context: z.string(),
  role: z.string(),
});

export default function PortFolioProjectTemplate(props: PortFolioProjectTemplateProps) {
  const { defaultProject } = props;
  const accessToken = useRecoilValue(AuthAtom);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeDrag, setActiveDrag] = useState<string>();
  const [projectDetail, setProjectDetail] = useState<string>('');
  const { updateProject, isUpdating } = useUpdateProject();
  const { createProject, isCreating } = useCreateProject();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      shorten_content: '',
      date: '',
      db: '',
      front_tag: [],
      back_tag: [],
      projectMoreDetail: '',
      visible: true,
    },
    disabled: isCreating || isUpdating,
  });
  useEffect(() => {
    if (defaultProject) {
      const {
        title,
        shorten_content: shortenContent,
        projectMoreDetail,
        db,
        preview_image: previewImage,
        visible,
        date,
        link,
        front_tag: frontTag,
        back_tag: backTag,
        images,
        context,
        role,
      } = defaultProject;
      form.setValue('title', title);
      form.setValue('shorten_content', shortenContent);
      form.setValue('date', date);
      form.setValue('db', db);
      form.setValue('preview_image', previewImage);
      setPreviewImage(previewImage);
      form.setValue('front_tag', frontTag);
      form.setValue('back_tag', backTag);
      form.setValue('visible', visible);
      setProjectDetail(projectMoreDetail);
      form.setValue('projectMoreDetail', projectMoreDetail);
      form.setValue('images', images);
      form.setValue('link', link);
      setImages(images);
      form.setValue('context', context);
      form.setValue('role', role);
    }
  }, []);
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    if (id === 'front_tag') setFront(value);
    else setBack(value);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ','].includes(event.key)) {
      const { id, value } = event.currentTarget;
      event.preventDefault();
      const inputValue = value.trim();
      const target = id as 'front_tag' | 'back_tag';
      const prevValue = form.getValues(target);
      if (prevValue.includes(value)) return;
      form.setValue(target, [...prevValue, inputValue]);
      if (id === 'front_tag') setFront('');
      else setBack('');
    }
  };

  const onClickTagBadge = (event: MouseEvent<HTMLDivElement>) => {
    const { id } = event.currentTarget;
    const [target, value] = id.split('$#');
    if (target === 'front') {
      const replaceValue = form.getValues('front_tag').filter((v) => v !== value);
      form.setValue('front_tag', replaceValue, { shouldValidate: true });
    } else {
      const replaceValue = form.getValues('back_tag').filter((v) => v !== value);
      form.setValue('back_tag', replaceValue, { shouldValidate: true });
    }
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
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (defaultProject) {
      const request = {
        payload: { ...data, id: defaultProject.id },
      };
      if (data.preview_image instanceof File) Object.assign(request, { previousImage: defaultProject.preview_image });
      updateProject(request);
    } else {
      const request = { ...data, preview_image: data.preview_image as File, images: data.images as File[] };
      createProject(request);
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDropImage = async (event: DragEvent<HTMLDivElement>) => {
    const { dataTransfer } = event;
    for (let index = 0; index < dataTransfer.items.length; index += 1) {
      const file = dataTransfer.files.item(index);
      if (file)
        try {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if (reader.result) {
              const result = reader.result as string;
              setImages((prev) => [...prev, result]);
              const imagesValue = form.getValues('images');
              if (imagesValue) form.setValue('images', [...imagesValue, file]);
              else form.setValue('images', [file]);
            }
          };
        } catch (error) {
          toast('이미지 생성 실패!', { type: 'error', autoClose: 1000 });
        }
    }
    event.preventDefault();
  };
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      if (typeof active.id === 'string' && typeof over.id === 'string') {
        setImages((prev) => {
          // eslint-disable-next-line no-param-reassign
          [prev[Number(active.id)], prev[Number(over.id)]] = [prev[Number(over.id)], prev[Number(active.id)]];
          return prev;
        });
        const imageFiles = form.getValues('images');
        [imageFiles[Number(active.id)], imageFiles[Number(over.id)]] = [
          imageFiles[Number(over.id)],
          imageFiles[Number(active.id)],
        ];
        form.setValue('images', imageFiles);
      }
    }
  };

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveDrag(active.id as string);
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
              name="shorten_content"
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
            <Img className="max-h-[100px] object-contain" src={previewImage} alt="preview" target="port" />
          ) : (
            <img className="max-h-[100px]" src={previewImage as string} alt="preview" />
          )}
          <div className="flex">
            <Label className="flex-1">Front-Tag</Label>
            <Label className="flex-1">Back-Tag</Label>
          </div>
          <div className="flex gap-x-4">
            <Input
              id="front_tag"
              placeholder="EX) React.JS, Next.JS"
              value={front}
              onChange={onChangeValue}
              onKeyDown={onKeyDown}
            />
            <Input
              id="back_tag"
              placeholder="EX) React.JS, Next.JS"
              value={back}
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
            name="front_tag"
          />
          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
            name="back_tag"
          />

          <div className="flex">
            <div className="flex-1">
              {form.getValues('front_tag').map((value) => (
                <Badge
                  className="mr-1.5 border-2 border-rose-300"
                  variant="outline"
                  key={value}
                  id={`front$#${value}`}
                  onClick={onClickTagBadge}
                >
                  {value}
                </Badge>
              ))}
            </div>
            <div className="flex-1 gap-0.5">
              {form.getValues('back_tag').map((value) => (
                <Badge
                  className="mr-1.5 border-2 border-violet-300"
                  key={value}
                  variant="outline"
                  id={`back$#${value}`}
                  onClick={onClickTagBadge}
                >
                  {value}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-x-4">
            <FormData className="flex-1" form={form} title="날짜" placeholder="EX) 2024.02" name="date" />
            <FormData className="flex-1" form={form} title="DB" placeholder="DB 입력" name="db" />
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
          <div>
            <FormData className="flex-1" form={form} title="링크" placeholder="Link 입력" name="link" />
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>요약</FormLabel>
                  <FormControl>
                    <Textarea placeholder="요약 작성" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="context"
            />
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>역활</FormLabel>
                  <FormControl>
                    <Textarea placeholder="역활 작성" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="role"
            />
          </div>
          <FormField
            control={form.control}
            render={(field) => (
              <FormItem>
                <FormLabel>갤러리</FormLabel>
                <FormControl>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                    onDragStart={onDragStart}
                  >
                    <SortableContext items={images} strategy={verticalListSortingStrategy}>
                      <div
                        className={`border-b-accent relative flex h-[200px] w-full flex-1 gap-x-4 overflow-x-scroll rounded-lg border p-2 after:opacity-100 hover:after:absolute hover:after:inset-2 hover:after:flex hover:after:items-center hover:after:justify-center hover:after:border-2 hover:after:border-dashed hover:after:border-violet-300/25 hover:after:text-xl hover:after:text-white/50 hover:after:content-['파일을\\0000a0올려주세요'] ${images.length > 0 ? 'hover:after:hidden' : 'hover:after:display'}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={onDropImage}
                      >
                        {images.map((image, index) => (
                          <DNDImg key={`${Math.random()}_${image.slice(0, 15)}`} src={image} id={String(index)} />
                        ))}
                      </div>
                    </SortableContext>
                    <DragOverlay>
                      {activeDrag ? <DNDImg id={activeDrag} src={images[Number(activeDrag)]} /> : null}
                    </DragOverlay>
                    <Input type="hidden" {...field} />
                  </DndContext>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="images"
          />
          <div className="flex max-h-full min-h-[300px] w-full flex-1 overflow-auto p-4">
            <MDEditor
              className="flex max-h-[100vw] min-h-[300px] w-full flex-1 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ol]:list-decimal [&_ul]:list-disc"
              height="100%"
              value={projectDetail}
              onChange={(value) => {
                setProjectDetail(value as string);
                form.setValue('projectMoreDetail', value as string);
              }}
              onPaste={async (event) => {
                await onImagePasted(
                  event,
                  event.clipboardData,
                  'port',
                  accessToken,
                  `project/${form.getValues('title')}`,
                  setProjectDetail,
                );
              }}
              onDrop={async (event) => {
                await onImagePasted(
                  event,
                  event.dataTransfer,
                  'port',
                  accessToken,
                  `project/${form.getValues('title')}`,
                  setProjectDetail,
                );
              }}
            />
          </div>
          <Button type="submit" className="bg-secondary text-secondary-foreground w-full">
            프로젝트 등록
          </Button>
        </form>
      </Form>
    </div>
  );
}
