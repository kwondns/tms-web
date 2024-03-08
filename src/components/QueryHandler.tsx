type QueryHandlerProps = {
  isError: boolean;
  isLoading: boolean;
  children: React.ReactNode;
};
export default function QueryHandler(props: QueryHandlerProps) {
  const { isError, isLoading, children } = props;
  if (isLoading) return <span>loading...</span>;
  if (isError) return <span>에러 발생!</span>;
  return children;
}
