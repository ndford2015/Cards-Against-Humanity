import * as React from 'react';
import { Button, Input, InputOnChangeData, Modal } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import { BACKEND_URL } from '../constants/api';
import { autobind } from 'core-decorators';
import './games.css';
import { PlayerView } from './player-view';

export interface IGameState {
    readonly games: any;
    readonly gameName: string;
    readonly playerName: string;
    readonly gameToJoin: string;
    readonly modalOpen: boolean;
    readonly subscribedGame: any;
}
export class Games extends React.Component<any, IGameState> {
    public socket: SocketIOClient.Socket = socketIOClient(BACKEND_URL);
    constructor(props: any) {
        super(props);
        this.state = {
            games: {},
            gameToJoin: '',
            gameName: '',
            playerName: '',
            modalOpen: false,
            subscribedGame: null
        }
    }

    public componentDidMount(): void {
        // const socket: SocketIOClient.Socket = socketIOClient(BACKEND_URL);
        this.socket.on('getGames', (games: any) => {
            this.setState({games});
            console.log('games: ', games);
        });
       
        this.socket.on('updatedGameState', (game: any) => {
            console.log('SUBSCRIBING')
            this.setState({subscribedGame: game})
        });
        
    }

    @autobind
    public createGame(): void {
        this.socket.emit('createGame', this.state.gameName);
        this.props.history.push(`/games/${this.socket.id}`);
    }

    @autobind 
    public joinGame(): void {
        if (this.state.gameToJoin) {
            console.log('JOINING A GAME',)
            this.socket.emit('joinGame', this.state.gameToJoin, this.state.playerName);
            this.socket.emit('subscribeToGame', this.state.gameToJoin);
        }
    }

    @autobind 
    public setCurrentGame(gameId: string): void {
        this.setState({gameToJoin: gameId, modalOpen: true});
    }

    @autobind
    public setGameName(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void {
        event.preventDefault();
        this.setState({gameName: data.value})
    }

    @autobind
    public setPlayerName(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void {
        event.preventDefault();
        this.setState({playerName: data.value})
    }

    @autobind
    public getJoinModal(): JSX.Element {
        return (
            <Modal closeOnDimmerClick onClose={this.onCloseModal} open={this.state.modalOpen} size={'mini'}>
                <Modal.Content>
                    <div>Please enter your name to join game</div>
                    <Input onChange={this.setPlayerName} /> 
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={this.joinGame}>Join Game</Button>
                </Modal.Actions>
            </Modal>)
    }

    @autobind
    public onCloseModal(): void {
        this.setState({modalOpen: false});
    }

    public render(): JSX.Element {
        return this.state.subscribedGame 
            ? <PlayerView playerInfo={this.state.subscribedGame.players[this.socket.id]}/> 
            : (
            <div className="games-container">
                <Input onChange={this.setGameName}/>
                <Button onClick={this.createGame}>Create Game</Button>
                {Object.values(this.state.games).map((game: any) => {
                    const setCurrentGame: any = () => this.setCurrentGame(game.id)
                    return <Button className="game-button" onClick={setCurrentGame}>{`Join ${game.name}`}</Button>
                })}
                {this.getJoinModal()}
            </div>
        )
    }
}