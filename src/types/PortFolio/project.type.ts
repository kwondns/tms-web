export type ProjectType = {
  id: string;
  title: string;
  shorten_content: string;
  preview_image: string;
  date: string;
  db: string;
  visible: boolean;
  front_tag: TagType;
  back_tag: TagType;
  projectMoreDetail: string;
  context: string;
  role: string;
  link: string;
  images: string[];
};

type TagType = string[];

export type ProjectUpdateType = Omit<Omit<ProjectType, 'preview_image'>, 'images'> & {
  preview_image: string | File;
  images: (string | File)[];
};

export type ProjectCreateType = {
  title: string;
  shorten_content: string;
  link: string;
  preview_image: File;
  images: File[];
  role: string;
  context: string;
  date: string;
  db: string;
  visible: boolean;
  front_tag: TagType;
  back_tag: TagType;
  projectMoreDetail: string;
};
