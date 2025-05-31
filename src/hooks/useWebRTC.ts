import Peer from "simple-peer";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import {
	setRemoteStream,
	setSignalData,
	setStatus,
	resetCall,
} from "@store/callSlice";

export const useWebRTC = (localStream?: MediaStream) => {
	const dispatch = useDispatch();
	const peerRef = useRef<Peer.Instance | null>(null);

	useEffect(() => {
		return () => {
			if (peerRef.current) {
				peerRef.current.destroy();
				dispatch(resetCall());
			}
		};
	}, [dispatch]);

	const createPeer = (initiator: boolean) => {
		if (!localStream) {
			console.warn("No local stream available");
			return;
		}

		dispatch(setStatus("connecting"));

		const newPeer = new Peer({
			initiator,
			trickle: false,
			stream: localStream,
		});

		newPeer.on("signal", (data) => {
			console.log("Generated signal...", data);
			dispatch(setSignalData(data));
			dispatch(setStatus("available"));
		});

		newPeer.on("stream", (remote) => {
			console.log("Received remote stream");
			dispatch(setRemoteStream(remote));
			dispatch(setStatus("connected"));
		});

		newPeer.on("close", () => {
			console.log("Peer connection closed");
			dispatch(resetCall());
		});

		newPeer.on("error", (err) => {
			console.error("Peer error:", err);
			dispatch(resetCall());
		});

		peerRef.current = newPeer;
	};

	const applyRemoteSignal = (signalData: Peer.SignalData) => {
		try {
			console.log("Applying remote signal...");
			peerRef.current?.signal(signalData);
		} catch (err) {
			console.error("Failed to apply remote signal", err);
		}
	};

	return { createPeer, applyRemoteSignal };
};
