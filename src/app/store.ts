import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createFilter from "redux-persist";
import userSlice from "../features/userSlice";
import storage from "redux-persist/lib/storage";

// const saveUserOnlyFilter = createFilter("user", ["user"]);

// const persistConfig = {
//     key: "user",
//     storage,
//     whitelist: ["user"],
//     transforms: [saveUserOnly],
// };

const rootReducer = combineReducers({
    user: userSlice,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export const persistor = persistStore(store);
