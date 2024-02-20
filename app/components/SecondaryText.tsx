type Props = {
    text: string;
};

const SecondaryText: React.FC<Props> = ({ text }) => {
    return <span className="text-sm text-gray-300">{text}</span>;
};

export default SecondaryText;
