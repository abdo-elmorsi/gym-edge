import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@material-ui/core';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  children: PropTypes.node
};

const useCurrentRole = () => {
  // Logic here to get current user role
  const role = 'admin';
  return role;
};

export default function RoleBasedGuard({ children }) {
  const currentRole = useCurrentRole();
  const { user } = useAuth();

  if (user.role !== currentRole) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
