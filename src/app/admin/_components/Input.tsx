import React from 'react';

type InputProps = React.ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      className='mt-1 mb-4 min-h-[30px] border-[1px] border-solid border-[#b7b8be] rounded-md text-lg' 
      {...props}
      ref={ref}
    />
  )
})

export default Input;