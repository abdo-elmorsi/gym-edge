import * as Yup from "yup";
import { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
    Stack,
    TextField,
    IconButton,
    InputAdornment,
    Alert,
    Typography,
    FormHelperText
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
// hooks
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";

// eslint-disable-next-line import/no-unresolved, import/extensions
import { UploadAvatar } from "../../upload";

// ----------------------------------------------------------------------

export default function RegisterForm() {
    const { register } = useAuth();
    const isMountedRef = useIsMountedRef();
    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Name name required"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        passwordConfirm: Yup.string()
            .required("Password is required")
            .oneOf([Yup.ref("password")], "Your passwords do not match."),
        avatarUrl: Yup.mixed().required("Avatar is required")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            avatarUrl: ""
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            const bodyFormData = new FormData();
            bodyFormData.append("name", values.name);
            bodyFormData.append("email", values.email);
            bodyFormData.append("password", values.password);
            bodyFormData.append("passwordConfirm", values.passwordConfirm);
            bodyFormData.append("photo", values.file);
            try {
                await register(bodyFormData);
                toast.success("register success");
                if (isMountedRef.current) {
                    setSubmitting(false);
                }
            } catch (error) {
                toast.error(error.message);
                if (isMountedRef.current) {
                    setErrors({ afterSubmit: error.message });
                    setSubmitting(false);
                }
            }
        }
    });

    const {
        errors,
        touched,
        values,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        getFieldProps
    } = formik;

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setFieldValue("avatarUrl", {
                    preview: URL.createObjectURL(file)
                });
                setFieldValue("file", acceptedFiles[0]);
                console.log(acceptedFiles[0]);
            }
        },
        [setFieldValue]
    );
    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    {errors.afterSubmit && (
                        <Alert severity="error">{errors.afterSubmit}</Alert>
                    )}
                    <TextField
                        fullWidth
                        label="Full Name"
                        {...getFieldProps("name")}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                    />
                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Email address"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        {...getFieldProps("password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    >
                                        <Icon
                                            icon={
                                                showPassword
                                                    ? eyeFill
                                                    : eyeOffFill
                                            }
                                        />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        label="passwordConfirm"
                        {...getFieldProps("passwordConfirm")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    >
                                        <Icon
                                            icon={
                                                showPassword
                                                    ? eyeFill
                                                    : eyeOffFill
                                            }
                                        />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={Boolean(
                            touched.passwordConfirm && errors.passwordConfirm
                        )}
                        helperText={
                            touched.passwordConfirm && errors.passwordConfirm
                        }
                    />
                    <UploadAvatar
                        accept="image/*"
                        file={values.avatarUrl}
                        maxSize={3145728}
                        onDrop={handleDrop}
                        error={Boolean(touched.avatarUrl && errors.avatarUrl)}
                        caption={
                            <Typography
                                variant="caption"
                                sx={{
                                    mt: 2,
                                    mx: "auto",
                                    display: "block",
                                    textAlign: "center",
                                    color: "text.secondary"
                                }}
                            >
                                {/* Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of {fData(3145728)} */}
                            </Typography>
                        }
                    />
                    <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                        {touched.avatarUrl && errors.avatarUrl}
                    </FormHelperText>

                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Register
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
}
