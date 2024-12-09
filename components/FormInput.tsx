// Interfaces & Types
import { FormInputProps } from "@/lib/types/types";

export default function FormInput({ htmlFor, labelText, idName, type, value, onChange, placeholder, isRequired = true }: FormInputProps) {
    return (
        <div className='flex flex-col'>
            <label htmlFor={htmlFor}>{labelText}</label>
            <input
                id={idName}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={isRequired}
            />
        </div>
    )
}