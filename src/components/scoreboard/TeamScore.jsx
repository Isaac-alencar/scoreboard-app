/**
 * @param {{
 *   name: string
 *   score: number
 *   fouls: number
 *   variant: 'home' | 'away'
 * }} props
 */
export default function TeamScore({ name, score, fouls, variant }) {
  const isHome = variant === 'home'
  const bgColor = isHome ? 'bg-[#dc2626]' : 'bg-[#18181b]'
  const textColor = isHome ? 'text-white' : 'text-[#facc15]'
  const foulsText = isHome ? 'text-white' : 'text-[#facc15]'

  return (
    <div
      className={`flex h-full w-full items-center justify-between px-6 md:px-12 ${bgColor} ${textColor}`}
    >
      <div className="flex flex-col justify-center">
        <span className="text-[clamp(3rem,8vw,7rem)] leading-none bowlby-one uppercase">
          {name}
        </span>
        <span
          className={`mt-2 text-[clamp(1.5rem,3.5vw,2.5rem)] leading-none bowlby-one ${foulsText}`}
        >
          Faltas: {fouls}
        </span>
      </div>
      <div className="text-[clamp(6rem,18vw,14rem)] leading-none bowlby-one">
        {score}
      </div>
    </div>
  )
}
