/* eslint-disable indent */
import { h } from "preact";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";

export function Question(): JSX.Element {
  return (
    <Card>
      <CardContent sx={{ pt: "20px" }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3" sx={{ m: "0px" }}>
            <Skeleton width={200} />
          </Typography>
        </Box>
        <Typography variant="caption">
          <Skeleton width={40} />
        </Typography>
        <Typography>
          <Skeleton width={"90%"} />
          <Skeleton width={"80%"} />
          <Skeleton width={"86%"} />
          <Skeleton width={"43%"} />
        </Typography>
      </CardContent>
    </Card>
  );
}
