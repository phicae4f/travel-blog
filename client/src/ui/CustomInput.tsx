import { type InputHTMLAttributes } from "react"

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    labelText: string,
    placeholder: string,
    id: string,
    type: string,
    error?: string | null
}


export const CustomInput = ({labelText, placeholder, id, type, error=null, ...inputProps}: CustomInputProps) => {
    return (
        <div className={`custom-input ${error ? "custom-input--error" : ""}`}>
            <label className="custom-input__label" htmlFor={id}>{labelText}</label>
            <input className="custom-input__field" type={type} placeholder={placeholder} id={id} {...inputProps}/>
            <span className="custom-input__error">{error}</span>
        </div>
    )
}