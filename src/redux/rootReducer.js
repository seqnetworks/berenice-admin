import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { encryptTransform } from "redux-persist-transform-encrypt"

import authReducer from "./auth/auth.reducer"
import usersReducer from "./users/users.reducer"
import authorizationReducer from "./authorization/authorization.reducer"
import notificationsReducer from "./notifications/notifications.reducer"
import layoutReducer from "./layout/layout.reducer"
import chatReducer from "./chat/chat.reducer"
import followUpReducer from "./follow up/followUp.reducer"
import announcementReducer from "./announcement/announcement.reducer"
import carouselReducer from "./carousel/carousel.reducer"
import assetsReducer from "./assets/assets.reducer"
import consultationReducer from "./consultation/consultation.reducer"
import financeReducer from "./finance/finance.reducer"
import enrollmentReducer from "./enrollment/enrollment.reducer"
import timetableReducer from "./timetable/timetable.reducer"

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "auth",
    "users",
    "authorization",
    "notifications",
    "chat",
    "followUp",
    "announcement",
    "carousel",
    "assets",
    "consultation",
    "finance",
    "enrollment",
    "timetable",
  ],
  transforms: [
    encryptTransform({
      secretKey: "root",
      onError: error => console.log(error),
    }),
  ],
}
//----------AUTH-----------
const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "auth",
      onError: error => console.log(error),
    }),
  ],
}
//----------USERS-----------
const usersPersistConfig = {
  key: "users",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "users",
      onError: error => console.log(error),
    }),
  ],
}
//----------AUTHORIZATION-----------
const authorizationPersistConfig = {
  key: "authorization",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "authorization",
      onError: error => console.log(error),
    }),
  ],
}
//----------NOTIFICATIONS-----------
const notificationsPersistConfig = {
  key: "notifications",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "notifications",
      onError: error => console.log(error),
    }),
  ],
}
//----------CHAT-----------
const chatPersistConfig = {
  key: "chat",
  storage,
  blacklist: ["isLoading", "errorMessages", "selectedChat"],
  transforms: [
    encryptTransform({
      secretKey: "chat",
      onError: error => console.log(error),
    }),
  ],
}
//----------FOLLOWUP-----------
const followUpPersistConfig = {
  key: "followUp",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "followUp",
      onError: error => console.log(error),
    }),
  ],
}
//----------ANNOUNCEMENT-----------
const announcementPersistConfig = {
  key: "announcement",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "announcement",
      onError: error => console.log(error),
    }),
  ],
}
//----------CAROUSEL-----------
const carouselPersistConfig = {
  key: "carousel",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "carousel",
      onError: error => console.log(error),
    }),
  ],
}
//----------ASSETS-----------
const assetsPersistConfig = {
  key: "assets",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "assets",
      onError: error => console.log(error),
    }),
  ],
}
//----------CONSULTATION-----------
const consultationPersistConfig = {
  key: "consultation",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "consultation",
      onError: error => console.log(error),
    }),
  ],
}
//----------FINANCE-----------
const financePersistConfig = {
  key: "finance",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "finance",
      onError: error => console.log(error),
    }),
  ],
}
//----------ENROLLMENT-----------
const enrollmentPersistConfig = {
  key: "enrollment",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "enrollment",
      onError: error => console.log(error),
    }),
  ],
}
//----------TIMETABLE-----------
const timetablePersistConfig = {
  key: "timetable",
  storage,
  blacklist: ["isLoading", "errorMessages"],
  transforms: [
    encryptTransform({
      secretKey: "timetable",
      onError: error => console.log(error),
    }),
  ],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  users: persistReducer(usersPersistConfig, usersReducer),
  authorization: persistReducer(
    authorizationPersistConfig,
    authorizationReducer
  ),
  notifications: persistReducer(
    notificationsPersistConfig,
    notificationsReducer
  ),
  chat: persistReducer(chatPersistConfig, chatReducer),
  followUp: persistReducer(followUpPersistConfig, followUpReducer),
  announcement: persistReducer(announcementPersistConfig, announcementReducer),
  carousel: persistReducer(carouselPersistConfig, carouselReducer),
  assets: persistReducer(assetsPersistConfig, assetsReducer),
  consultation: persistReducer(consultationPersistConfig, consultationReducer),
  finance: persistReducer(financePersistConfig, financeReducer),
  enrollment: persistReducer(enrollmentPersistConfig, enrollmentReducer),
  timetable: persistReducer(timetablePersistConfig, timetableReducer),
  layout: layoutReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
