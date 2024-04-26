export type BlogPostTagType = {
  tag: string[];
  bgColor: string[];
  textColor: string[];
};
export type BlogPostType = BlogPostTagType & {
  id: string;
  title: string;
  preview_image: string;
  preview_content: string;
  visible: boolean;
  created_at: string;
  updated_at: string;
};

export type BlogPostContentType = {
  content: string;
};

export type BlogCreateType = {
  title: string;
  preview_image: File | string;
  preview_content: string;
  content: string;
  tag: string[];
  category: string;
};

export type BlogPostDetailType = {
  [key: string]: string | string[] | boolean;
  id: string;
  title: string;
  preview_image: string;
  preview_content: string;
  created_at: string;
  updated_at: string;
  category: string;
  visible: boolean;
  content: string;
  tag: string[];
  text_color: string[];
  bg_color: string[];
};

export type BlogPostUpdateType = {
  id: string;
  title?: string;
  preview_image?: File | string;
  prevImage?: string;
  preview_content?: string;
  created_at?: string;
  updated_at?: string;
  category?: string;
  visible?: boolean;
  content?: string;
  tag?: string[];
};
