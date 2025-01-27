import { FC } from "react";

type AnySkeletonProps = {
  className?: string;
  width?: number;
  height?: number;
};

export const Skeleton: FC<AnySkeletonProps> = ({
  width,
  height,
  className,
}) => (
  <div className={`rounded-full animate-pulse bg-slate-200 ${className}`} style={{ width, height }} />
);
