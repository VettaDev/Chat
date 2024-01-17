import { getUsers } from "../actions/getUsers";
import Menu from "../components/Menu";
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
            <div className="h-full">
                <UserList users={users!} />
                {children}
            </div>
        </Menu>
    );
}
