export type StackGetType = {
  recent: {
    front: StacksType[];
    back: StacksType[];
    etc: StacksType[];
  };
  other: StackType[];
};
export type StacksType = {
  name: string[];
  url: string[];
  img: string[];
  recent: boolean[];
  category: string;
  tech: 'front' | 'back' | 'etc';
};

export type StackType = {
  name: string;
  url: string;
  img: string;
  category: string;
  recent: boolean;
  tech: 'front' | 'back' | 'etc';
};

export type StackCreateType = {
  name: string;
  url: string;
  img: File;
  category: string;
  recent: boolean;
  tech: 'front' | 'back' | 'etc';
};

export type StackUpdateType = {
  name: string;
  url: string;
  img: string;
  category: string;
  recent: boolean;
  tech: 'front' | 'back' | 'etc';
};
