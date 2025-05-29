import { useUserContext } from "@context/UserContext";
import clsx from "clsx";
import { UserAddIcon } from "./ui/Icons";

const UserAvatar = () => {
    const { username } = useUserContext();
    const initial = username.charAt(0).toUpperCase();

    return (
        <div className={clsx('w-30 h-30 rounded-full flex items-center justify-center text-3xl font-bold text-[var(--text-color)]',
            username ? 'bg-[var(--bg-main-color)] ' : 'bg-[var(--bg-danger)]'
        )}>
            {initial || <UserAddIcon size={50} />}
        </div>
    );
};

export default UserAvatar;
