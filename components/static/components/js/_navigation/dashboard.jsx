import { h } from "preact";

import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { DashboardBar, SubtitleBar } from "../styledComponent";

import { Assigment } from "../_localComponents/assigment";
import { Collection } from "../_localComponents/collection";
import { Group } from "../_localComponents/group";
import { Question } from "../_localComponents/question";

export const Dashboard = (props) => {
  const assigments = props.assigments;
  const groups = props.groups;
  const collections = props.collections;
  const questions = props.questions;
  return (
    <Box>
      <Typography variant="h1" align="center">
        Good Morning, {props.name}
      </Typography>
      <Container align="center">
        <DashboardBar>
          <Typography variant="h4" width="100%" align="center">
            x active assigments
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="h4" width="100%" align="center">
            x groups
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="h4" width="100%" align="center">
            x questions
          </Typography>
        </DashboardBar>
      </Container>
      <Container>
        <SubtitleBar>
          <Typography variant="h2"> Active Assigments </Typography>
          <Link variant="h4"> See my assigments</Link>
        </SubtitleBar>
        <Grid container spacing="15px">
          {assigments.map((assigment) => (
            <Assigment key={assigment.title} assigment={assigment} />
          ))}
          {groups.map((group) => (
            <Group key={group.title} group={group} />
          ))}
        </Grid>
      </Container>
      <Container>
        <SubtitleBar>
          <Typography variant="h2"> Featured Collection </Typography>
          <Link variant="h4"> Explore collections</Link>
        </SubtitleBar>
        <Grid container spacing="15px">
          {collections.map((collection) => (
            <Collection key={collection.title} collection={collection} />
          ))}
        </Grid>
      </Container>
      <Container>
        <SubtitleBar>
          <Typography variant="h2"> Newly Added Questions </Typography>
          <Link variant="h4">Explore Question</Link>
        </SubtitleBar>
        <Grid container spacing="15px">
          {questions.map((question) => (
            <Question key={question.title} question={question} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
