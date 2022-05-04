import React from 'react';
import BikeCards from './BikeCards';
import SearchBar from './searchBar';
import { useParams } from 'react-router-dom';

class Purchase extends React.Component {
    constructor(props) {
        super(props);
        const search = this.props.params.search ? this.props.params.search : '';
        console.log(search);
        this.props.history.push(search.length > 0 ? `/purchase-history/${search}` : '/purchase-history');
    }

    render() {
        const search = this.props.params.search ? this.props.params.search : '';
        return(
            <div>
                <SearchBar {...this.props} for_page='purchase-history' query={search}/>
                <BikeCards {...this.props} for_page='purchase-history' query={search} app={this.props.app}/>
            </div>
          );
    }

}

export default (props) => (
    <Purchase {...props} params={useParams()}/>
);