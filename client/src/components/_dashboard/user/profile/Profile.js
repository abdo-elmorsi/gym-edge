import PropTypes from 'prop-types';
// material
import { Grid, Stack } from '@material-ui/core';
//
import ProfileAbout from './ProfileAbout';
import ProfileSubscribe from './ProfileSubscribe';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object
};

export default function Profile({ myProfile }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          {/* <ProfileFollowInfo profile={myProfile} /> */}
          <ProfileAbout profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfileSubscribe profile={myProfile} />
          {/* {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))} */}
        </Stack>
      </Grid>
    </Grid>
  );
}
