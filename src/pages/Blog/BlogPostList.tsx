import { Loader2 } from 'lucide-react';

import { useGetBlogPosts } from '@/hooks/Blog/useBlog';
import BlogListTemplate from '@/templates/Blog/BlogList.template';
import { Button } from '@/components/ui/button';

export default function BlogPostList() {
  const { data, fetchNextPage, isFetchingNextPage } = useGetBlogPosts();
  const onClickNext = async () => {
    await fetchNextPage();
  };
  if (!data?.pages) return <span>Error</span>;
  return (
    <div>
      <BlogListTemplate postWithPage={data.pages} />
      <Button variant="secondary" className="w-full" onClick={onClickNext}>
        {isFetchingNextPage && <Loader2 className="mr-2 size-4 animate-spin" />}더 보기
      </Button>
    </div>
  );
}
