import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  MouseSensor,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { toast } from 'react-toastify';

import { FutureBoxType, PriorityType } from '@/types/TimeLine/future.type';
import CardContainer from '@/components/CardContainer';
import Card from '@/components/Card';
import { useSwapFutureBox } from '@/hooks/TimeLine/useFuture';

type CardSetProps = {
  futureBoxes: FutureBoxType[];
  priority: PriorityType;
};
export default function CardSet(props: CardSetProps) {
  const { futureBoxes, priority } = props;
  const { swapFutureBox } = useSwapFutureBox();
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const sortableItem = futureBoxes.map((box) => box.order);
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeBox = futureBoxes.find((box) => box.order === active.id);
      const overBox = futureBoxes.find((box) => box.order === over.id);
      if (activeBox && overBox) {
        swapFutureBox([activeBox, overBox]);
      } else toast('순서 변경에 실패하였습니다.');
    }
  };
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={sortableItem} strategy={verticalListSortingStrategy}>
        <CardContainer priority={priority} index={futureBoxes.length}>
          {futureBoxes.map((box, index) => (
            <Card
              key={box.id}
              id={box.id}
              title={box.title}
              future={box.future}
              priority={box.priority}
              index={index}
              order={box.order}
              checked={box.checked}
            />
          ))}
        </CardContainer>
      </SortableContext>
    </DndContext>
  );
}
