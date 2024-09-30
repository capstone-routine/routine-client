import { configureStore } from "@reduxjs/toolkit";
// import zoomReducer from "../reducers/zoomReducer";

export const store = configureStore({
    reducer: {
        // zoom: zoomReducer,
    },
});