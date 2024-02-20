type Props = {
    text: string;
};

const PrimaryText: React.FC<Props> = ({ text }) => {
    return <span className="text-sm font-semibold text-gray-900">{text}</span>;
};

export default PrimaryText;
