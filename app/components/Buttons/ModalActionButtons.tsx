import { Button } from "./Button";
import { ModalButtonsProps } from "./types";

const ModalActionButtons = ({
    onClick,
    onCancel,
    disabled,
    mainButtonText,
    type,
    danger,
}: ModalButtonsProps) => {
    return (
        <div className="flex gap-4 justify-end">
            <Button onClick={onCancel} disabled={disabled} secondary>
                Cancel
            </Button>
            <Button
                onClick={onClick}
                danger={danger}
                disabled={disabled}
                type={type}
            >
                {mainButtonText}
            </Button>
        </div>
    );
};

export default ModalActionButtons;
