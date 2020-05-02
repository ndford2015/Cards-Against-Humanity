import * as React from 'react';
import { Button, Input, InputOnChangeData, Modal } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import { BACKEND_URL } from '../constants/api';
import { autobind } from 'core-decorators';
import './games.css';
import { PlayerView } from './player-view';
import { JudgeView } from './judge-view';

export interface IGameState {
    readonly games: any;
    readonly gameName: string;
    readonly playerName: string;
    readonly playerId: string;
    readonly gameToJoin: string;
    readonly modalOpen: boolean;
    readonly subscribedGame: any;
}
export class Games extends React.Component<any, IGameState> {
    public socket: SocketIOClient.Socket = socketIOClient();
    constructor(props: any) {
        super(props);
        this.state = {
            games: {},
            gameToJoin: '',
            gameName: '',
            playerName: '',
            modalOpen: false,
            subscribedGame: null,
            playerId: ''
        }
    }

    public componentDidMount(): void {
        const { gameId } = this.props.match.params;
        this.socket.on('connect', () => { 
            if (gameId) {
                this.socket.emit('subscribeToGame', gameId);
                this.setState({modalOpen: true});
            }
            const playerId: string | null = window.localStorage.getItem('playerId');
            if (playerId) {
                this.setState({playerId});
            } else {
                this.setState({playerId: this.socket.id});
                window.localStorage.setItem('playerId', this.socket.id);
            }
        });
        this.socket.on('getGames', (games: any) => {
            this.setState({games});
        });
       
        this.socket.on('updatedGameState', (game: any) => {
            this.setState({subscribedGame: game})
        });
        this.socket.on('reconnect', (attemptNumber: number) => {
            if (this.state.subscribedGame) {
                this.socket.emit('subscribeToGame', this.state.subscribedGame.id)
            }
        })
    }

    @autobind
    public getWhiteCard(): void {
        this.socket.emit('getWhiteCard', this.state.subscribedGame.id, this.state.playerId);
    }

    @autobind
    public createGame(): void {
        this.socket.emit('createGame', this.state.gameName);
        const gameId: string = this.socket.id.substring(0, 4);
        this.props.history.push(`/games/${gameId}`);
    }

    @autobind 
    public joinGame(): void {
        const { gameId } = this.props.match.params;
        this.socket.emit('joinGame', gameId, this.state.playerName, this.state.playerId);
    }

    @autobind 
    public setCurrentGame(gameId: string): void {
        if (this.state.games[gameId].players[this.state.playerId]) {
            this.socket.emit('subscribeToGame', gameId);
        } else {
            this.setState({gameToJoin: gameId, modalOpen: true});
        }
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
    public playCard(cardName: string, playerId: string) {
        this.socket.emit('playCard', this.state.subscribedGame.id, playerId, cardName);
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

    @autobind
    public nextRound(playerId: string): void {
        this.socket.emit('nextRound', this.state.subscribedGame.id, playerId)
    }

    @autobind
    public swapCards(playerId: string): void {
        this.socket.emit('swapCards', this.state.subscribedGame.id, playerId);
    }

    @autobind 
    public getPlayerView(): JSX.Element {
        const { subscribedGame, playerId } = this.state;
        return subscribedGame.currentJudge === playerId
            ? <JudgeView
                playedCards={subscribedGame.playedWhiteCards}
                numPlayers={Object.keys(subscribedGame.players).length - 1}
                playerName={subscribedGame.players[playerId].name}
                pickWinner={this.nextRound}
            />
            : <PlayerView 
                getWhiteCard={this.getWhiteCard} 
                playerInfo={this.state.subscribedGame.players[this.state.playerId]}
                playedCards={this.state.subscribedGame.playedWhiteCards}
                playCard={this.playCard}
                swapCards={this.swapCards}
                currentJudge={this.state.subscribedGame.currentJudge}
            /> 
    }

    public getCreateGameScreen(): JSX.Element {
        return (
            <div className="games-container">
                <h3>{'Create a new game!'}</h3>
                <div>
                    <Input placeholder="Enter a name for the game!" onChange={this.setGameName}/>
                    <Button 
                        className="create-game-btn" 
                        onClick={this.createGame}
                    >
                        Create Game
                    </Button>
                </div>
            </div>
        )
    }

    public render(): JSX.Element {
        return this.state.subscribedGame && this.state.subscribedGame.players[this.state.playerId]
            ? this.getPlayerView() 
            : (
            <>
                {!this.props.match.params.gameId && this.getCreateGameScreen()}
                {this.getJoinModal()}     
            </>)
    }
}