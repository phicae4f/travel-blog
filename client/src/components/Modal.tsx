import { Icon } from "../ui/Icon"

interface ModalProps {
    text: string;
    onClose: () => void;
}

export const Modal = ({text, onClose}: ModalProps) => {
    return (
        <div className="modal">
            <div className="modal__wrapper">
                <span className="modal__text">{text}</span>
                <button className="modal__close" onClick={onClose}>
                    <Icon name="icon-close" width={22} height={24}/>
                </button>
            </div>
        </div>
    )
}