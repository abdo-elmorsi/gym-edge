import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Card,
    Link,
    Stack,
    Button,
    Divider,
    Container,
    Typography
} from "@material-ui/core";
import { useTheme, styled, alpha } from "@material-ui/core/styles";
import { Icon } from "@iconify/react";
import checkmarkFill from "@iconify/icons-eva/checkmark-fill";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import {
    varFadeIn,
    varFadeInUp,
    MotionInView,
    varFadeInDown
} from "../../animate";
import httpRequest from "../../../utils/httpRequest";
import ImageBox from "../../../components/ImageBox";
const RootStyle = styled("div")(({ theme }) => ({
    paddingTop: theme.spacing(15),
    [theme.breakpoints.up("md")]: {
        paddingBottom: theme.spacing(15)
    }
}));

const LICENSES = ["Standard", "Standard Plus", "Extended"];

const PLANS = [...Array(3)].map((_, index) => ({
    license: LICENSES[index],
    options: ["JavaScript version", "TypeScript version", "Design Resources"]
}));

PlanCard.propTypes = {
    pckg: PropTypes.object,
    cardIndex: PropTypes.number,
    plan: PropTypes.shape({
        license: PropTypes.any,
        options: PropTypes.arrayOf(PropTypes.string)
    })
};

function PlanCard({ pckg, plan, cardIndex }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const { user, isAuthenticated } = useAuth();
    const { license } = plan;
    const isLight = theme.palette.mode === "light";

    const handleSub = (id) => {
        if (isAuthenticated) {
            navigate(`/subscribe-trainer/${id}/${pckg?._id}`);
        } else {
            navigate("/auth/login");
        }
    };
    return (
        <Card
            sx={{
                p: 5,
                boxShadow: (theme) =>
                    `0px 48px 80px ${alpha(
                        isLight
                            ? theme.palette.grey[500]
                            : theme.palette.common.black,
                        0.12
                    )}`,
                ...(cardIndex === 1 && {
                    boxShadow: (theme) =>
                        `0px 48px 80px ${alpha(
                            isLight
                                ? theme.palette.grey[500]
                                : theme.palette.common.black,
                            0.48
                        )}`
                })
            }}
        >
            <Stack spacing={5}>
                <div>
                    <Typography
                        variant="overline"
                        sx={{ mb: 2, color: "text.disabled", display: "block" }}
                    >
                        LICENSE
                    </Typography>
                    <Typography variant="h4">{license}</Typography>
                </div>
                <Stack spacing={2.5}>
                    <Stack spacing={1.5} direction="row" alignItems="center">
                        <Box
                            component={Icon}
                            icon={checkmarkFill}
                            sx={{
                                color: "primary.main",
                                width: 20,
                                height: 20
                            }}
                        />
                        <Typography variant="body2">{`Price ${pckg?.price}$`}</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2.5}>
                    <Stack spacing={1.5} direction="row" alignItems="center">
                        <Box
                            component={Icon}
                            icon={checkmarkFill}
                            sx={{
                                color: "primary.main",
                                width: 20,
                                height: 20
                            }}
                        />
                        <Typography variant="body2">{`${pckg?.duration} months`}</Typography>
                    </Stack>
                </Stack>

                <Button
                    onClick={() => handleSub(pckg?._id)}
                    size="large"
                    fullWidth
                    variant={cardIndex === 1 ? "contained" : "outlined"}
                >
                    Choose Plan
                </Button>
            </Stack>
        </Card>
    );
}

const Trainer = () => {
    const { email } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [Trainer, setTrainer] = useState({});
    const [packages, setPackages] = useState([]);

    const [loading, setLoading] = useState(true);
    const getTrainer = async () => {
        try {
            const response = await httpRequest({
                method: "GET",
                url: `trainers/${email}`
            });
            const data = response.data.trainer;
            setTrainer(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const getPackages = async () => {
        try {
            const response = await httpRequest({
                method: "GET",
                url: "privatePackage"
            });
            const data = response.data;
            console.log(data);
            setPackages(data?.packages || []);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    // console.log(packages);
    useEffect(() => {
        getPackages();
        getTrainer();
    }, []);
    return (
        <RootStyle>
            <Container maxWidth="lg">
                {loading ? (
                    <span>loading</span>
                ) : (
                    <Stack spacing={2}>
                        <Stack spacing={2}>
                            <Card
                                style={{ cursor: "pointer" }}
                                sx={{ p: 1, mx: 1.5 }}
                            >
                                <Grid container spacing={5}>
                                    <Grid item xs={12} md={6}>
                                        <ImageBox
                                            alt="Trainer"
                                            src={`trainers/${"default.jpg"}`}
                                        >
                                            <Box
                                                component="img"
                                                src={`http://localhost:3001/img/trainers/${Trainer.image}`}
                                                sx={{
                                                    width: "300px",
                                                    height: "300px",
                                                    borderRadius: 1.5,
                                                    margin: "auto"
                                                }}
                                            />
                                        </ImageBox>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ mt: 2, mb: 0.5 }}
                                        >
                                            {Trainer.name}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ mt: 2, mb: 0.5 }}
                                        >
                                            {Trainer.email}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ mt: 2, mb: 0.5 }}
                                        >
                                            {Trainer.phone}
                                        </Typography>

                                        <Typography
                                            variant="subtitle1"
                                            sx={{ mt: 2, mb: 0.5 }}
                                        >
                                            Skills
                                        </Typography>
                                        {Trainer?.skills?.map((skill) => {
                                            return (
                                                <Typography
                                                    key={skill}
                                                    variant=""
                                                    sx={{ mr: 2 }}
                                                >
                                                    {skill}
                                                </Typography>
                                            );
                                        })}
                                    </Grid>
                                </Grid>
                            </Card>
                        </Stack>

                        <Grid container spacing={5}>
                            {PLANS.map((plan, index) => (
                                <Grid key={plan.license} item xs={12} md={4}>
                                    <MotionInView
                                        variants={
                                            index === 1
                                                ? varFadeInDown
                                                : varFadeInUp
                                        }
                                    >
                                        <PlanCard
                                            pckg={packages[index] || {}}
                                            plan={plan}
                                            cardIndex={index}
                                        />
                                    </MotionInView>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                )}
            </Container>
        </RootStyle>
    );
};
export default Trainer;
