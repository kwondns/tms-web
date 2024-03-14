export type PriorityType = 1 | 2 | 3;
export type FutureType = {
  id: string;
  checked: boolean;
  content: string;
  created_at: string;
  updated_at: string;
};

export type FutureCreateType = {
  checked: boolean;
  content: string;
  boxId: string;
  priority: PriorityType;
};
export type FutureUpdateType = {
  id: string;
  checked?: boolean;
  content?: string;
  priority: PriorityType;
};

export type FutureBoxType = {
  id: string;
  title: string;
  priority: PriorityType;
  created_at: string;
  updated_at: string;
  future: FutureType[];
  order: number;
  checked: boolean;
};

export type FutureBoxCreateType = {
  title: string;
  priority: PriorityType;
};

export type FutureBoxUpdateType = {
  id: string;
  title?: string;
  priority: PriorityType;
  checked?: boolean;
  order?: number;
};
