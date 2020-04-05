import * as React from 'react';
import { Button, Input, InputOnChangeData } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import { BACKEND_URL } from '../constants/api';
import { autobind } from 'core-decorators';

export interface IGameState {
    readonly games: any;
    readonly gameName: string;
    readonly currentGame: any;
}
export class Games extends React.Component<any, IGameState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            games: {},
            currentGame: null,
            gameName: ''
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
    }

    @autobind joinGame(game: any): void {
        this.setState({currentGame: game})
    }

    @autobind
    public setGameName(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void {
        event.preventDefault();
        this.setState({gameName: data.value})
    }

    public render(): JSX.Element {
        return (
            <>
                <Input onChange={this.setGameName}/>
                <Button onClick={this.createGame}>Create Game </Button>
                {Object.values(this.state.games).map((game: any) => {
                    return <Button onClick={this.joinGame}>{`Join game ${game.name}`}</Button>
                })}
            </>
        )
    }
}