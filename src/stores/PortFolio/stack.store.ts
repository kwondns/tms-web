import { atom } from 'recoil';

import { StackUpdateType } from '@/types/PortFolio/stack.type';

const StackAtom = atom<StackUpdateType | null>({ key: 'stackAtom', default: null });

export default StackAtom;
