import React from 'react';
import '../css/IndividualBikePages.css';
import {ImageList, ImageListItem} from '@mui/material';

export default class BikeImageList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { image_list, bike } = this.props;
        /* TODO: Later adjust the cols and rows to be based on the height and row of the image given by the user
         listing the bike. (phase 2) */
        return(
            <ImageList variant='quilted'
                       sx={{ width: 1200, height: 400 }}
                       cols={4}
                       rowHeight={200}
            >
                {image_list.map((image) => (
                    <ImageListItem key={`bike${bike._id}-image${image_list.indexOf(image)}`} cols={2} rows={1}>
                    <img
                      src={image}
                      alt={image}
                      loading='lazy'
                    />
                  </ImageListItem>
                ))}
            </ImageList>
        )
    }
}