import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { Icon } from "@iconify/react";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import linkedinFill from "@iconify/icons-eva/linkedin-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
import roundArrowRightAlt from "@iconify/icons-ic/round-arrow-right-alt";
import instagramFilled from "@iconify/icons-ant-design/instagram-filled";
// material
import { useTheme } from "@material-ui/core/styles";
import {
    Box,
    Card,
    Button,
    Container,
    Typography,
    IconButton
} from "@material-ui/core";
// utils
import mockData from "../../../utils/mock-data";
import httpRequest from "../../../utils/httpRequest";
//
import {
    varFadeIn,
    varFadeInUp,
    MotionInView,
    varFadeInDown
} from "../../animate";
import { CarouselControlsArrowsBasic2 } from "../../carousel";
import ImageBox from "../../../components/ImageBox";
import { PATH_PAGE } from "../../../routes/paths";
import { useNavigate } from "react-router";

// ----------------------------------------------------------------------

MemberCard.propTypes = {
    member: PropTypes.shape({
        id: PropTypes.string,
        image: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.string
    })
};

function MemberCard({ member }) {
    const navigate = useNavigate();
    const { name, image, _id, email } = member;

    const handleSub = () => {
        navigate(`/trainer/${email}`);
    };
    return (
        <Card
            style={{ cursor: "pointer" }}
            onClick={handleSub}
            key={name}
            sx={{ p: 1, mx: 1.5 }}
        >
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
                {name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                Trainer
            </Typography>
            <ImageBox alt="Trainer" src={`trainers/${image}`}>
                <Box
                    component="img"
                    src={`http://localhost:3001/img/trainers/${image}`}
                    sx={{ width: "100%", borderRadius: 1.5 }}
                />
            </ImageBox>
            <Box sx={{ mt: 2, mb: 1 }}>
                {[facebookFill, instagramFilled, linkedinFill, twitterFill].map(
                    (social, index) => (
                        <IconButton key={index}>
                            <Icon icon={social} width={20} height={20} />
                        </IconButton>
                    )
                )}
            </Box>
        </Card>
    );
}

export default function AboutTeam() {
    const carouselRef = useRef();
    const theme = useTheme();

    const settings = {
        slidesToShow: 4,
        centerMode: true,
        centerPadding: "0 80px",
        rtl: Boolean(theme.direction === "rtl"),
        responsive: [
            {
                breakpoint: 1279,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 959,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    const handlePrevious = () => carouselRef.current.slickPrev();

    const handleNext = () => carouselRef.current.slickNext();

    const [trainers, setTrainers] = useState({});
    const [loading, setLoading] = useState(true);
    const getSubscription = async () => {
        try {
            const { data } = await httpRequest({
                method: "GET",
                url: `trainers`
            });
            setTrainers(data.trainers);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getSubscription();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ pb: 10, textAlign: "center" }}>
            <MotionInView variants={varFadeInDown}>
                <Typography
                    component="p"
                    variant="overline"
                    sx={{ mb: 2, color: "text.secondary" }}
                >
                    Dream team
                </Typography>
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
                <Typography variant="h2" sx={{ mb: 3 }}>
                    Great team is the key
                </Typography>
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
                <Typography
                    sx={{
                        mb: 10,
                        mx: "auto",
                        maxWidth: 630,
                        color: (theme) =>
                            theme.palette.mode === "light"
                                ? "text.secondary"
                                : "common.white"
                    }}
                >
                    Gym Edge will provide you support if you have any problems,
                    our support team will reply within a day.
                </Typography>
            </MotionInView>

            <Box sx={{ position: "relative" }}>
                <Slider ref={carouselRef} {...settings}>
                    {loading ? (
                        <div>loading</div>
                    ) : (
                        trainers?.map((member) => (
                            <MotionInView key={member._id} variants={varFadeIn}>
                                <MemberCard member={member} />
                            </MotionInView>
                        ))
                    )}
                </Slider>
                <CarouselControlsArrowsBasic2
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    sx={{ transform: "translateY(-64px)" }}
                />
            </Box>
            <Button
                variant="outlined"
                color="inherit"
                size="large"
                endIcon={
                    <Icon icon={roundArrowRightAlt} width={24} height={24} />
                }
                sx={{ mx: "auto" }}
            >
                View all team members
            </Button>
        </Container>
    );
}
