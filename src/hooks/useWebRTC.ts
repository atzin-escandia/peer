import Peer from "simple-peer";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
	setRemoteStream,
	setSignalData,
	setStatus,
	resetCall,
} from "@store/callSlice";

export const useWebRTC = (localStream?: MediaStream) => {
	const dispatch = useDispatch();
	const peerRef = useRef<Peer.Instance | null>(null);
	const ws = useRef<WebSocket | null>(null);
	const pendingSignals = useRef<any[]>([]);

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

				if (data?.type === "signal") {
					console.log("Received...");
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

	const createPeer = (initiator: boolean) => {
		if (!localStream) return;

		const newPeer = new Peer({
			initiator,
			trickle: false,
			stream: localStream,
		});

		newPeer.on("signal", (data) => {
			console.log("Emitting...");
			dispatch(setSignalData(data));
			ws.current?.send(JSON.stringify({ type: "signal", payload: data }));
		});

		newPeer.on("stream", (remote) => {
			console.log("Received...");
			dispatch(setRemoteStream(remote));
			dispatch(setStatus("connected"));
		});

		newPeer.on("close", () => {
			console.log("Call ended!");
			dispatch(resetCall());
		});

		pendingSignals.current.forEach((sig) => newPeer.signal(sig));
		pendingSignals.current = [];

		peerRef.current = newPeer;
		dispatch(setStatus("connecting"));
	};

	const applyRemoteSignal = (data: any) => {
		try {
			peerRef.current?.signal(data);
		} catch (err) {
			console.error("Faileeeeed", err);
		}
	};

	return { createPeer, applyRemoteSignal };
};
