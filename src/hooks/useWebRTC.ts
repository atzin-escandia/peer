import Peer from "simple-peer";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@store/index";

import {
	setPeer,
	setRemoteStream,
	setSignalData,
	setStatus,
	resetCall,
} from "@store/callSlice";

export const useWebRTC = (localStream?: MediaStream) => {
	const dispatch = useDispatch();
	const peer = useSelector((state: RootState) => state.call.peer);

	const createPeer = (initiator: boolean) => {
		if (!localStream) return;

		const newPeer = new Peer({
			initiator,
			trickle: false,
			stream: localStream,
		});

		newPeer.on("signal", (data) => {
			console.log("SIGNAL COPY ME:", JSON.stringify(data));
			dispatch(setSignalData(data));
		});

		newPeer.on("stream", (remote) => {
			dispatch(setRemoteStream(remote));
			dispatch(setStatus("connected"));
		});

		newPeer.on("close", () => {
			dispatch(resetCall());
		});

		dispatch(setPeer(newPeer));
		dispatch(setStatus("connecting"));
	};

	const applyRemoteSignal = (data: any) => {
		try {
			peer?.signal(data);
		} catch (err) {
			console.error("Invalid signal data", err);
		}
	};

	return { createPeer, applyRemoteSignal };
};
