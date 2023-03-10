// material
import { styled } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
// components
import Page from "../components/Page";
import { trainer as TrainerComponent } from "../components/_external-pages/trainer";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(11)
    }
}));

// ----------------------------------------------------------------------

const Trainer = () => {
    return (
        <RootStyle title="Trainer | Gym-Edge">
            <TrainerComponent />
        </RootStyle>
    );
};
export default Trainer;
