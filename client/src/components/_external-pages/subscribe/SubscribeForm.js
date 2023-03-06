// material
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Button, Typography, TextField, Stack } from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import useAuth from '../../../hooks/useAuth';
import httpRequest from '../../../utils/httpRequest';
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function SubscribeForm() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const SubscribeSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last Name required'),
    creditCardNo: Yup.string().required('Credit Card No is required'),
    securityCode: Yup.string().required('security Code is required'),
    date: Yup.string().required('date is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      creditCardNo: '',
      securityCode: '',
      date: ''
    },
    validationSchema: SubscribeSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await httpRequest({
          method: 'POST',
          url: `subscribe`,
          data: {
            user: user._id,
            offer: id
          }
        });
        toast.success('subscribe successfully');
        navigate('/dashboard');
      } catch (error) {
        toast.error(error.message);
      }
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h3">
              Feel free to subscribe. <br />
              We'll be glad to hear from you, buddy.
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                type="text"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />

              <TextField
                fullWidth
                label="Last Name"
                type="text"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Stack>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Credit Card No."
                type="number"
                {...getFieldProps('creditCardNo')}
                error={Boolean(touched.creditCardNo && errors.creditCardNo)}
                helperText={touched.creditCardNo && errors.creditCardNo}
              />

              <TextField
                fullWidth
                label="Security Code"
                {...getFieldProps('securityCode')}
                error={Boolean(touched.securityCode && errors.securityCode)}
                helperText={touched.securityCode && errors.securityCode}
              />
            </Stack>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Stack direction="row" spacing={2}>
              <TextField
                type="date"
                fullWidth
                {...getFieldProps('date')}
                error={Boolean(touched.date && errors.date)}
                helperText={touched.date && errors.date}
              />
            </Stack>
          </MotionInView>
          {/* <MotionInView variants={varFadeInUp}> */}
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Submit Now
          </LoadingButton>
          {/* </MotionInView> */}
        </Stack>
      </Form>
    </FormikProvider>
  );
}
