import { visit } from 'unist-util-visit';
import { Element } from 'hast';
import { Plugin } from 'unified';
import { toast } from 'react-toastify';
import { ClipboardEvent, DragEvent } from 'react';

import { FileUpload } from '@/lib/fetch';

async function fileUpload(file: File, target: string, num: number, accessToken: string, uri: string) {
  toast('이미지 업로드 중...', { toastId: 'uploadImage', autoClose: false });
  try {
    const uploadResult = await FileUpload(target, file, num, accessToken, uri);
    toast.update('uploadImage', { type: 'success', render: '업로드 완료!', autoClose: 1500 });
    return uploadResult;
  } catch (error) {
    toast.update('uploadImage', { type: 'error', render: '업로드 실패!', autoClose: 3000 });
    return '';
  }
}

const insertToTextArea = (intsertString: string) => {
  const textarea = document.querySelector('textarea');
  if (!textarea) {
    return null;
  }

  let sentence = textarea.value;
  const len = sentence.length;
  const pos = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const front = sentence.slice(0, pos);
  const back = sentence.slice(pos, len);

  sentence = front + intsertString + back;

  textarea.value = sentence;
  textarea.selectionEnd = end + intsertString.length;

  return sentence;
};

export const onImagePasted = async (
  event: ClipboardEvent<HTMLDivElement> | DragEvent<HTMLDivElement>,
  dataTransfer: DataTransfer,
  target: string,
  accessToken: string,
  uri: string,
  setMarkdown: (value: string) => void,
) => {
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      event.preventDefault();
      files.push(file);
    }
  }
  let result: string[] = [];
  await Promise.allSettled(
    files.map(async (file) => {
      const url = await fileUpload(file, target, files.length, accessToken, uri);
      result = url;
    }),
  );
  result.forEach((route: string) => {
    const insertedMarkdown = insertToTextArea(`![](${import.meta.env.VITE_IMAGE_URL}/${route})`);
    if (!insertedMarkdown) {
      return;
    }
    setMarkdown(insertedMarkdown);
  });
};

export const imgLazyLoading: Plugin = () => (tree) => {
  visit(tree, 'element', (node: Element) => {
    if (node.tagName === 'img' && node.properties) {
      node.properties.loading = 'lazy';
    }
  });
};
