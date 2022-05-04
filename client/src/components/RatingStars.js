import React from "react";
import { Icon } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default class RatingStars extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { stars, num_of_ratings } = this.props;
        return (
            <div>
                {stars === 0 && <Icon><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/></Icon>}
                {stars === 1 && <Icon><StarIcon /><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/></Icon>}
                {stars === 2 && <Icon><StarIcon /><StarIcon /><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/></Icon>}
                {stars === 3 && <Icon><StarIcon /><StarIcon /><StarIcon/><StarBorderIcon/><StarBorderIcon/></Icon>}
                {stars === 4 && <Icon><StarIcon /><StarIcon /><StarIcon/><StarIcon/><StarBorderIcon/></Icon>}
                {stars === 5 && <Icon><StarIcon /><StarIcon /><StarIcon/><StarBorderIcon/><StarIcon/></Icon>}
                <span>(by {num_of_ratings} users)</span>
            </div>
        )
    }
}
