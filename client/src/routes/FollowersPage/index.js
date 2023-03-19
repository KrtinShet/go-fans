import React from 'react'
import DashboardLayout from '../Dashboard'
import { useGetSubscribersQuery } from './../../store/api/userApiSlice'
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

function Index() {
    const authState = useSelector((state) => state.auth);
    const { data: followerData } = useGetSubscribersQuery(authState.userId);
    console.log(followerData);
    return (
        <DashboardLayout>
            <Box>
                <h1>Followers</h1>
                {followerData && followerData?.subscriptions.map((subscription) => (
                    <Card key={subscription.id} sx={{ display: 'flex', mb: 2, maxWidth: '250px', alignContent: "center", alignItems: "center", px: 2 }}>
                        <Box>
                            <CardMedia
                                component={'img'}
                                image={`/profile/${subscription.user.profileImage}`}
                                sx={{ width: 50 }}
                            />
                        </Box>
                        <Box>
                            <CardContent>
                                <Typography>{subscription.user.username}</Typography>
                                <Typography>{subscription.user.email}</Typography>
                            </CardContent>
                        </Box>
                    </Card>
                ))}
            </Box>
        </DashboardLayout>
    )
}

export default Index