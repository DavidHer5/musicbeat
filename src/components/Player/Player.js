//Importaciones
import React, {useState}from 'react';
import ReactPlayer from 'react-player';
import { Grid, Progress, Icon, Input, Image } from "semantic-ui-react";

//Importación del Sass
import "./Player.scss";

//Imagen y nombre que definí yo para probar si funciona
const songData = {
    image: "https://firebasestorage.googleapis.com/v0/b/musicbeat-2bddd.appspot.com/o/album%2F32994138-bb50-4d04-b162-f1d4351cdcfa?alt=media&token=bb4c4356-77a2-478b-bad6-f37efcef4bf2",
    name: "Efecto"
}

export default function Player(props) {
    //Estados
    //const {songData} = props;
    const [playedSeconds, setPlayedSeconds] = useState(20);
    const [totalSeconds, setTotalSeconds] = useState(100);
    const [playing, setPlaying] = useState(false);

    const onStart = () => {
        setPlaying(true);
    }

    const onPause = () => {
        setPlaying(false);
    }


  return (
    <div className='player'>
        <Grid>
            <Grid.Column width={4} className="izquierda">
                <Image src={songData?.image} />
                {songData.name}
            </Grid.Column>
            <Grid.Column width={8} className="centro">
                <div className='controles'>
                    {playing ? (
                        <Icon onClick={onPause} name="pause circle outline"/>

                    ) : (
                        <Icon onClick={onStart} name="play circle outline"/>
                    )}
                </div>
                <Progress 
                    progress="value" 
                    value={playedSeconds}
                    total={totalSeconds} 
                    size="tiny"   
                />
            </Grid.Column>
            <Grid.Column width={4} className="derecha">
                <h2>Derecha</h2>
            </Grid.Column>
        </Grid>
    </div>
  )
}
