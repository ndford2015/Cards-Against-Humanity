import * as React from 'react'
import socketIOClient from 'socket.io-client';
import { BACKEND_URL } from '../constants/api';
import { Button, Loader } from 'semantic-ui-react';

export class GameBoard extends React.Component<any, any> {
    socket: SocketIOClient.Socket = socketIOClient(BACKEND_URL);
    constructor(props: any) {
        super(props);
        this.state = {
            game: null
        }
    }
    
    public componentDidMount(): void {
        this.socket.emit('subscribeToGame', this.props.match.params.gameId)
        this.socket.on('updatedGameState', (game: any) => {
            this.setState({game});
        });
    }

    public render(): JSX.Element {
        console.log(this.state.game);
        if (!this.state.game) {
            return <Loader active/>
        }
        const { currentJudge, activeBlackCard, players, name } = this.state.game;
        return (
            <div>
                {`Welcome to ${name}`}
                <div className="round-info">
                    <div className="active-judge">
                        {currentJudge 
                            ? `${players[currentJudge].name} is judging` 
                            : "No judge selected, choose a judge for this round!"}
                    </div>
                    <div className="active-black-card">
                        {"Current black card: "}
                        {activeBlackCard || "No black card selected, click the button below to start a new round!"}
                    </div>
                    <Button positive>Start a new round</Button>
                </div>
                <div className="game-players">
                    {Object.values(players).map((player: any) => {
                        return (<div className="player-card">
                            <div>{player.name}</div>
                            <div>{player.score}</div>
                            <Button positive>Make judge</Button>
                        </div>)
                    })}
                </div>
            </div>)
    }
}