interface FormInputProps {
    htmlFor: string;
    labelText: string;
    idName: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const FormInput = ({ htmlFor, labelText, idName, type, value, onChange, placeholder }: FormInputProps) => {
    return (
        <div className='flex flex-col'>
            <label htmlFor={htmlFor}>{labelText}</label>
            <input
                id={idName}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
        </div>
    )
}

export default FormInput