//Importaciones
import React from 'react';
import { Grid, Image } from "semantic-ui-react";

//Importación del Sass
import "./Player.scss";

export default function Player(props) {
    //Estados
    const {songData} = props;

  return (
    <div className='player'>
        <Grid>
            <Grid.Column width={4} className="izquierda">
                <Image src={songData?.image} />
                {songData?.name}
            </Grid.Column>
            <Grid.Column width={8} className="centro">
                <div className='slider-container'>
                    <audio 
                        src={songData?.url}
                        controls
                        autoPlay
                        loop
                    >
                    </audio> 
                </div>
            </Grid.Column>
            
        </Grid>
    </div>
  )
}
