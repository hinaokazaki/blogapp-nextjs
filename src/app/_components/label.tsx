import react from "react";

type Props = {
  name: string,
  title: string,
}

const Label: React.FC<Props> = ({name, title}) => {
 return (
  <label
    htmlFor={name}
    className="block mb-2 text-sm font-medium text-gray-900">
    {title} 
  </label>
 )
}

export default Label;