import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "@components/ui/Textarea";

import { useMediaContext } from "@context/MediaContext";
import { useUserContext } from "@context/UserContext";
import { useNavigate } from "react-router-dom";
import { VITE_HTTP_URL } from "@utils/index";

const joinMeetSchema = z.object({
    username: z
        .string()
        .min(3, "At least 3 characters long")
        .max(20, "At most 20 characters long"),
    link: z.string().min(1, "Please enter a link"),
});

type FormData = z.infer<typeof joinMeetSchema>;

export const JoinMeetForm = () => {
    const { stream } = useMediaContext();
    const { setUsername, username } = useUserContext();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(joinMeetSchema),
        mode: "onChange",
        defaultValues: {
            username: username || "",
            link: "",
        },
    });

    const onSubmit = (data: FormData) => {
        setUsername(data.username);
        let link = data.link?.trim() || "";

        if (link.includes(VITE_HTTP_URL)) {
            link = link.replace(VITE_HTTP_URL, "").trim();
        }

        const match = link.match(/\/meet\/([^/]+)/);
        const newMeetingId = match ? match[1] : null;

        if (newMeetingId) {
            navigate(`/meet/${newMeetingId}`);
        } else {
            setError("link", {
                type: "manual",
                message: "Invalid meeting link. Please enter a valid URL.",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="gap-10 space-y-5">
                <h2 className="text-4xl font-bold mb-6 text-center">
                    Join meeting
                </h2>
                <Input
                    title="Your name"
                    placeholder="Name"
                    {...register("username", {
                        onChange: (e) => setUsername(e.target.value),
                    })}
                    error={!!errors.username}
                    errorMessage={errors.username?.message}
                />
                <Textarea
                    title="Enter link"
                    placeholder="Enter link"
                    {...register("link")}
                    error={!!errors.link}
                    errorMessage={errors.link?.message}
                />
                <div className="flex justify-center mt-5">
                    <Button type="submit" disabled={!isValid || !stream}>
                        Join Call
                    </Button>
                </div>
            </form>
        </div>
    );
};
