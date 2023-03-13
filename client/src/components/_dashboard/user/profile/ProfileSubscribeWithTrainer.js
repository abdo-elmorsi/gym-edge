import React from "react";
import moment from "moment";
import { Icon } from "@iconify/react";
// material
import { styled } from "@material-ui/core/styles";
import { Link, Card, Typography, CardHeader, Stack } from "@material-ui/core";

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------
export default function ProfileSubscribeWithTrainer({ subscribe }) {
    return (
        <>
            {Object.keys(subscribe)?.length ? (
                <Card>
                    <CardHeader title="Trainer Subscribe" />

                    <Stack spacing={2} sx={{ p: 3 }}>
                        {/* <Typography variant="body2">{quote}</Typography> */}
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
                                        {subscribe?.PrivatePackage?.price}$
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
                                        {subscribe?.PrivatePackage?.duration}{" "}
                                        months
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
                    </Stack>
                </Card>
            ) : null}
        </>
    );
}
