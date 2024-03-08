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
  projectDetail: string;
};

type TagType = string[];

export type ProjectUpdateType = Omit<ProjectType, 'preview_image'> & {
  preview_image: string | File;
};

export type ProjectCreateType = {
  title: string;
  shorten_content: string;
  preview_image: File;
  date: string;
  db: string;
  visible: boolean;
  front_tag: TagType;
  back_tag: TagType;
  projectDetail: string;
};
