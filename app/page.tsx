"use client";
import Button from "@/components/Inputs/Button/Button";
import Image from "next/image";
import btnIcon from "@/public/btn-icon.svg";
import Chips from "@/components/DataDisplay/Chip/Chip";
import Typography from "@/components/DataDisplay/Typography/Typography";
import Grid from "@/components/Layout/Grid/Grid";
import Box from "@/components/Layout/Box/Box";
import Stack from "@/components/Layout/Stack/Stack";
import Container from "@/components/Layout/Container/Container";
export default function Home() {
  return (
    <div>
      Home page
      <Button onClick={() => console.log("clicked")}>Base</Button>
      <Button onClick={() => console.log("clicked")}>Base</Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => console.log("Clicked")}
        sx={{
          backgroundColor: "red",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "darkred",
          },
        }}
      >
        Custom Button
      </Button>
      <Typography variant="h1" className="text-primary">
        H1
      </Typography>
      <Typography variant="h2" color="error" component="h3">
        H22
      </Typography>
      <Typography variant="h3">H3</Typography>
      <Chips type="high" />
      <Chips type="low" />
      <Chips type="link-building" />
      <Grid
        container
        cols={4}
        rows={1}
        spacing={10}
        className="p-6 bg-gray-200"
      >
        <Grid
          container
          cols={1}
          rows={3}
          className="p-6 bg-gray-200"
          rowSpacing={5}
          columnSpacing={6}
        >
          <Grid
            item
            className="bg-red-500 text-white p-4 "
            size={{ sm: { cols: 1, rows: 1 }, xl: { cols: 2, rows: 2 } }}
          >
            Box 1
          </Grid>
          <Grid
            item
            className="bg-yellow-500 text-white p-4"
            size={{ sm: { cols: 1, rows: 1 } }}
          >
            Box 2
          </Grid>
          <Grid
            item
            className="bg-yellow-500 text-white p-4"
            size={{ sm: { cols: 2, rows: 1 } }}
          >
            Box 2
          </Grid>
        </Grid>

        <Grid
          item
          className="bg-purple-500 text-white p-4"
          size={{ sm: { cols: 1, rows: 1 } }}
          spacing={0}
        >
          Box 3
        </Grid>
        <Grid
          item
          className="bg-purple-500 text-yellow p-4"
          size={{ sm: { cols: 1, rows: 1 } }}
          spacing={10}
        >
          Box 4
        </Grid>
        <Grid
          item
          className="bg-purple-500 text-red p-4"
          size={{ sm: { cols: 1, rows: 1 } }}
          spacing={10}
        >
          Box 5
        </Grid>
      </Grid>
      <Box
        component="section"
        display="flex"
        width={300}
        height={200}
        padding={16}
        bgcolor="lightblue"
        border="2px solid blue"
        borderRadius={8}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      >
        This is a custom Box!
      </Box>
      <Stack spacing={2} direction="column-reverse">
        <Box
          component="section"
          display="flex"
          width={300}
          height={200}
          padding={16}
          bgcolor="lightblue"
          border="2px solid blue"
          borderRadius={8}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        >
          This is a custom Box1!
        </Box>
        <Box
          component="section"
          display="flex"
          width={300}
          height={200}
          padding={16}
          bgcolor="lightblue"
          border="2px solid blue"
          borderRadius={8}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        >
          This is a custom Box2!
        </Box>
      </Stack>
      <Stack spacing={2} direction="column">
        <Container sx={{ backgroundColor: "red", borderRadius: "4px" }}>
          <Box
            component="section"
            display="flex"
            width={300}
            height={200}
            padding={16}
            bgcolor="lightblue"
            border="2px solid blue"
            borderRadius={8}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          >
            This is a custom Box3!
          </Box>
        </Container>
        <Container sx={{ backgroundColor: "red", borderRadius: "4px" }}>
          <Box
            component="section"
            display="flex"
            width={300}
            height={200}
            padding={16}
            bgcolor="lightblue"
            border="2px solid blue"
            borderRadius={8}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          >
            This is a custom Box3!
          </Box>
        </Container>
      </Stack>
    </div>
  );
}
