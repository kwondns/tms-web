import StackByCategory from '@/components/StackByCategory';
import { StacksType } from '@/types/portfolio/stack.type';

type StackByTechProps = {
  data: StacksType[];
  tech: 'front' | 'back' | 'etc';
};

const colorByTech = {
  front: 'hover:bg-red-300/5',
  back: 'hover:bg-cyan-300/5',
  etc: 'hover:bg-blue-300/5',
};
export default function StackByTech(props: StackByTechProps) {
  const { data, tech } = props;
  return (
    <div className="flex justify-between">
      <div className="w-[72px] md:w-[30%]">
        <h4 className="sticky top-[50%] block text-xl md:text-4xl">{tech.toUpperCase()}</h4>
      </div>
      <div
        className={`my-6 flex flex-1 flex-col rounded-3xl border-2 border-slate-500/50 p-2 md:p-4 ${colorByTech[tech]}`}
      >
        {data.map((value) => (
          <StackByCategory
            key={value.category}
            category={value.category}
            img={value.img}
            name={value.name}
            url={value.url}
          />
        ))}
      </div>
    </div>
  );
}
