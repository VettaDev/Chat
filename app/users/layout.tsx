import { getUsers } from "@/app/actions/getUsers";
import Menu from "@/app/components/Menu";
import { UserList } from "./components/UserList";

export default async function UsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const users = await getUsers();
    return (
        //@ts-expect-error Server Component
        <Menu>
            <UserList users={users!} />
            {children}
        </Menu>
    );
}
