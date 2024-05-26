import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import "./index.css";

export type FormField<T> = {
  label: string;
  name: Path<T>;
  required?: boolean;
};

type Props<T extends FieldValues> = {
  fields: FormField<T>[];
  register: UseFormRegister<T>;
};

const CustomForm = <T extends FieldValues>({ fields, register }: Props<T>) => {
  return (
    <div className="form">
      {fields.map(({ label, name, required = true }) => (
        <input
          key={name}
          className="form-input"
          placeholder={label}
          {...register(name)}
          required={required}
        ></input>
      ))}
    </div>
  );
};

export default CustomForm;
