import React from "react";
import DashboardLayout from "../Dashboard";
import CreateFeedPage from "./CreateFeed";

function index() {
  return (
    <DashboardLayout>
      <CreateFeedPage />
    </DashboardLayout>
  );
}

export default index;
