/* eslint-disable indent */
import { Component, h, render } from "preact";
export { h, render };

import { get, submitData } from "./ajax";

//mui
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

//components
import { Collection } from "./_localComponents/collection";

//types
import { LibraryAppProps, LibraryAppState } from "./types";
import { CollectionType } from "./_localComponents/types";

//style
import { prefixer } from "stylis";
import { ThemeProvider } from "@mui/material/styles";
import saltise from "./theme";

//cache
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export class App extends Component<LibraryAppProps, LibraryAppState> {
  constructor(props: LibraryAppProps) {
    super(props);
    this.state = {
      collections: [],
      height: 0,
      type: 1,
    };
  }

  handleCollectionBookmarkClick = async (
    url: string | undefined,
  ): Promise<void> => {
    if (url) {
      try {
        await submitData(url, {}, "PUT");

        const collections = await get(this.props.urls.collections);
        this.setState({
          collections: (collections as any).results as CollectionType[],
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  collections = () => {
    return (
      <Grid container spacing="20px">
        {this.state.collections.map(
          (collection: CollectionType, i: number) => (
            <Grid key={i} item xs={6}>
              <Collection
                gettext={this.props.gettext}
                getHeight={this.getHeight}
                logo={this.props.logo}
                minHeight={this.state.height}
                collection={collection}
                toggleBookmarked={() =>
                  this.handleCollectionBookmarkClick(collection.follow_url)
                }
              />
            </Grid>
          ),
        )}
      </Grid>
    );
  };

  assignments = () => {
    return;
  };

  questions = () => {
    return;
  };

  sync = async (): Promise<void> => {
    try {
      const collections = await get(this.props.urls.collections);

      this.setState(
        {
          collections: (collections as any).results as CollectionType[],
        },
        () => console.info(this.state),
      );
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount(): void {
    this.sync();
  }

  getHeight = (height: number) => {
    if (height > this.state.height) {
      this.setState({ height });
    }
  };

  cache = createCache({
    key: "nonced",
    nonce: this.props.nonce,
    prepend: true,
    stylisPlugins: [prefixer],
  });

  render() {
    return (
      <ThemeProvider theme={saltise}>
        <CacheProvider value={this.cache}>
          <Box margin="0 auto" maxWidth="980px" width="100%">
            <Stack direction="row" spacing={1}>
              <Chip
                clickable={this.state.type != 1}
                label={this.props.gettext("Collections")}
                variant={this.state.type == 1 ? "selected" : "outlined"}
              />
              <Chip
                clickable={this.state.type != 2}
                label={this.props.gettext("Assignments")}
                variant={this.state.type == 2 ? "selected" : "outlined"}
              />
              <Chip
                clickable={this.state.type != 3}
                label={this.props.gettext("Questions")}
                variant={this.state.type == 3 ? "selected" : "outlined"}
              />
            </Stack>
            <Box marginTop="40px">
              {this.state.type == 1
                ? this.collections()
                : this.state.type == 2
                ? this.assignments()
                : this.questions()}
            </Box>
          </Box>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}
