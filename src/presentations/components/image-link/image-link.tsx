import { Link, LinkProps } from 'react-router-dom'

import S from './image-link.module.css'

type ImageLinkProps = {
  src: HTMLImageElement['src']
  to: LinkProps['to']
}

function ImageLink({ src, to }: ImageLinkProps) {
  return (
    <Link to={to} className={S.imageLink}>
      <img src={src} />
    </Link>
  )
}

export default ImageLink
