// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, "/login"),
    loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
    register: path(ROOTS_AUTH, "/register"),
    registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
    resetPassword: path(ROOTS_AUTH, "/reset-password"),
    verify: path(ROOTS_AUTH, "/verify")
};

export const PATH_PAGE = {
    comingSoon: "/coming-soon",
    maintenance: "/maintenance",
    about: "/about-us",
    contact: "/contact-us",
    faqs: "/faqs",
    page404: "/404",
    page500: "/500",
    trainer: "/trainer/:email",
    subscribe: "/subscribe/:id",
    subscribeTrainer: "/subscribe-trainer/:id/:type"
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
        app: path(ROOTS_DASHBOARD, "/app")
    },
    user: {
        root: path(ROOTS_DASHBOARD, "/user"),
        profile: path(ROOTS_DASHBOARD, "/user/profile"),
        list: path(ROOTS_DASHBOARD, "/user/list"),
        newUser: path(ROOTS_DASHBOARD, "/user/new"),
        editById: path(ROOTS_DASHBOARD, `/user/edit`),
        account: path(ROOTS_DASHBOARD, "/user/account")
    }
};

export const PATH_DOCS = "https://docs-minimals.vercel.app/introduction";
