import { PastType } from '@/types/TimeLine/past.type';
import PastDocument from '@/components/PastDocument';
import { Accordion } from '@/components/ui/accordion';

type PastActivityTemplateProps = {
  data: PastType[];
};
export default function TimeLineEditPastTemplate(props: PastActivityTemplateProps) {
  const { data } = props;
  return (
    <div className="mb-4 rounded-2xl border-2 border-violet-600 bg-violet-700/60 p-1 md:mb-10">
      {data?.length ? (
        <Accordion type="single" collapsible>
          {data.map((activity, index) => (
            <PastDocument key={activity.id} activity={activity} index={index} />
          ))}
        </Accordion>
      ) : (
        <span className="animate-bounce text-center text-white md:text-xl lg:text-2xl">내가 뭘 했더라?</span>
      )}
    </div>
  );
}
