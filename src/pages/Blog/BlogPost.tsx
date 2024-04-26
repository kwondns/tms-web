import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import BlogPostTemplate from '@/templates/Blog/BlogPost.template';
import { getBlogPost } from '@/hooks/Blog/useBlog';
import { BlogPostDetailType } from '@/types/Blog/blog.type';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  if (id === undefined) navigate('/blog/list');
  const blogPostQuery = getBlogPost(id);
  const [post, setPost] = useState<BlogPostDetailType>();

  useEffect(() => {
    (async () => {
      const data = await queryClient.fetchQuery(blogPostQuery);
      if (data) setPost(data);
    })();
  }, []);
  if (!post) return <Loader2 />;
  return <BlogPostTemplate post={post} />;
}
