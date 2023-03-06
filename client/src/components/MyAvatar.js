// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();
  console.log(`http://localhost:3001/img/users/${user.photo}`);
  return (
    <MAvatar
      src={`http://localhost:3001/img/users/${user.photo}`}
      alt={user.name}
      color={user.photo ? 'default' : createAvatar(user.displayName).color}
      {...other}
    >
      {createAvatar(user.displayName).name}
    </MAvatar>
  );
}
