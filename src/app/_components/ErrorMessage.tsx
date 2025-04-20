import { FieldErrors, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  errors: FieldErrors<T>,
  name: Path<T>,
}

const ErrorMessage = <T extends FieldValues> ({errors, name}: Props<T>) => {
  return (
    <div className='text-red-500'>{errors[name]?.message as string ?? ''}</div>
  )
}

export default ErrorMessage;