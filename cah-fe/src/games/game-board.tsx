import * as React from 'react'
import socketIOClient from 'socket.io-client';
import { BACKEND_URL } from '../constants/api';
import { Button, Loader } from 'semantic-ui-react';
import { autobind } from 'core-decorators';

export class GameBoard extends React.Component<any, any> {
    socket: SocketIOClient.Socket = socketIOClient();
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

    @autobind
    public getMakeJudgeButton(playerId: string): JSX.Element | null {
        const setJudge: any = () => this.socket.emit('setJudge', this.state.game.id, playerId);
        return !this.state.game.currentJudge 
            ? <Button onClick={setJudge} positive>Make judge</Button>
            : null;
    }

    @autobind
    public nextRound(): void {
        this.socket.emit('nextRound', this.state.game.id, null)
    }

    public render(): JSX.Element {
        if (!this.state.game) {
            return <Loader active/>
        }
        const { currentJudge, activeBlackCard, players, name } = this.state.game;
        return (
            <div>
                <div className="game-board-header">{`Welcome to game: ${name}`}</div>
                <div className="round-info">
                    <div className="active-judge-header">
                        {currentJudge 
                            ? `${players[currentJudge].name} is judging!` 
                            : '**No judge selected, choose a judge to start round!**'}
                    </div>
                    <div className="active-black-card">
                        {activeBlackCard.text}
                    </div>
                    <Button negative onClick={this.nextRound} >Skip this round</Button>
                </div>
                <div className="game-players">
                    {Object.values(players).map((player: any) => {
                        const activeJudgeClass: string = currentJudge === player.id ? ' active-judge' : '';
                        return (<div className={`player-card${activeJudgeClass}`}>
                            <div className="player-card-header">{player.name}</div>
                            <div><div>{'Score: '}</div>{player.score}</div>
                            {this.getMakeJudgeButton(player.id)}
                        </div>)
                    })}
                </div>
            </div>)
    }
}