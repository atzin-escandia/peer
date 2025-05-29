import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Peer from "simple-peer";

type CallState = {
	peer?: Peer.Instance;
	localStream?: MediaStream;
	remoteStream?: MediaStream;
	signalData?: any;
	status: "idle" | "connecting" | "connected" | "disconnected";
};

const initialState: CallState = {
	status: "idle",
};

const callSlice = createSlice({
	name: "call",
	initialState,
	reducers: {
		setPeer(state, action: PayloadAction<Peer.Instance>) {
			state.peer = action.payload;
		},
		setLocalStream(state, action: PayloadAction<MediaStream>) {
			state.localStream = action.payload;
		},
		setRemoteStream(state, action: PayloadAction<MediaStream>) {
			state.remoteStream = action.payload;
		},
		setSignalData(state, action: PayloadAction<any>) {
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
	setPeer,
	setLocalStream,
	setRemoteStream,
	setSignalData,
	setStatus,
	resetCall,
} = callSlice.actions;

export default callSlice.reducer;
