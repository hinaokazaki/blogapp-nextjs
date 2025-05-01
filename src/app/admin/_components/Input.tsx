import { UseFormRegister, Path, FieldValues, RegisterOptions } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>,
  type: string,
  register: UseFormRegister<T>,
  isSubmitting: boolean,
  isLoading: boolean,
  validationRules: RegisterOptions<T, Path<T>>
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = <T extends FieldValues>({
  name, 
  type, 
  register, 
  isSubmitting,
  isLoading,
  validationRules,
  ...rest
}: Props<T>) => {
  return (
    <input
      className='mt-1 mb-4 min-h-[30px] border-[1px] border-solid border-[#b7b8be] rounded-md text-lg' 
      id={name as string} 
      type={type} 
      disabled={isSubmitting || isLoading}
      {...rest}
      {...register(name, validationRules)}
    />
  )
}

export default Input;