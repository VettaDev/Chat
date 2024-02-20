"use client";
import { User } from "@prisma/client";
import { UserItem } from "./User";
import Title from "@/app/components/Title";
import Sidebar from "@/app/components/Sidebar";

interface UserListProps {
    users: User[];
}
export const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <Sidebar>
            <Title text={"Community"} />
            {users?.length > 0 &&
                users.map((user) => {
                    return <UserItem key={user.id} data={user} />;
                })}
        </Sidebar>
    );
};
