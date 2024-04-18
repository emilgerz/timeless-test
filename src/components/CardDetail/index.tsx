import s from './InfoDetailStroke.module.scss'

interface InfoDetailStrokeProps {
  field: string | number
  value: string | number
}

export const InfoDetailStroke = ({ field, value }: InfoDetailStrokeProps) => {
  return (
    <div className={s.stroke}>
      <span className={s.stroke__field}>{field}</span>
      <span className={s.stroke__value}>{value}</span>
    </div>
  )
}
