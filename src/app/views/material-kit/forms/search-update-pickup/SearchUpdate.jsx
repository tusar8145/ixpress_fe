import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb } from "app/components";
import SearchUpdatePickupForm from "./SearchUpdatePickupForm";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));


//{ name: "Material", path: "/material" },
const AddPod = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: "Search Stock & Update Status" }]} />  
      </Box>

      <Stack spacing={3}>
          <div>
            <SearchUpdatePickupForm />
          </div>
      </Stack>
    </Container> 
  );
};

export default AddPod;
