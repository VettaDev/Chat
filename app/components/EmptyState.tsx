const EmptyState = () => {
    return (
        <div className="px-4 py-10 h-[20px] w-full sm:px-6 lg:px-8 lg:h-full flex justify-center items-center bg-gray-100 lg:static absolute bottom-[40px] ">
            <div className="text-center items-center flex flex-col">
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                    Select a chat or start new conversation
                </h3>
            </div>
        </div>
    );
};
export default EmptyState;
