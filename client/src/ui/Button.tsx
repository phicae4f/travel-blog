interface ButtonProps {
    className?: string,
    type: "button" | "submit" | "reset",
    text: string,
    disabled?: boolean,
    onClick?: () => void
}

export const Button = ({className='btn', type, text, disabled=false, onClick}: ButtonProps) => {
    return (
        <button className={className} type={type} disabled={disabled} onClick={onClick}>{text}</button>
    )
}