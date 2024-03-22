import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type DNDImgProps = {
  id: string;
  src: string;
};
export default function DNDImg(props: DNDImgProps) {
  const { id, src } = props;
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transform ? 'transform 0ms' : undefined,
  };
  return (
    <img
      className="max-w-[300px] rounded-xl"
      src={src.includes('project') ? `https://kwondns-port.s3.ap-northeast-2.amazonaws.com/${src}` : src}
      alt="e"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
}
