import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { Skeleton } from "@mui/material";

export function Group(): JSX.Element {
  return (
    <Card sx={{ pr: "62px", pl: "40px", pt: "2px", pb: "2px" }}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h3">
            <Skeleton width={175} />
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography sx={{ mr: "10px" }}>
            <Skeleton width={50} />
          </Typography>
          <Box display="flex" alignItems="center">
            <Skeleton
              variant="circular"
              width={20}
              height={20}
              sx={{ mr: "10px" }}
            />
            <Typography>
              <Skeleton width={50} />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
