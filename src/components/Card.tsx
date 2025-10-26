import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className, ...props }: CardProps) {
  return <div className={classNames('card', className)} {...props} />;
}
