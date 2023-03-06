import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { useTheme, styled, alpha } from '@material-ui/core/styles';
import { Box, Grid, Card, Link, Stack, Button, Divider, Container, Typography } from '@material-ui/core';
//
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import httpRequest from '../../../utils/httpRequest';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const LICENSES = ['Standard', 'Standard Plus', 'Extended'];

const PLANS = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  options: ['JavaScript version', 'TypeScript version', 'Design Resources']
}));

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

// ----------------------------------------------------------------------

PlanCard.propTypes = {
  offer: PropTypes.object,
  cardIndex: PropTypes.number,
  plan: PropTypes.shape({
    license: PropTypes.any,
    options: PropTypes.arrayOf(PropTypes.string)
  })
};

function PlanCard({ offer, plan, cardIndex }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { license } = plan;
  const isLight = theme.palette.mode === 'light';

  const handleSub = (id) => {
    console.log(id);
    if (isAuthenticated) {
      navigate(`/subscribe/${id}`);
    } else {
      navigate('/auth/login');
    }
  };
  return (
    <Card
      sx={{
        p: 5,
        boxShadow: (theme) =>
          `0px 48px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.12)}`,
        ...(cardIndex === 1 && {
          boxShadow: (theme) =>
            `0px 48px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.48)}`
        })
      }}
    >
      <Stack spacing={5}>
        <div>
          <Typography variant="overline" sx={{ mb: 2, color: 'text.disabled', display: 'block' }}>
            LICENSE
          </Typography>
          <Typography variant="h4">{license}</Typography>
        </div>
        <Stack spacing={2.5}>
          <Stack spacing={1.5} direction="row" alignItems="center">
            <Box component={Icon} icon={checkmarkFill} sx={{ color: 'primary.main', width: 20, height: 20 }} />
            <Typography variant="body2">{`Price ${offer?.price}$`}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2.5}>
          <Stack spacing={1.5} direction="row" alignItems="center">
            <Box component={Icon} icon={checkmarkFill} sx={{ color: 'primary.main', width: 20, height: 20 }} />
            <Typography variant="body2">{`${offer?.duration} months`}</Typography>
          </Stack>
        </Stack>

        <Button
          onClick={() => handleSub(offer?._id)}
          size="large"
          fullWidth
          variant={cardIndex === 1 ? 'contained' : 'outlined'}
        >
          Choose Plan
        </Button>
      </Stack>
    </Card>
  );
}

export default function LandingPricingPlans() {
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);

  const getSubs = async () => {
    try {
      const response = await httpRequest({
        method: 'GET',
        url: 'offers'
      });
      const { data } = response.data;
      setOffers(data.offers);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSubs();
  }, []);
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <MotionInView variants={varFadeInUp}>
            <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
              pricing plans
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              The right plan for your business
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography
              sx={{
                color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'text.primary')
              }}
            >
              Choose the perfect plan for your needs. Always flexible to grow
            </Typography>
          </MotionInView>
        </Box>

        {loading ? (
          <span>loading</span>
        ) : (
          <Grid container spacing={5}>
            {PLANS.map((plan, index) => (
              <Grid key={plan.license} item xs={12} md={4}>
                <MotionInView variants={index === 1 ? varFadeInDown : varFadeInUp}>
                  <PlanCard offer={offers[index] || {}} plan={plan} cardIndex={index} />
                </MotionInView>
              </Grid>
            ))}
          </Grid>
        )}

        <MotionInView variants={varFadeIn}>
          <Box sx={{ p: 5, mt: 10, textAlign: 'center' }}>
            <MotionInView variants={varFadeInDown}>
              <Typography variant="h3">Still have questions?</Typography>
            </MotionInView>

            <MotionInView variants={varFadeInDown}>
              <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
                Please describe your case to receive the most accurate advice.
              </Typography>
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
              <Button
                size="large"
                variant="contained"
                href="mailto:abdelrahmandiv@gmail.com?subject=[Feedback] from Customer"
              >
                Contact us
              </Button>
            </MotionInView>
          </Box>
        </MotionInView>
      </Container>
    </RootStyle>
  );
}
