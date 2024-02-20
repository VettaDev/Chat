import clsx from "clsx";

type SidebarProps = {
    children: React.ReactNode;
    isOpen?: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ children, isOpen }) => {
    return (
        <aside
            className={clsx(
                `fixed
                left-0
                w-full
                block 
                inset-y-0
                pb-20
                overflow-y-auto
                border-r
               border-gray-200
                lg:left-20
                lg:w-80
                px-5
                pt-5`,
                isOpen ? "hidden" : "block w-full left-0",
            )}
        >
            {children}
        </aside>
    );
};

export default Sidebar;
