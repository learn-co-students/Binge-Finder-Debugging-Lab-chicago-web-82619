import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';

class App extends Component {
  state = {
    shows: [],
    searchTerm: '',
    selectedShow: '',
    episodes: [],
    filterByRating: '',
    message: '',
    page: 0,
  };

  componentDidMount = () => {
    // window.addEventListener('scroll', this.handleScroll);
    this.fetchShows(this.state.page);
  };

  fetchShows = (page=this.state.page) => {
    Adapter.getShows(page).then((shows) => {
      this.setState({
        shows: this.state.shows.concat(shows),
        page: this.state.page + 1,
      });
    });
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // handleScroll = () => {
  //   const windowHeight =
  //     'innerHeight' in window
  //       ? window.innerHeight
  //       : document.documentElement.offsetHeight;
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const docHeight = Math.max(
  //     body.scrollHeight,
  //     body.offsetHeight,
  //     html.clientHeight,
  //     html.scrollHeight,
  //     html.offsetHeight
  //   );
  //   const windowBottom = windowHeight + window.pageYOffset;
  //   if (windowBottom >= docHeight) {
  //     this.setState(
  //       (prevState) => ({
  //         message: 'bottom reached',
  //         page: prevState.page + 1,
  //       }),
  //       () => this.fetchShows(this.state.page)
  //     );
  //   } else {
  //     this.setState({
  //       message: 'not at bottom',
  //     });
  //   }
  // };

  componentDidUpdate = () => {
    // window.scrollTo(0, 0);
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() });
  };

  handleFilter = (e) => {
    e.target.value === 'No Filter'
      ? this.setState({ filterByRating: '' })
      : this.setState({ filterByRating: e.target.value });
  };

  selectShow = (show) => {
    Adapter.getShowEpisodes(show.id).then((episodes) => {
      this.setState({
        selectedShow: show,
        episodes,
      });
    });
  };

  displayShows = () => {
    if (this.state.filterByRating) {
      return this.state.shows.filter((s) => {
        return s.rating.average >= this.state.filterByRating;
      });
    } else {
      return this.state.shows;
    }
  };

  render() {
    console.log('Number of shows: ', this.state.shows.length);
    return (
      <div style={{ position: 'relative' }}>
        <Nav
          handleFilter={this.handleFilter}
          handleSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
        ></Nav>
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? (
              <SelectedShowContainer
                selectedShow={this.state.selectedShow}
                episodes={this.state.episodes}
              />
            ) : (
              <div />
            )}
          </Grid.Column>
          <Grid.Column width={11}>
            <InfiniteScroll
              dataLength={this.state.shows.length}
              next={this.fetchShows}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              <TVShowList
                shows={this.displayShows()}
                selectShow={this.selectShow}
                searchTerm={this.state.searchTerm}
              />
            </InfiniteScroll>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
