import React from 'react';

type InputProps = React.ComponentProps<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      {...props} 
      ref={ref}
    />
  );
});

export default Input;