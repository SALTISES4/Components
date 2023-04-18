import { h } from "preact";

import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

export function Collection(): JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Skeleton variant="circular">
            <Avatar sx={{ width: 50, height: 50 }} />
          </Skeleton>
        }
        title={<Skeleton />}
        subheader={<Skeleton />}
      />
      <CardContent>
        <Typography tag="p">
          <Skeleton width={"90%"} />
          <Skeleton width={"80%"} />
          <Skeleton width={"86%"} />
          <Skeleton width={"43%"} />
        </Typography>
      </CardContent>
    </Card>
  );
}
