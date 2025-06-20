import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { LogoIcon } from "./Icons";
import ThemeToggleButton from "@components/ThemeToggle";

export const Header = () => {
    const location = useLocation();
    const hideHeader = /^\/meet\/[^/]+$/.test(location.pathname);

    if (hideHeader) return null;

    return (
        <header className="fixed px-10  w-full z-10 h-[60px] bg-[var(--header-bg)] text-[var(--header-text)] border-b border-[var(--border-color)]">
            <div className="h-full flex justify-between items-center ">
                <Link className="flex items-center" to="/">
                    <LogoIcon size={40} />
                    <h1 className="ml-2 whitespace-nowrap hidden sm:block font-extrabold text-xl md:text-2xl lg:text-3xl">
                        PeerMeet
                    </h1>
                </Link>
                <div className="flex gap-2 sm:gap-5">
                    <ThemeToggleButton />
                </div>
            </div>
        </header>
    );
};
