import { Link, LinkProps } from 'react-router-dom'

import S from './image-link.module.css'

type ImageLinkProps = {
  src: HTMLImageElement['src']
  to?: LinkProps['to']
  onClick?: VoidFunction
}

function ImageLink({ src, to, onClick }: ImageLinkProps) {
  return to ? (
    <Link to={to} className={S.imageLink}>
      <img src={src} />
    </Link>
  ) : (
    <div className={S.imageLink} onClick={onClick}>
      <img src={src} />
    </div>
  )
}

export default ImageLink
