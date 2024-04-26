import { Fragment, memo, MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Img from '@/components/Img';
import { BlogPostType } from '@/types/Blog/blog.type';
import { DateTime } from '@/lib/date';

type BlogPostRowType = {
  post: BlogPostType;
};
type BlogListTemplateProps = {
  postWithPage: BlogPostType[][];
};
const BlogPostItem = memo((props: BlogPostRowType) => {
  const { post } = props;
  const navigate = useNavigate();

  const onClickRow = useCallback((event: MouseEvent<HTMLTableRowElement>) => {
    const { id } = event.currentTarget;
    navigate(`/blog/${id}`);
  }, []);
  return (
    <Fragment key={post.id}>
      <TableRow className="cursor-pointer" key={post.id} id={post.id} onClick={onClickRow}>
        <TableCell className={`font-medium ${post.visible || 'line-through'}`}>{post.title}</TableCell>
        <TableCell>{post.preview_content}</TableCell>
        <TableCell>
          <Img className="max-h-[80px]" src={post.preview_image} alt={post.preview_image} target="port" />
        </TableCell>
        <TableCell className="text-right">{DateTime(post.created_at)}</TableCell>
      </TableRow>
    </Fragment>
  );
});
BlogPostItem.displayName = 'BlogPostItem';

export default function BlogListTemplate(props: BlogListTemplateProps) {
  const { postWithPage } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[100px]">Title</TableHead>
          <TableHead>소개글</TableHead>
          <TableHead>이미지</TableHead>
          <TableHead className="text-right">작업일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {postWithPage?.map((page) => page.map((post) => <BlogPostItem post={post} key={post.id} />))}
      </TableBody>
    </Table>
  );
}
