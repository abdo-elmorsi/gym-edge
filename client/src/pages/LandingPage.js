// material
import { styled } from "@material-ui/core/styles";
// components
import Page from "../components/Page";
import {
    LandingHero,
    LandingMinimal,
    LandingPricingPlans,
    LandingAdvertisement,
    LandingCleanInterfaces,
    LandingHugePackElements
} from "../components/_external-pages/landing";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({ height: "100%" });

const ContentStyle = styled("div")(({ theme }) => ({
    overflow: "hidden",
    position: "relative",
    backgroundColor: theme.palette.background.default
}));

export default function LandingPage() {
    return (
        <RootStyle title="Gym Edge" id="move_top">
            <LandingHero />
            <ContentStyle>
                <LandingMinimal />
                <LandingHugePackElements />
                <LandingCleanInterfaces />
                <LandingPricingPlans />
                <LandingAdvertisement />
            </ContentStyle>
        </RootStyle>
    );
}
