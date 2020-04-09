import * as React from 'react';
import { Button } from 'semantic-ui-react';

export class PlayerView extends React.Component<any, any> {
    public render():any {
        const { playerInfo, playedCards } = this.props;
        const playedCard = playedCards.find((card: any) => card.playerId === playerInfo.id);
        const swapCards: any = () => this.props.swapCards(playerInfo.id);
        return (
            <div className="player-view-container">
                <div className="player-view-header">{`Hi ${playerInfo.name}! Select a card for this round!`}</div>
                <div className="player-view-buttons">
                    <Button onClick={swapCards} negative>Swap all cards for new set</Button>
                </div>
                <div className="player-view-cards">
                    {this.props.playerInfo.whiteCards.map((card: string) => {
                        const playCard: any = () => this.props.playCard(card, this.props.playerInfo.id)
                        return (<div className="white-card">
                            {card}
                            <Button onClick={playCard} disabled={!!playedCard || !this.props.currentJudge} positive>Play Card</Button>
                        </div>)
                    })}
                </div>
            </div>)
    }
}