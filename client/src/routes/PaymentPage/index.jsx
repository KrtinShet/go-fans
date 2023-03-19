import { Box, Button, Container, Input } from "@mui/material";
import React from "react";

import { useCreatePaymentMutation } from "./../../store/api/paymentApiSlice";
import { useGetCreatorDetailsQuery } from "./../../store/api/userApiSlice";
import { useNavigate, useParams } from "react-router-dom";

function Index() {
  const [amount, setAmount] = React.useState(10);
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const { data: creatorData } = useGetCreatorDetailsQuery(creatorId);
  const [createPayment] = useCreatePaymentMutation();

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };

  const handlePayment = async () => {
    await createPayment({
      amount: amount,
      creator: creatorId,
    });
    navigate("/feeds", { replace: true });
  };

  return (
    <Container>
      <h1>Confirm Payment to subscribe</h1>
      <h3>Creator username: {creatorData?.user.username}</h3>
      <h3>Creator email: {creatorData?.user.username}</h3>
      <Input type="number" value={amount} onChange={handleInputChange} />

      <Box sx={{ display: "flex", mt: 3, gap: 3 }}>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate("..")}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={amount < 10}
          onClick={handlePayment}
        >
          Pay
        </Button>
      </Box>
    </Container>
  );
}

export default Index;
