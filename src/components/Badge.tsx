import classNames from 'classnames';

type BadgeProps = {
  status: 'open' | 'in_progress' | 'closed';
};

export default function Badge({ status }: BadgeProps) {
  return <span className={classNames('badge', `badge-${status}`)}>{status.replace('_', ' ')}</span>;
}
