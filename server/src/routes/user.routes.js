import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    getUserChannelProfile,
    getWatchHistory,
    loginUser,
    logOutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkUser } from "../middlewares/openAuth.middleware.js";

const router = Router();

router.route("/register").post(registerUser); // Multer moved to app.js

router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router.route("/avatar").patch(verifyJWT, updateUserAvatar);
router.route("/cover-image").patch(verifyJWT, updateUserCoverImage);

router.route("/c/:username").get(checkUser, getUserChannelProfile);
router.route("/history").get(verifyJWT, getWatchHistory);

export default router;