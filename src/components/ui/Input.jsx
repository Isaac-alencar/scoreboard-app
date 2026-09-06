/**
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props
 */
export default function Input({ className = '', ...props }) {
  return <input className={`input ${className}`} {...props} />
}
