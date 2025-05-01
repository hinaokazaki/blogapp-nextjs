import { UseFormRegister, RegisterOptions, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  type: string,
  name: Path<T>,
  isSubmitting: boolean,
  register: UseFormRegister<T>,
  placeholder: string,
  validationRules: RegisterOptions<T, Path<T>>,
}

const Input = <T extends FieldValues>({
  type,
  name,
  isSubmitting,
  register,
  placeholder,
  validationRules,
}: Props<T>) => {
  return (
    <input
      type={type}
      id={name as string}
      disabled={isSubmitting}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder={placeholder}
      {...register(name, validationRules)}
    />
  )
}

export default Input;