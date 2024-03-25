import Stack from '@/components/stack';
import { StacksType } from '@/types/PortFolio/stack.type';

export default function StackByCategory(props: Omit<StacksType, 'recent'>) {
  const { category, img, url, name, tech } = props;
  return (
    <div className="grid grid-rows-[40px_1fr] gap-2 md:gap-4 md:p-4">
      <span className="pl-3 text-base text-slate-600 md:text-2xl dark:text-slate-300">{category}</span>
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
        {name.map((stackName, index) => (
          <Stack
            key={stackName}
            name={stackName}
            img={img[index]}
            url={url[index]}
            category={category}
            recent
            tech={tech}
          />
        ))}
      </div>
    </div>
  );
}
