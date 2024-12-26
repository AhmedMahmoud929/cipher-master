const ConditionedWrapper = ({
  condition,
  children,
}: {
  condition: boolean;
  children: React.ReactNode;
}) => {
  return <>{condition && children}</>;
};

export default ConditionedWrapper;
