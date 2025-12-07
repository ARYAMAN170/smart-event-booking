import { FC, HTMLAttributes } from 'react';

interface ThreadsProps extends HTMLAttributes<HTMLDivElement> {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
}

declare const Threads: FC<ThreadsProps>;
export default Threads;
