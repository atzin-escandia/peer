import { useThemeContext } from "@context/ThemeContext";
import { MoonIcon, SunIcon } from "@components/ui/Icons";

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <button onClick={toggleTheme} >
            {theme === "light" ? <MoonIcon className="w-5 h-5 cursor-pointer hover:opacity-60" /> :
                <SunIcon className="w-5 h-5 cursor-pointer hover:opacity-60" />
            }
        </button>
    );
};

export default ThemeToggleButton;
