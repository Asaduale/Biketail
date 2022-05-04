import React from 'react';
import {Grid} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Filter from './filter'
import SearchBar from './searchBar'
import BikeCards from './BikeCards';
import { useParams } from 'react-router-dom';

const overallMode = createTheme({
    palette: {
        mode:  'light' ,
    }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    const search = this.props.params.search ? this.props.params.search : '';
    console.log(search);
    this.props.history.push(search.length > 0 ? `/buy/${search}` : '/buy');
  }
  render() {
    const search = this.props.params.search ? this.props.params.search : '';
    console.log('search');
    return(
      <ThemeProvider theme={overallMode}>
          <Grid container>
            <Grid item xs={2}>
                <Filter {...this.props} for_page='buyer'/>
            </Grid>
            <Grid item xs={10}>
                <SearchBar {...this.props} for_page='buy' query={search}/>
                <BikeCards {...this.props} for_page='buyer' query={search} app={this.props.app}/>
            </Grid>
          </Grid>
      </ThemeProvider>
    );
  }
}


export default (props) => (
  <Home {...props} params={useParams()}/>
);