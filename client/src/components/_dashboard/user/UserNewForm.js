import * as Yup from "yup";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import { LoadingButton } from "@material-ui/lab";
import {
    Box,
    Card,
    Grid,
    Stack,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Icon,
    FormHelperText
} from "@material-ui/core";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
// utils
import { fData } from "../../../utils/formatNumber";
import httpRequest from "../../../utils/httpRequest";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
//
import { UploadAvatar } from "../../upload";
import roles from "./roles";
import Label from "../../Label";

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
    isEdit: PropTypes.bool,
    id: PropTypes.string
};

export default function UserNewForm({ isEdit, id }) {
    const navigate = useNavigate();
    const { register, updateProfile } = useAuth();
    const [loading, setLoading] = useState(id);

    const getUser = async () => {
        try {
            const { data } = await httpRequest({
                method: "GET",
                url: `users/${id}`
            });
            let user = data.user || {};
            setFieldValue("name", user.name);
            setFieldValue("email", user.email);
            setFieldValue("phoneNumber", user.phone);
            setFieldValue(
                "avatarUrl",
                "http://localhost:3001/img/users/" + user.photo
            );
            setFieldValue("role", user.role);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
        }
    };
    useEffect(() => {
        if (isEdit && id) {
            setLoading(true);
            getUser();
        }
    }, [id, isEdit]);

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required").email(),
        phoneNumber: Yup.string().required("Phone number is required"),
        role: Yup.string().required("Role is required"),
        avatarUrl: Yup.mixed().required("Avatar is required")
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            email: "",
            phoneNumber: "",
            avatarUrl: null,
            role: ""
        },
        validationSchema: NewUserSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
            console.log("abdo");
            const bodyFormData = new FormData();
            bodyFormData.append("name", values.name);
            bodyFormData.append("email", values.email);
            bodyFormData.append("phone", values.phoneNumber);
            bodyFormData.append("role", values.role);
            values.file && bodyFormData.append("photo", values.file);
            try {
                if (!isEdit) {
                    await register(bodyFormData);
                } else {
                    await updateProfile(bodyFormData, id);
                }
                toast.success("Update successfully");
                resetForm();
                setSubmitting(false);
                navigate(PATH_DASHBOARD.user.list);
            } catch (error) {
                toast.error(error.message);
                setSubmitting(false);
                setErrors(error);
            }
        }
    });

    const {
        errors,
        values,
        touched,
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
            }
        },
        [setFieldValue]
    );

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                {loading ? (
                    <div>loading</div>
                ) : (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ py: 10, px: 3 }}>
                                {/* {isEdit && (
                                    <Label
                                        color={
                                            values.status !== "active"
                                                ? "error"
                                                : "success"
                                        }
                                        sx={{
                                            textTransform: "uppercase",
                                            position: "absolute",
                                            top: 24,
                                            right: 24
                                        }}
                                    >
                                        {values.status}
                                    </Label>
                                )} */}

                                <Box sx={{ mb: 5 }}>
                                    <UploadAvatar
                                        accept="image/*"
                                        file={values.avatarUrl}
                                        maxSize={3145728}
                                        onDrop={handleDrop}
                                        error={Boolean(
                                            touched.avatarUrl &&
                                                errors.avatarUrl
                                        )}
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
                                                Allowed *.jpeg, *.jpg, *.png,
                                                *.gif
                                                <br /> max size of{" "}
                                                {fData(3145728)}
                                            </Typography>
                                        }
                                    />
                                    <FormHelperText
                                        error
                                        sx={{ px: 2, textAlign: "center" }}
                                    >
                                        {touched.avatarUrl && errors.avatarUrl}
                                    </FormHelperText>
                                </Box>

                                {/* {isEdit && (
                                <FormControlLabel
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            onChange={(event) =>
                                                setFieldValue(
                                                    "status",
                                                    event.target.checked
                                                        ? "banned"
                                                        : "active"
                                                )
                                            }
                                            checked={values.status !== "active"}
                                        />
                                    }
                                    label={
                                        <>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ mb: 0.5 }}
                                            >
                                                Banned
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: "text.secondary" }}
                                            >
                                                Apply disable account
                                            </Typography>
                                        </>
                                    }
                                    sx={{
                                        mx: 0,
                                        mb: 3,
                                        width: 1,
                                        justifyContent: "space-between"
                                    }}
                                />
                            )} */}
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Card sx={{ p: 3 }}>
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        {...getFieldProps("name")}
                                        error={Boolean(
                                            touched.name && errors.name
                                        )}
                                        helperText={touched.name && errors.name}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        {...getFieldProps("email")}
                                        error={Boolean(
                                            touched.email && errors.email
                                        )}
                                        helperText={
                                            touched.email && errors.email
                                        }
                                    />

                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        {...getFieldProps("phoneNumber")}
                                        error={Boolean(
                                            touched.phoneNumber &&
                                                errors.phoneNumber
                                        )}
                                        helperText={
                                            touched.phoneNumber &&
                                            errors.phoneNumber
                                        }
                                    />
                                    <TextField
                                        select
                                        fullWidth
                                        label="Roles"
                                        placeholder="Roles"
                                        {...getFieldProps("role")}
                                        SelectProps={{ native: true }}
                                        error={Boolean(
                                            touched.role && errors.role
                                        )}
                                        helperText={touched.role && errors.role}
                                    >
                                        <option value="" />
                                        {roles.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>

                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={{ xs: 3, sm: 2 }}
                                    ></Stack>

                                    <Box
                                        sx={{
                                            mt: 3,
                                            display: "flex",
                                            justifyContent: "flex-end"
                                        }}
                                    >
                                        <LoadingButton
                                            type="submit"
                                            variant="contained"
                                            loading={isSubmitting}
                                        >
                                            {!isEdit
                                                ? "Create User"
                                                : "Save Changes"}
                                        </LoadingButton>
                                    </Box>
                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Form>
        </FormikProvider>
    );
}
