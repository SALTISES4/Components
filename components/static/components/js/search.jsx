import { h, render } from "preact";
export { h, render };

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { Subtitle, Filter, SearchBar, Notification } from "./styledComponent";

import { AssigmentBis } from "./_localComponents/assigment_bis";
import { Collection } from "./_localComponents/collection";
import { Question } from "./_localComponents/question";

//style
import { prefixer } from "stylis";
import { ThemeProvider } from "@mui/material/styles";
import saltise from "./theme.js";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import CancelIcon from "@mui/icons-material/Cancel";
import CategoryIcon from "@mui/icons-material/Category";
import ScienceIcon from "@mui/icons-material/Science";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PeopleIcon from "@mui/icons-material/People";
import { SearchDropdown } from "./_localComponents/searchDropdown";

export const App = (props) => {
  const cache = createCache({
    key: "nonced",
    nonce: props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });
  const viewAll = "View all results";
  const pageWidth = "82%";

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
              <Filter>
                <Notification sx={{ top: "-8px", left: "-13px" }}>
                  <Typography fontSize="inherit">11</Typography>
                </Notification>
                <CategoryIcon fontSize="small" sx={{ position: "absolute" }} />
                <Typography color="inherit" sx={{ pl: "3px" }}>
                  Type
                </Typography>
              </Filter>
              <Filter>
                <ScienceIcon fontSize="small" />
                <Typography sx={{ pl: "3px" }}>Discipline</Typography>
              </Filter>
              <Box>
                <Filter>
                  <FilterAltIcon fontSize="small" />
                  <Typography sx={{ pl: "3px" }}>Category</Typography>
                </Filter>
                <SearchDropdown filter="category" title="categories" />
              </Box>

              <Filter>
                <NetworkCheckIcon fontSize="small" />
                <Typography sx={{ pl: "3px" }}>Difficulty</Typography>
              </Filter>
              <Filter>
                <PeopleIcon fontSize="small" />
                <Typography sx={{ pl: "3px" }}>Peer Impact</Typography>
              </Filter>
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
              <Grid container spacing="10px">
                {props.questions.map((question) => (
                  <Question key={question.title} question={question} />
                ))}
              </Grid>
            </Container>
            <Container>
              <Subtitle>
                <Typography variant="h2">
                  {props.assigments.length} results in Assigments
                </Typography>
                <Link variant="h4">{viewAll}</Link>
              </Subtitle>
              <Grid container spacing="10px">
                {props.assigments.map((assigment) => (
                  <AssigmentBis key={assigment.title} assigment={assigment} />
                ))}
              </Grid>
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
