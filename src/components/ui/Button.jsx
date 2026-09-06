const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
}

/**
 * @param {{
 *   children: React.ReactNode
 *   variant?: 'primary' | 'secondary' | 'ghost'
 * } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
