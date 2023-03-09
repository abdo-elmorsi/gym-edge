import { Icon } from "@iconify/react";
import { capitalCase } from "change-case";
import { useState } from "react";
import roundAccountBox from "@iconify/icons-ic/round-account-box";
// material
import { styled } from "@material-ui/core/styles";
import { Tab, Box, Card, Tabs, Container } from "@material-ui/core";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import {
    Profile,
    ProfileCover
} from "../../components/_dashboard/user/profile";

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled("div")(({ theme }) => ({
    zIndex: 9,
    bottom: 0,
    width: "100%",
    display: "flex",
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("sm")]: {
        justifyContent: "center"
    },
    [theme.breakpoints.up("md")]: {
        justifyContent: "flex-end",
        paddingRight: theme.spacing(3)
    }
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
    const { themeStretch } = useSettings();
    const { user } = useAuth();
    const [currentTab, setCurrentTab] = useState("profile");
    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
    };

    if (!user) {
        return null;
    }

    const PROFILE_TABS = [
        {
            value: "profile",
            icon: <Icon icon={roundAccountBox} width={20} height={20} />,
            component: <Profile myProfile={user} />
        }
    ];

    return (
        <Page title="User: Profile | Easier">
            <Container maxWidth={themeStretch ? false : "lg"}>
                <HeaderBreadcrumbs
                    heading="Profile"
                    links={[
                        { name: "Dashboard", href: PATH_DASHBOARD.root },
                        { name: "User", href: PATH_DASHBOARD.user.root },
                        { name: user.name }
                    ]}
                />
                <Card
                    sx={{
                        mb: 3,
                        height: 280,
                        position: "relative"
                    }}
                >
                    <ProfileCover myProfile={user} />

                    <TabsWrapperStyle>
                        <Tabs
                            value={currentTab}
                            scrollButtons="auto"
                            variant="scrollable"
                            allowScrollButtonsMobile
                            onChange={handleChangeTab}
                        >
                            {PROFILE_TABS.map((tab) => (
                                <Tab
                                    disableRipple
                                    key={tab.value}
                                    value={tab.value}
                                    icon={tab.icon}
                                    label={capitalCase(tab.value)}
                                />
                            ))}
                        </Tabs>
                    </TabsWrapperStyle>
                </Card>

                {PROFILE_TABS.map((tab) => {
                    const isMatched = tab.value === currentTab;
                    return (
                        isMatched && <Box key={tab.value}>{tab.component}</Box>
                    );
                })}
            </Container>
        </Page>
    );
}
