/* eslint-disable indent */
import { h } from "preact";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";

import { Tag } from "../styledComponents";

export function Assignment(): JSX.Element {
  return (
    <Card>
      <CardContent sx={{ padding: "10px 20px" }}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="h3">
              <Skeleton width={300} />
            </Typography>
            <Typography variant="caption">
              <Skeleton width={60} />
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            {/* TODO: Convert Tags to Skeletons */}
            <Tag
              sx={{
                mx: "10px",
                minHeight: "26px",
                minWidth: "102px",
                boxSizing: "border-box",
              }}
            />
            <Tag
              sx={{
                mx: "10px",
                minHeight: "26px",
                minWidth: "102px",
                boxSizing: "border-box",
              }}
            />
            <Skeleton
              variant="circular"
              width={36}
              height={36}
              sx={{ ml: "80px" }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
