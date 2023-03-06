import { Icon } from '@iconify/react';
// material
import { styled } from '@material-ui/core/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@material-ui/core';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------
export default function ProfileSubscribe() {
  return (
    <Card>
      <CardHeader title="Subscribe" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Typography variant="body2">{quote}</Typography> */}

        <Stack direction="row">
          <IconStyle icon="material-symbols:price-check" />
          <Typography variant="body2">
            Price &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {55}$
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon="game-icons:duration" />
          <Typography variant="body2">
            Duration &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              3 months
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon="game-icons:duration" />
          <Typography variant="body2">
            Start date &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              11/1/2023
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon="game-icons:duration" />
          <Typography variant="body2">
            End date &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              11/3/2023
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
