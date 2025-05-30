import { useUserContext } from "@context/UserContext";
import clsx from "clsx";
import { UserAddIcon } from "./ui/Icons";

const UserAvatar = ({ className }: { className?: string }) => {
    const { username } = useUserContext();
    const initial = username.charAt(0).toUpperCase();

    return (
        <div className={clsx('w-30 h-30 rounded-full flex items-center justify-center text-3xl font-bold text-[var(--header-text)] bg-[var(--bg-main-color)] ',
            className
        )}>
            {initial || <UserAddIcon size={50} />}
        </div>
    );
};

export default UserAvatar;
