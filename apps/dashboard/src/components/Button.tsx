import clsx from 'clsx'
import { MouseEvent, ReactNode } from 'react'

import Text from 'components/typography/Text'

export enum Variant {
  Full,
  Outline,
  Uncolored,
}

export enum IconPosition {
  Left,
  Right,
}

export interface Props {
  className?: string
  text?: string
  variant?: Variant
  icon?: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => any
  isDisabled?: boolean
  type?: 'submit'
  iconPosition?: IconPosition
}

function Button({
  className,
  text,
  variant = Variant.Outline,
  icon,
  onClick,
  type,
  isDisabled,
  iconPosition = IconPosition.Left,
}: Props) {
  return (
    <button
      type={type}
      className={clsx(
        'flex',
        'items-center',
        'justify-center',
        'transition-all',
        'rounded',
        'border',
        'space-x-1.5',
        'py-1.5',
        'px-3',
        {
          'cursor-not-allowed opacity-70': isDisabled,
          'border-green-400 bg-green-400 stroke-green-800 text-green-800 hover:border-green-800':
            variant === Variant.Full,
          'border-slate-200 hover:border-green-800 hover:text-green-800':
            variant === Variant.Outline,
        },
        className,
      )}
      onClick={!isDisabled ? onClick : undefined}
    >
      {iconPosition === IconPosition.Left && icon}
      {text && (
        <Text
          size={Text.size.S3}
          text={text}
        />
      )}
      {iconPosition === IconPosition.Right && icon}
    </button>
  )
}

Button.variant = Variant
Button.iconPosition = IconPosition

export default Button
