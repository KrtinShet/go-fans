import React from "react";
import Container from "@mui/material/Container";
import { useGetAllCreatorsQuery } from "./../../store/api/userApiSlice";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  const { data: creatorsData } = useGetAllCreatorsQuery();
  return (
    <Container>
      <h1>Creators</h1>
      {creatorsData?.users.map((creator) => (
        <Card
          key={creator.id}
          sx={{
            margin: "0 auto",
            minWidth: 275,
            mb: 3,
            cursor: "pointer",
            width: "max-content",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            flexDirection: "column",
            textAlign: "center",
          }}
          onClick={() => navigate(`/creator/${creator.id}`)}
        >
          <CardMedia>
            <img src={`/profile/${creator.profileImage}`} height={"100px"} />
          </CardMedia>
          <CardContent>
            <Typography>{creator.username}</Typography>
            <Typography>{creator.email}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Index;
