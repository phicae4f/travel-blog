interface ButtonProps {
    className?: string,
    type: "button" | "submit" | "reset",
    text: string,
    disabled?: boolean
}

export const Button = ({className='btn', type, text, disabled=false}: ButtonProps) => {
    return (
        <button className={className} type={type} disabled={disabled}>{text}</button>
    )
}