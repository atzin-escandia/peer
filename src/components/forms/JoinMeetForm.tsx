import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "@components/ui/Textarea";

import { useMediaContext } from "@context/MediaContext";
import { useUserContext } from "@context/UserContext";

const joinMeetSchema = z.object({
    username: z
        .string()
        .min(3, "At least 3 characters long")
        .max(20, "At most 20 characters long"),
    newCode: z.string().min(1, "Please enter a code"),
});

type FormData = z.infer<typeof joinMeetSchema>;

type JoinMeetFormProps = {
    createPeer: (isOffer: boolean, code?: string) => void;
};

export const JoinMeetForm = ({ createPeer }: JoinMeetFormProps) => {
    const { stream } = useMediaContext();
    const { setUsername, username } = useUserContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(joinMeetSchema),
        mode: "onChange",
        defaultValues: {
            username: username || "",
            newCode: "",
        },
    });

    const onSubmit = (data: FormData) => {
        setUsername(data.username);
        createPeer(false, data.newCode);
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="gap-10 space-y-5">
                <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
                    Join meeting
                </h2>
                <Input
                    title="Your name"
                    placeholder="e.g. Atzin"
                    {...register("username")}
                    error={!!errors.username}
                    errorMessage={errors.username?.message}
                />
                <Textarea
                    title="Enter code"
                    placeholder="Enter code"
                    {...register("newCode")}
                    error={!!errors.newCode}
                    errorMessage={errors.newCode?.message}
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
