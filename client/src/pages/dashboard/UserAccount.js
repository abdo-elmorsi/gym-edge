import { Icon } from "@iconify/react";
import { capitalCase } from "change-case";
import { useState } from "react";
import roundVpnKey from "@iconify/icons-ic/round-vpn-key";
import roundAccountBox from "@iconify/icons-ic/round-account-box";
// material
import { Container, Tab, Box, Tabs, Stack } from "@material-ui/core";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import {
    AccountGeneral,
    AccountChangePassword
} from "../../components/_dashboard/user/account";

// ----------------------------------------------------------------------

export default function UserAccount() {
    const { themeStretch } = useSettings();
    const [currentTab, setCurrentTab] = useState("general");

    const ACCOUNT_TABS = [
        {
            value: "general",
            icon: <Icon icon={roundAccountBox} width={20} height={20} />,
            component: <AccountGeneral />
        },
        {
            value: "change_password",
            icon: <Icon icon={roundVpnKey} width={20} height={20} />,
            component: <AccountChangePassword />
        }
    ];

    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Page title="User: Account Settings | Gym-Edge">
            <Container maxWidth={themeStretch ? false : "lg"}>
                <HeaderBreadcrumbs
                    heading="Account"
                    links={[
                        { name: "Dashboard", href: PATH_DASHBOARD.root },
                        { name: "User", href: PATH_DASHBOARD.user.root },
                        { name: "Account Settings" }
                    ]}
                />

                <Stack spacing={5}>
                    <Tabs
                        value={currentTab}
                        scrollButtons="auto"
                        variant="scrollable"
                        allowScrollButtonsMobile
                        onChange={handleChangeTab}
                    >
                        {ACCOUNT_TABS.map((tab) => (
                            <Tab
                                disableRipple
                                key={tab.value}
                                label={capitalCase(tab.value)}
                                icon={tab.icon}
                                value={tab.value}
                            />
                        ))}
                    </Tabs>

                    {ACCOUNT_TABS.map((tab) => {
                        const isMatched = tab.value === currentTab;
                        return (
                            isMatched && (
                                <Box key={tab.value}>{tab.component}</Box>
                            )
                        );
                    })}
                </Stack>
            </Container>
        </Page>
    );
}
