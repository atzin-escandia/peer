import { useMediaContext } from "@context/MediaContext";
import { useEffect, useState } from "react";

export const useTrackStatus = () => {
	const [hasAudioTrack, setHasAudioTrack] = useState(false);
	const [hasVideoTrack, setHasVideoTrack] = useState(false);
	const [audioTrackEnabled, setAudioTrackEnabled] = useState(false);
	const [videoTrackEnabled, setVideoTrackEnabled] = useState(false);
	const { stream } = useMediaContext();

	useEffect(() => {
		if (!stream) {
			setHasAudioTrack(false);
			setHasVideoTrack(false);
			setAudioTrackEnabled(false);
			setVideoTrackEnabled(false);
			return;
		}

		const audio = stream.getAudioTracks()?.[0];
		const video = stream.getVideoTracks()?.[0];

		setHasAudioTrack(!!audio);
		setHasVideoTrack(!!video);
		setAudioTrackEnabled(audio?.enabled ?? false);
		setVideoTrackEnabled(video?.enabled ?? false);

		const handleChange = () => {
			setAudioTrackEnabled(audio?.enabled ?? false);
			setVideoTrackEnabled(video?.enabled ?? false);
		};

		audio?.addEventListener("enabled", handleChange);
		audio?.addEventListener("disabled", handleChange);
		video?.addEventListener("enabled", handleChange);
		video?.addEventListener("disabled", handleChange);

		return () => {
			audio?.removeEventListener("enabled", handleChange);
			audio?.removeEventListener("disabled", handleChange);
			video?.removeEventListener("enabled", handleChange);
			video?.removeEventListener("disabled", handleChange);
		};
	}, [stream]);

	return {
		audioTrackEnabled,
		videoTrackEnabled,
		hasAudioTrack,
		hasVideoTrack,
	};
};
