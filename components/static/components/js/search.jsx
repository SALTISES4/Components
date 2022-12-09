import { h, render } from "preact";
export { h, render };

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import saltise from "./theme.js";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import CancelIcon from "@mui/icons-material/Cancel";
import CategoryIcon from "@mui/icons-material/Category";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import PeopleIcon from "@mui/icons-material/People";
import ScienceIcon from "@mui/icons-material/Science";

import { SearchBar, Subtitle } from "./styledComponent";
import { AssigmentBis } from "./_localComponents/assigment_bis";
import { Collection } from "./_localComponents/collection";
import { Question } from "./_localComponents/question";
import { SearchFilter } from "./_search/searchFilter";

export const App = (props) => {
  const cache = createCache({
    key: "nonced",
    nonce: props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });
  const viewAll = "View all results";
  const pageWidth = "82%";

  const filters = [
    {
      title: "Type",
      subtitle: "types",
      icon: CategoryIcon,
      notification: "0",
      choices: ["Type 1", "Type 2", "Type 3", "Type 4"],
    },
    {
      title: "Discipline",
      subtitle: "disciplines",
      icon: ScienceIcon,
      notification: "1",
      choices: ["Disc 1", "Disc 2", "Disc 3", "Disc 4", "Disc 5", "Disc 6"],
    },
    {
      title: "Category",
      subtitle: "categories",
      icon: FilterAltIcon,
      notification: "10",
      choices: ["Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5", "Cat 6"],
    },
    {
      title: "Difficulty",
      subtitle: "difficulties",
      icon: NetworkCheckIcon,
      notification: "4",
      choices: ["Easy", "Moderate", "Difficult"],
    },
    {
      title: "Peer Impact",
      subtitle: "peer impacts",
      icon: PeopleIcon,
      notification: "0",
      choices: ["1", "2", "3"],
    },
  ];

  return (
    <ThemeProvider theme={saltise}>
      <CacheProvider value={cache}>
        <Box
          marginLeft="200px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            flexWrap="noWrap"
            sx={{
              mt: "-8px",
              padding: "15px 15px 16px",
              backgroundColor: "#061A4E",
            }}
          >
            <Box width={pageWidth} color="#fff">
              <Typography sx={{ ml: "15px" }}>Search</Typography>
              <SearchBar>
                <Typography variant="h4">Chemistry</Typography>
                <CancelIcon color="primaryBlue" fontSize="large" />
              </SearchBar>
              <Typography sx={{ ml: "15px" }}>111 Results</Typography>
            </Box>
          </Box>
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            sx={{ backgroundColor: "#fff", padding: "15px" }}
          >
            <Box
              width={pageWidth}
              display="flex"
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Typography variant="h4" sx={{ margin: "5px 10px" }}>
                Filtred by
              </Typography>
              {filters.map((filter) => (
                <SearchFilter
                  key={filter.title}
                  title={filter.title}
                  subtitle={filter.subtitle}
                  icon={filter.icon}
                  notification={filter.notification}
                  choices={filter.choices}
                />
              ))}
            </Box>
          </Box>
          <Box width={pageWidth}>
            <Container>
              <Subtitle>
                <Typography variant="h2">
                  {props.questions.length} results in Questions
                </Typography>
                <Link variant="h4">{viewAll}</Link>
              </Subtitle>
              <Stack spacing="10px">
                {props.questions.map((question) => (
                  <Question key={question.title} question={question} />
                ))}
              </Stack>
            </Container>
            <Container>
              <Subtitle>
                <Typography variant="h2">
                  {props.assigments.length} results in Assigments
                </Typography>
                <Link variant="h4">{viewAll}</Link>
              </Subtitle>
              <Stack spacing="10px">
                {props.assigments.map((assigment) => (
                  <AssigmentBis key={assigment.title} assigment={assigment} />
                ))}
              </Stack>
            </Container>
            <Container>
              <Subtitle>
                <Typography variant="h2">
                  {props.collections.length} results in Collections
                </Typography>
                <Link variant="h4">{viewAll}</Link>
              </Subtitle>
              <Grid container spacing="20px">
                {props.collections.map((collection) => (
                  <Collection key={collection.title} collection={collection} />
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
      </CacheProvider>
    </ThemeProvider>
  );
};
