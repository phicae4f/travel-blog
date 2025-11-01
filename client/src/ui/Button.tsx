interface ButtonProps {
    className?: string,
    type: "button" | "submit" | "reset",
    text: string
}

export const Button = ({className='btn', type, text}: ButtonProps) => {
    return (
        <button className={className} type={type}>{text}</button>
    )
}