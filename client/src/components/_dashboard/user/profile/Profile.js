import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
// material
import { Grid, Stack } from "@material-ui/core";
//
import ProfileAbout from "./ProfileAbout";
import ProfileSubscribe from "./ProfileSubscribe";
import ProfileSubscribeWithTrainer from "./ProfileSubscribeWithTrainer";
import ProfileSocialInfo from "./ProfileSocialInfo";
import useAuth from "../../../../hooks/useAuth";
import httpRequest from "../../../../utils/httpRequest";
import LoadingScreen from "../../../../components/LoadingScreen";

// ----------------------------------------------------------------------

Profile.propTypes = {
    myProfile: PropTypes.object
};

export default function Profile({ myProfile }) {
    const [CurrentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const getCurrentUser = async () => {
        try {
            const { data } = await httpRequest({
                method: "GET",
                url: `users/${user._id}`
            });
            setCurrentUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getCurrentUser();
    }, []);
    return (
        <Grid container spacing={3}>
            {loading ? (
                <div>
                    <LoadingScreen />
                </div>
            ) : (
                <>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={3}>
                            {/* <ProfileFollowInfo profile={myProfile} /> */}
                            <ProfileAbout profile={myProfile} />
                            <ProfileSocialInfo profile={myProfile} />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Stack spacing={3}>
                            <ProfileSubscribe
                                subscribe={CurrentUser?.subscribe}
                            />
                            <Stack spacing={3}>
                                <ProfileSubscribeWithTrainer
                                    subscribe={CurrentUser?.private}
                                />
                            </Stack>
                        </Stack>
                    </Grid>
                </>
            )}
        </Grid>
    );
}
