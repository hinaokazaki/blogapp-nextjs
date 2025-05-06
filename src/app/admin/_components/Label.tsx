'use client'
type Props = {
  name: string,
  title: string,
}

const Label: React.FC<Props> = ({name, title}) => {
  return (
    <label className='text-base text-[#4d4f5b]' htmlFor={name}>{title}</label>
  )
}

export default Label;