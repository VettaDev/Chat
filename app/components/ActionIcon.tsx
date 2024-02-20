type ActionIconProps = {
    onClick: () => void;
    icon: React.ReactNode;
};

const ActionIcon: React.FC<ActionIconProps> = ({ onClick, icon }) => {
    return (
        <div
            className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
            onClick={onClick}
        >
            {icon}
        </div>
    );
};

export default ActionIcon;
