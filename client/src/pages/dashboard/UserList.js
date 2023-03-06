import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
// material
import { Card, Button, Container, Avatar } from '@material-ui/core';
// eslint-disable-next-line import/named
import httpRequest from '../../utils/httpRequest';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// import Label from '../../components/Label';
// import Scrollbar from '../../components/Scrollbar';
// import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user/list';

// ----------------------------------------------------------------------

export default function UserList() {
  const { themeStretch } = useSettings();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(true);
  const [tableData, setTableData] = useState([]);

  const deleteUser = async (id) => {
    try {
      await httpRequest({
        method: 'DELETE',
        url: `users/${id}`
      });
      setUpdate(!update);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await httpRequest({
        method: 'GET',
        url: 'users'
      });
      const { data } = response.data;
      setTableData(data.users);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, [update]);

  const columns = [
    {
      name: '#',
      selector: (row, i) => i + 1,
      sortable: false,
      width: '100px'
    },
    {
      name: 'Photo',
      selector: (row) => row.photo,
      cell: (row) => (
        <>
          <Avatar src={`http://localhost:3001/img/users/${row.photo}`} />
        </>
      ),
      sortable: true,
      width: '200px'
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      width: '200px'
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      sortable: true,
      width: '200px'
    },
    {
      name: 'Actions',
      selector: (row) => row._id,
      cell: (row) => (
        <>
          <button onClick={() => deleteUser(row._id)}>delete</button>
          <button>update</button>
        </>
      ),
      sortable: true,
      width: '200px'
    }
  ];

  return (
    <Page title="User: List | Easier">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.newUser}
              startIcon={<Icon icon={plusFill} />}
            >
              New User
            </Button>
          }
        />

        <Card>
          <DataTableExtensions filter export={false} print={false} columns={columns} data={tableData}>
            <DataTable
              noHeader
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
              progressPending={loading}
              progressComponent={<div>loading</div>}
              paginationRowsPerPageOptions={[10, 25, 50, 100, 1000]}
              fixedHeader
              fixedHeaderScrollHeight="500px"
            />
          </DataTableExtensions>
        </Card>
      </Container>
    </Page>
  );
}
