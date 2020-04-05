import * as React from 'react';
import { Button, Input, InputOnChangeData, Modal } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import { BACKEND_URL } from '../constants/api';
import { autobind } from 'core-decorators';
import './games.css';

export interface IGameState {
    readonly games: any;
    readonly gameName: string;
    readonly playerName: string;
    readonly currentGame: any;
    readonly modalOpen: boolean;
}
export class Games extends React.Component<any, IGameState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            games: {},
            currentGame: null,
            gameName: '',
            playerName: '',
            modalOpen: false
        }
    }

    public componentDidMount(): void {
        const socket: SocketIOClient.Socket = socketIOClient(BACKEND_URL);
        socket.on('getGames', (games: any) => {
            this.setState({games});
            console.log('games: ', games);
        });
    }

    @autobind
    public createGame(): void {
        const socket: SocketIOClient.Socket = socketIOClient(BACKEND_URL);
        socket.emit('createGame', this.state.gameName);
        socket.on('connect', () => this.props.history.push(`/games/${socket.id}`));
    }

    @autobind 
    public joinGame(): void {
        const socket: SocketIOClient.Socket = socketIOClient(BACKEND_URL);
        if (this.state.currentGame) {
            socket.emit('joinGame', this.state.currentGame.id, this.state.playerName);
        }
    }

    @autobind 
    public setCurrentGame(game: any): void {
        this.setState({currentGame: game, modalOpen: true});
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
        return (
            <div className="games-container">
                <Input onChange={this.setGameName}/>
                <Button onClick={this.createGame}>Create Game</Button>
                {Object.values(this.state.games).map((game: any) => {
                    const setCurrentGame: any = () => this.setCurrentGame(game)
                    return <Button className="game-button" onClick={setCurrentGame}>{`Join ${game.name}`}</Button>
                })}
                {this.getJoinModal()}
            </div>
        )
    }
}