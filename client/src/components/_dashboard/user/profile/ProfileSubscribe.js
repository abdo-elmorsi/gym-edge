import { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
// material
import { styled } from "@material-ui/core/styles";
import { Link, Card, Typography, CardHeader, Stack } from "@material-ui/core";
import useAuth from "../../../../hooks/useAuth";
import httpRequest from "../../../../utils/httpRequest";

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
    const [subscribe, setsubscribe] = useState({});
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const getSubscription = async () => {
        try {
            const { data } = await httpRequest({
                method: "GET",
                url: `subscribe/${user._id}`
            });
            setsubscribe(data.subscriptions);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getSubscription();
    }, []);

    return (
        <Card>
            <CardHeader title="Subscribe" />

            <Stack spacing={2} sx={{ p: 3 }}>
                {/* <Typography variant="body2">{quote}</Typography> */}

                {loading ? (
                    <div>loading</div>
                ) : (
                    <>
                        <Stack direction="row">
                            <IconStyle icon="material-symbols:price-check" />
                            <Typography variant="body2">
                                Price &nbsp;
                                <Link
                                    component="span"
                                    variant="subtitle2"
                                    color="text.primary"
                                >
                                    {subscribe?.offer?.price}$
                                </Link>
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <IconStyle icon="game-icons:duration" />
                            <Typography variant="body2">
                                Duration &nbsp;
                                <Link
                                    component="span"
                                    variant="subtitle2"
                                    color="text.primary"
                                >
                                    {subscribe?.offer?.duration} months
                                </Link>
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <IconStyle icon="game-icons:duration" />
                            <Typography variant="body2">
                                Start date &nbsp;
                                <Link
                                    component="span"
                                    variant="subtitle2"
                                    color="text.primary"
                                >
                                    {moment(subscribe?.startDate).format(
                                        "DD/MM/yyyy"
                                    )}
                                </Link>
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <IconStyle icon="game-icons:duration" />
                            <Typography variant="body2">
                                End date &nbsp;
                                <Link
                                    component="span"
                                    variant="subtitle2"
                                    color="text.primary"
                                >
                                    {moment(subscribe?.endDate).format(
                                        "DD/MM/yyyy"
                                    )}
                                </Link>
                            </Typography>
                        </Stack>
                    </>
                )}
            </Stack>
        </Card>
    );
}
