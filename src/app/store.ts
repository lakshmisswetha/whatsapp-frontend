import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import userSlice from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import { RootState } from "../features/userSlice";

const saveUserOnlyFilter = createFilter("user", ["user.user"]);

const persistConfig: PersistConfig<RootState> = {
    key: "user",
    storage,
    whitelist: ["user"],
    transforms: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
    user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

    devTools: true,
});

export const persistor = persistStore(store);
