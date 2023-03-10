import React, { useState } from "react";
import { Button, Stack, TextField } from "@material-ui/core";
import { useNavigate, useParams } from "react-router";
import { LoadingButton } from "@material-ui/lab";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import useAuth from "../../../hooks/useAuth";
import httpRequest from "../../../utils/httpRequest";
import { varFadeInUp, varZoomIn, MotionInView } from "../../animate";
import { toast } from "react-toastify";
import { PATH_DASHBOARD } from "../../../routes/paths";

const TrainerSubscribeForm = () => {
    const { id, type } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        formData: null
    });

    const handleInputFocus = (e) => {
        setState((prev) => {
            return {
                ...prev,
                focus: e.target.name
            };
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await httpRequest({
                method: "POST",
                url: `privateSubscription`,
                data: {
                    PrivatePackage: type,
                    trainer: id,
                    trainee: user._id
                }
            });
            toast.success("subscribe successfully");
            navigate(PATH_DASHBOARD.user.profile);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div id="PaymentForm">
            <Stack spacing={4}>
                <MotionInView variants={varFadeInUp}>
                    <Cards
                        cvc={state?.cvc}
                        expiry={state?.expiry}
                        focused={state?.focus}
                        name={state?.name}
                        number={state?.number}
                    />
                </MotionInView>
                <MotionInView variants={varZoomIn}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <Stack direction="row" spacing={2}>
                                <div>
                                    <TextField
                                        type="tel"
                                        name="number"
                                        className="form-control"
                                        placeholder="Card Number / E.g.: 49..."
                                        pattern="[\d| ]{16,22}"
                                        required
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                    />
                                </div>
                                <TextField
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Name"
                                    required
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <div>
                                    <TextField
                                        type="tel"
                                        name="expiry"
                                        className="form-control"
                                        placeholder="Valid Thru"
                                        pattern="\d\d/\d\d"
                                        required
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                    />
                                </div>
                                <TextField
                                    type="tel"
                                    name="cvc"
                                    placeholder="CVC"
                                    pattern="\d{3,4}"
                                    required
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </Stack>
                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                            >
                                Pay
                            </LoadingButton>
                        </Stack>
                    </form>
                </MotionInView>
            </Stack>
        </div>
    );
};
export default TrainerSubscribeForm;
