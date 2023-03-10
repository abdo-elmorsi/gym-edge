import React from "react";
import { useParams, useLocation } from "react-router-dom";
// material
import { Container } from "@material-ui/core";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import UserNewForm from "../../components/_dashboard/user/UserNewForm";

// ----------------------------------------------------------------------

export default function UserCreate() {
    const { themeStretch } = useSettings();
    const { pathname } = useLocation();
    const { name, id } = useParams();
    const isEdit = pathname.includes("edit");

    return (
        <Page title="User: Create a new user | Gym-Edge">
            <Container maxWidth={themeStretch ? false : "lg"}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? "Create a new user" : "Edit user"}
                    links={[
                        { name: "Dashboard", href: PATH_DASHBOARD.root },
                        { name: "User", href: PATH_DASHBOARD.user.root },
                        {
                            name: !isEdit
                                ? "New user"
                                : name
                                ? name.slice(1)
                                : ""
                        }
                    ]}
                />

                <UserNewForm isEdit={isEdit} id={id ? id.slice(1) : ""} />
            </Container>
        </Page>
    );
}
