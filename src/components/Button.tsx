import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type Ref } from 'react';
import classNames from 'classnames';
import { Link, type LinkProps } from 'react-router-dom';

type ButtonVariants = 'primary' | 'secondary' | 'ghost';

type BaseProps = {
  variant?: ButtonVariants;
  fullWidth?: boolean;
};

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: undefined;
  };

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & {
    as: typeof Link;
    to: LinkProps['to'];
  };

type Props = NativeButtonProps | AnchorProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(function Button(
  { variant = 'primary', fullWidth, className, as, ...props },
  ref
) {
  const classes = classNames(
    'button',
    {
      'button-primary': variant === 'primary',
      'button-secondary': variant === 'secondary',
      'button-ghost': variant === 'ghost'
    },
    fullWidth && 'button-full',
    className
  );

  if (as === Link) {
    const linkProps = props as AnchorProps;
    return <Link ref={ref as Ref<HTMLAnchorElement>} className={classes} {...linkProps} />;
  }

  return <button ref={ref as Ref<HTMLButtonElement>} className={classes} {...(props as NativeButtonProps)} />;
});

export default Button;
