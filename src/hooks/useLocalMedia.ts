import { setStatus } from "@store/callSlice";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export const useLocalMedia = () => {
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [isAudioEnabled, setIsAudioEnabled] = useState(true);
	const [isVideoEnabled, setIsVideoEnabled] = useState(true);
	const [audioError, setAudioError] = useState<string | null>(null);
	const [videoError, setVideoError] = useState<string | null>(null);
	const dispatch = useDispatch();

	const getMedia = async (constraints: MediaStreamConstraints) => {
		try {
			return await navigator.mediaDevices.getUserMedia(constraints);
		} catch (err) {
			return null;
		}
	};

	const setErrorMessages = (audio: boolean, video: boolean) => {
		if (!audio) setAudioError("Access to microphone denied");
		else setAudioError(null);

		if (!video) setVideoError("Access to camera denied");
		else setVideoError(null);
	};

	useEffect(() => {
		const init = async () => {
			try {
				const media = await getMedia({ video: true, audio: true });

				if (media) {
					setStream(media);
					setErrorMessages(true, true);
					return;
				}

				const videoMedia = await getMedia({ video: true });
				const audioMedia = await getMedia({ audio: true });

				if (videoMedia || audioMedia) {
					const combinedStream = new MediaStream([
						...(videoMedia?.getVideoTracks() || []),
						...(audioMedia?.getAudioTracks() || []),
					]);
					setStream(combinedStream);
					setErrorMessages(!!audioMedia, !!videoMedia);
				} else {
					setStream(null);
					setErrorMessages(false, false);
				}
			} catch (err: unknown) {
				console.error("Unexpected error initializing media:", err);
				setStream(null);
				setErrorMessages(false, false);
			}
		};

		init();
	}, []);

	const toggleAudio = useCallback(() => {
		if (!stream) return;
		stream
			.getAudioTracks()
			.forEach((track) => (track.enabled = !track.enabled));
		setIsAudioEnabled((prev) => !prev);
	}, [stream]);

	const toggleVideo = useCallback(() => {
		if (!stream) return;
		stream
			.getVideoTracks()
			.forEach((track) => (track.enabled = !track.enabled));
		setIsVideoEnabled((prev) => !prev);
	}, [stream]);

	const endCall = useCallback(() => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			setStream(null);
		}
		dispatch(setStatus("disconnected"));
	}, [stream]);

	return {
		stream,
		isAudioEnabled,
		isVideoEnabled,
		toggleAudio,
		toggleVideo,
		endCall,
		audioError,
		videoError,
	};
};
