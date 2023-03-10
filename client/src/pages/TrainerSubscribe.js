// material
import { styled } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
// components
import Page from "../components/Page";
import { TrainerSubscribeForm } from "../components/_external-pages/subscribe";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(11)
    }
}));

// ----------------------------------------------------------------------

export default function TrainerSubscribe() {
    return (
        <RootStyle title="Trainer Subscribe us | Gym-Edge">
            <Container sx={{ my: 10 }}>
                <Grid container spacing={10}>
                    <Grid item xs={12} md={6}>
                        <TrainerSubscribeForm />
                    </Grid>
                </Grid>
            </Container>
        </RootStyle>
    );
}
