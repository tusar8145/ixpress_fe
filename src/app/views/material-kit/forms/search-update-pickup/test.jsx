import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
 

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
 

      <Stack spacing={3}>
          <div>
            hi
          </div>
      </Stack>
    </Container> 
  );
};

export default AddPod;
