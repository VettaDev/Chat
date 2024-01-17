"use client";
import { User } from "@prisma/client";
import { UserItem } from "./User";

interface UserListProps {
    users: User[];
}
export const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <aside className="fixed left-0 w-full block inset-y-0 pb-20 overflow-y-auto border-r border-gray-200 lg:left-20 lg:w-80">
            <div className="px-5">
                <h2 className="text-2xl font-bold text-neutral-800 py-4">
                    Community
                </h2>
                {users?.length > 0 &&
                    users.map((user) => {
                        return <UserItem key={user.id} data={user} />;
                    })}
            </div>
        </aside>
    );
};
