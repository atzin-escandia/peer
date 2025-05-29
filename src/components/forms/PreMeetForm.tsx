import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useWebRTC } from "@hooks/useWebRTC";
import { useMediaContext } from "@context/MediaContext";
import { useUserContext } from "@context/UserContext";
import { useNavigate } from "react-router-dom";

const usernameSchema = z.object({
    username: z
        .string()
        .min(3, "At least 3 characters long")
        .max(20, "At most 20 characters long"),
});

type FormData = z.infer<typeof usernameSchema>;

export const PreMeetForm = () => {
    const navigate = useNavigate();
    const { stream } = useMediaContext();
    const { createPeer } = useWebRTC(stream!);
    const { setUsername } = useUserContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(usernameSchema),
        mode: "onChange",
    });

    const onSubmit = async () => {
        await createPeer(true);
        navigate("/meet")
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
                    Join meeting
                </h2>
                <Input
                    title="Your name"
                    placeholder="e.g. Atzin"
                    {...register("username", {
                        onChange: (e) => setUsername(e.target.value),
                    })}
                    error={!!errors.username}
                    errorMessage={errors.username?.message}
                />
                <div className="flex justify-center mt-5">
                    <Button type="submit" disabled={!isValid || !stream}>
                        Start meeting
                    </Button>
                </div>
            </form>
        </div>
    );
};
