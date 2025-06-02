import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setStatus } from "@store/callSlice";

export const useLocalMedia = () => {
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [isAudioEnabled, setIsAudioEnabled] = useState(true);
	const [isVideoEnabled, setIsVideoEnabled] = useState(true);
	const [hasAudioTrack, setHasAudioTrack] = useState(false);
	const [hasVideoTrack, setHasVideoTrack] = useState(false);
	const dispatch = useDispatch();

	const getMedia = async (constraints: MediaStreamConstraints) => {
		try {
			return await navigator.mediaDevices.getUserMedia(constraints);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			return null;
		}
	};

	useEffect(() => {
		const init = async () => {
			try {
				const media = await getMedia({ video: true, audio: true });

				if (media) {
					setStream(media);
					return;
				}

				const [videoMedia, audioMedia] = await Promise.all([
					getMedia({ video: true }),
					getMedia({ audio: true }),
				]);

				if (videoMedia || audioMedia) {
					const combinedStream = new MediaStream([
						...(videoMedia?.getVideoTracks() || []),
						...(audioMedia?.getAudioTracks() || []),
					]);
					setStream(combinedStream);
				} else {
					setStream(null);
				}
			} catch (err) {
				console.error("Unexpected error initializing media:", err);
				setStream(null);
			}
		};

		init();
	}, []);

	useEffect(() => {
		if (!stream) {
			setHasAudioTrack(false);
			setHasVideoTrack(false);
			setIsAudioEnabled(false);
			setIsVideoEnabled(false);
			return;
		}

		const audioTrack = stream.getAudioTracks()?.[0];
		const videoTrack = stream.getVideoTracks()?.[0];

		setHasAudioTrack(!!audioTrack);
		setHasVideoTrack(!!videoTrack);
		setIsAudioEnabled(audioTrack?.enabled ?? false);
		setIsVideoEnabled(videoTrack?.enabled ?? false);

		const handleTrackChange = () => {
			setIsAudioEnabled(audioTrack?.enabled ?? false);
			setIsVideoEnabled(videoTrack?.enabled ?? false);
		};

		const addTrackListeners = (track: MediaStreamTrack | undefined) => {
			if (!track) return;
			track.addEventListener("enabled", handleTrackChange);
			track.addEventListener("disabled", handleTrackChange);
		};

		const removeTrackListeners = (track: MediaStreamTrack | undefined) => {
			if (!track) return;
			track.removeEventListener("enabled", handleTrackChange);
			track.removeEventListener("disabled", handleTrackChange);
		};

		addTrackListeners(audioTrack);
		addTrackListeners(videoTrack);

		return () => {
			removeTrackListeners(audioTrack);
			removeTrackListeners(videoTrack);
		};
	}, [stream]);

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
		stream?.getTracks().forEach((track) => track.stop());
		setStream(null);
		dispatch(setStatus("disconnected"));
	}, [dispatch, stream]);

	return {
		stream,
		isAudioEnabled,
		isVideoEnabled,
		hasAudioTrack,
		hasVideoTrack,
		toggleAudio,
		toggleVideo,
		endCall,
	};
};
