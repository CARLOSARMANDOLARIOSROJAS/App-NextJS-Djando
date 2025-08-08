
import { User as UserType} from "@/app/interface";
import { UserCard } from "./UserCard";
interface UserProps {
    users: UserType[];
    handleDelete: (id: number) => Promise<void>;
}

export const User = (Props: UserProps) => {

    const { users, handleDelete } = Props;

    return (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4 ">
            {users.map(u => (
                <div key={u.id}>
                    <UserCard user={u}
                        handleDelete={handleDelete}
                    />
                </div>
            ))}

        </ul>
    )
}
