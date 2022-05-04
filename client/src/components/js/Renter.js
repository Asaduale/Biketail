import React from 'react';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Filter from './filter'
import SearchBar from './searchBar'
import BikeCards from './BikeCards';


  
const overallMode = createTheme({
    palette: {
        mode:  'light' ,
    },
});

class Renter extends React.Component {
    constructor(props) {
        super(props);
        const search = this.props.params.search ? this.props.params.search : '';
        console.log(search);
        this.props.history.push(search.length > 0 ? `/rent/${search}` : '/rent');
    }
    render() {
        const search = this.props.params.search ? this.props.params.search : '';
        return(
            
        <ThemeProvider theme={overallMode}>
            <Grid container>
                <Grid item xs={2}>
                    <Filter {...this.props} for_page='renter'/>
                </Grid>
                <Grid item xs={10}>
                    <SearchBar {...this.props} for_page='rent' query={search}/>
                    <BikeCards {...this.props} for_page='renter' query={search}/>
                </Grid>
                
            </Grid>
        </ThemeProvider>

        );
    }
}


export default (props) => (
    <Renter {...props} params={useParams()}/>
);