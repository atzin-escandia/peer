import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useUserContext } from "@context/UserContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const usernameSchema = z.object({
    username: z
        .string()
        .min(3, "At least 3 characters long")
        .max(20, "At most 20 characters long"),
});

type FormData = z.infer<typeof usernameSchema>;

export const StartMeetForm = () => {
    const { username, setUsername } = useUserContext();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(usernameSchema),
        mode: "onChange",
        defaultValues: {
            username: username || "",
        },
    });

    const onSubmit = () => {
        const newMeetingId = uuidv4();
        navigate(`/meet/${newMeetingId}`);
    };

    return (
        <div className="flex flex-col items-center justify-center md:mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="mb-6 text-center hidden md:flex text-4xl font-bold">
                    Start meeting
                </h3>
                <Input
                    title="Your name"
                    placeholder="Name"
                    {...register("username", {
                        onChange: (e) => setUsername(e.target.value),
                    })}
                    error={!!errors.username}
                    errorMessage={errors.username?.message}
                />
                <div className="flex justify-center mt-5">
                    <Button type="submit" disabled={!isValid}>
                        Start meeting
                    </Button>
                </div>
            </form>
        </div>
    );
};
