import * as React from 'react';
import { Button } from 'semantic-ui-react';

export class PlayerView extends React.Component<any, any> {
    public render():any {
        const { playerInfo, playedCards } = this.props;
        const playedCard = playedCards.find((card: any) => card.playerId === playerInfo.id);
        return (
            <div className="player-view-container">
                <div className="player-view-header">{`Hi ${playerInfo.name}! Select a card for this round!`}</div>
                <div className="player-view-buttons">
                    <Button negative>Swap all cards for new set</Button>
                </div>
                <div className="player-view-cards">
                    {this.props.playerInfo.whiteCards.map((card: string) => {
                        const playCard: any = () => this.props.playCard(card, this.props.playerInfo.id)
                        return (<div className="white-card">
                            {card}
                            <Button onClick={playCard} disabled={!!playedCard} positive>Play Card</Button>
                        </div>)
                    })}
                </div>
            </div>)
    }
}