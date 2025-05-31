import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Peer from "simple-peer";

type CallState = {
	peer?: Peer.Instance;
	localStream?: MediaStream;
	remoteStream?: MediaStream;
	signalData?: Peer.SignalData;
	status: "idle" | "connecting" | "connected" | "disconnected" | "available";
};

const initialState: CallState = {
	status: "idle",
};

const callSlice = createSlice({
	name: "call",
	initialState,
	reducers: {
		setLocalStream(state, action: PayloadAction<MediaStream>) {
			state.localStream = action.payload;
		},
		setRemoteStream(state, action: PayloadAction<MediaStream>) {
			state.remoteStream = action.payload;
		},
		setSignalData(state, action: PayloadAction<Peer.SignalData>) {
			state.signalData = action.payload;
		},
		setStatus(state, action: PayloadAction<CallState["status"]>) {
			state.status = action.payload;
		},
		resetCall(state) {
			if (state.peer) state.peer.destroy();
			return initialState;
		},
	},
});

export const {
	setLocalStream,
	setRemoteStream,
	setSignalData,
	setStatus,
	resetCall,
} = callSlice.actions;

export default callSlice.reducer;
