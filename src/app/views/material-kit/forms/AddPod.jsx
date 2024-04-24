import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import PARENT from "./Parent";

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
        <Breadcrumb routeSegments={[ { name: "Add New Pod" }]} />  
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
        <PARENT />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AddPod;
