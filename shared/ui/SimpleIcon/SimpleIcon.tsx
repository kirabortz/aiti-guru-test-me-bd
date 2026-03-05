import Image from 'next/image'

type SimpleIconProps = {
  src: string
  className?: string
  alt?: string
  width?: number
  height?: number
  onClick?: () => void
}


export default function SimpleIcon({
  src,
  className, 
  alt = '',
  width = 24,
  height = 24,
  onClick = () => {}
}: SimpleIconProps) {
  return (
      <Image 
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        className={className}
        onClick={() => onClick()}
      />
  )
}