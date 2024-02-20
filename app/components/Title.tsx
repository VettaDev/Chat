type TitleProps = {
    text: string;
};

const Title: React.FC<TitleProps> = ({ text }) => {
    return <h2 className="text-2xl font-bold text-neutral-800">{text}</h2>;
};

export default Title;
