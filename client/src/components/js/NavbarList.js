import React from 'react';
import { Box } from '@mui/material';
import NavbarButton from "./NavbarButton";

export default class NavbarList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { pages, flexGrow, history, currentUserRole, app } = this.props;
        return(
            <Box sx={{ flexGrow: flexGrow, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                        <NavbarButton {...this.props} key={ page } page={ page } currentUserRole={currentUserRole} history={history} app={app}/>
                ))}
            </Box>
        );
    }
}