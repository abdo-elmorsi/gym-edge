import {
    NavLink as RouterLink,
    useLocation,
    useNavigate
} from "react-router-dom";
import { Icon } from "@iconify/react";
import Settings from "@iconify/icons-eva/settings-2-fill";
// material
import { styled } from "@material-ui/core/styles";
import { Box, Button, AppBar, Toolbar, Container } from "@material-ui/core";
// hooks
import useAuth from "../../hooks/useAuth";
import useOffSetTop from "../../hooks/useOffSetTop";
// components
import Logo from "../../components/Logo";
import Label from "../../components/Label";
import { MHidden } from "../../components/@material-extend";
//
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import navConfig from "./MenuConfig";
import { PATH_DASHBOARD, PATH_AUTH } from "../../routes/paths";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    height: APP_BAR_MOBILE,
    transition: theme.transitions.create(["height", "background-color"], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    [theme.breakpoints.up("md")]: {
        height: APP_BAR_DESKTOP
    }
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
    left: 0,
    right: 0,
    bottom: 0,
    height: 24,
    zIndex: -1,
    margin: "auto",
    borderRadius: "50%",
    position: "absolute",
    width: `calc(100% - 48px)`,
    boxShadow: theme.customShadows.z8
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
    const isOffset = useOffSetTop(100);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isHome = pathname === "/";
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <AppBar sx={{ boxShadow: 0, bgcolor: "transparent" }}>
            <ToolbarStyle
                disableGutters
                sx={{
                    ...(isOffset && {
                        bgcolor: "background.default",
                        height: { md: APP_BAR_DESKTOP - 16 }
                    })
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <RouterLink to="/">
                        <Logo />
                    </RouterLink>
                    <Label color="info" sx={{ ml: 1 }}>
                        v2.5.0
                    </Label>
                    <Box sx={{ flexGrow: 1 }} />

                    <MHidden width="mdDown">
                        <MenuDesktop
                            isOffset={isOffset}
                            isHome={isHome}
                            navConfig={navConfig}
                        />
                    </MHidden>

                    {isAuthenticated ? (
                        <>
                            <Button
                                size="small"
                                variant="contained"
                                component={RouterLink}
                                to={PATH_DASHBOARD.root}
                                startIcon={
                                    <Icon
                                        icon={Settings}
                                        width={15}
                                        height={15}
                                    />
                                }
                            >
                                Dashboard
                            </Button>
                        </>
                    ) : (
                        <Button
                            size="small"
                            variant="contained"
                            component={RouterLink}
                            to={PATH_AUTH.login}
                            startIcon={
                                <Icon icon={Settings} width={15} height={15} />
                            }
                        >
                            Login
                        </Button>
                    )}

                    {/* <RouterLink to={PATH_DASHBOARD.root}>
            <Button variant="contained">Dashboard</Button>
          </RouterLink> */}

                    <MHidden width="mdUp">
                        <MenuMobile
                            isOffset={isOffset}
                            isHome={isHome}
                            navConfig={navConfig}
                        />
                    </MHidden>
                </Container>
            </ToolbarStyle>

            {isOffset && <ToolbarShadowStyle />}
        </AppBar>
    );
}
