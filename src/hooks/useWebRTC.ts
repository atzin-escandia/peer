import Peer from "simple-peer";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
	setRemoteStream,
	setSignalData,
	setStatus,
	resetCall,
	setPeer,
	setMeetingId,
} from "@store/callSlice";

export const useWebRTC = (localStream?: MediaStream) => {
	const dispatch = useDispatch();
	const peerRef = useRef<Peer.Instance | null>(null);
	const ws = useRef<WebSocket | null>(null);
	const pendingSignals = useRef<any[]>([]);
	const currentMeetingId = useRef<string | null>(null);

	const PORT = import.meta.env.VITE_WS_PORT || 3001;
	const WS_URL = import.meta.env.VITE_WS_URL || `ws://localhost:${PORT}`;

	useEffect(() => {
		ws.current = new WebSocket(WS_URL);

		ws.current.onmessage = async (event) => {
			try {
				let text: string;

				if (typeof event.data === "string") {
					text = event.data;
				} else if (event.data instanceof Blob) {
					text = await event.data.text();
				} else if (event.data instanceof ArrayBuffer) {
					text = new TextDecoder().decode(event.data);
				} else {
					throw new Error("Unsupported message data type");
				}

				const data = JSON.parse(text);

				if (
					data?.type === "signal" &&
					data.meetingId === currentMeetingId.current
				) {
					console.log("Received signal for meeting", data.meetingId);
					if (peerRef.current) {
						peerRef.current.signal(data.payload);
					} else {
						pendingSignals.current.push(data.payload);
					}
				}
			} catch (err) {
				console.error("Error", err);
			}
		};

		return () => {
			ws.current?.close();
		};
	}, []);

	const createPeer = (initiator: boolean, meetingId?: string) => {
		if (!localStream) {
			console.warn("No local stream available");
			return;
		}

		dispatch(setStatus("connecting"));

		const id = meetingId || uuidv4();
		currentMeetingId.current = id;
		dispatch(setMeetingId(id));

		const newPeer = new Peer({
			initiator,
			trickle: false,
			stream: localStream,
		});

		newPeer.on("signal", (data) => {
			console.log("Sending signal...", data);
			dispatch(setStatus("available"));
			dispatch(setSignalData(data));

			ws.current?.send(
				JSON.stringify({ type: "signal", payload: data, meetingId: id })
			);
		});

		newPeer.on("stream", (remote) => {
			console.log("Received remote stream");
			dispatch(setRemoteStream(remote));
			dispatch(setStatus("connected"));
		});

		newPeer.on("close", () => {
			console.log("Peer connection closed");
			dispatch(resetCall());
			currentMeetingId.current = null;
		});

		newPeer.on("error", (err) => {
			console.error("Peer error:", err);
			dispatch(resetCall());
			currentMeetingId.current = null;
		});

		// Process any pending signals that arrived before the peer was created
		pendingSignals.current.forEach((sig) => newPeer.signal(sig));
		pendingSignals.current = [];

		peerRef.current = newPeer;
		dispatch(setPeer(newPeer));
	};

	// Function to apply a remote signal manually (optional)
	const applyRemoteSignal = (signalData: any) => {
		try {
			peerRef.current?.signal(signalData);
		} catch (err) {
			console.error("Failed to apply remote signal", err);
		}
	};

	return { createPeer, applyRemoteSignal };
};
