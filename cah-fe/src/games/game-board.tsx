import * as React from 'react'
import socketIOClient from 'socket.io-client';
import { BACKEND_URL } from '../constants/api';

export class GameBoard extends React.Component<any, any> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            game: {}
        }
    }
    
    public componentDidMount(): void {
        const socket: SocketIOClient.Socket = socketIOClient(BACKEND_URL);
        socket.emit('subscribeToGame', this.props.match.params.gameId)
        socket.on('updatedGameState', (game: any) => {
            this.setState({game});
        });
    }

    public render(): JSX.Element {
        console.log('game:', this.state.game)
        return <div>{`Welcome to game ${this.state.game.name}`}</div>
    }
}