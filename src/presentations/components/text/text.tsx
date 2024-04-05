import S from './text.module.css'

type TextProps = {
  grade?: 'main' | 'subtitle' | 'title' | 'big'
  children?: string
}

function Text({ grade = 'main', children }: TextProps) {
  return (
    <span className={S.root} data-grade={grade}>
      {children}
    </span>
  )
}

export default Text
