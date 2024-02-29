export type StackGetType = {
  front: StacksType[];
  back: StacksType[];
  etc: StacksType[];
};
export type StacksType = {
  name: string[];
  url: string[];
  img: string[];
  category: string;
};

export type StackType = {
  name: string;
  url: string;
  img: string;
  category: string;
};
