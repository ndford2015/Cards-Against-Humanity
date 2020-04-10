import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { autobind } from 'core-decorators';

export class JudgeView extends React.Component<any, any> {
    public waitingString: string = 'Still waiting on other players to submit their cards!';
    public pickCardString: string = 'Pick one of the below cards as a winner!';
    @autobind
    public getJudgeCards(): JSX.Element {
        return this.props.playedCards.map((card: any) => {
                const pickWinner: any = () => this.props.pickWinner(card.playerId)
                return (
                    <div className="judge-card">
                        {card.cardName}
                        <Button onClick={pickWinner} positive>Select as winner</Button>
                    </div>
                )
            });
    }
    
    public render(): JSX.Element {
        const anyCardsPlayed: boolean = !!this.props.playedCards.length;
        return (
            <div className="judge-view-container">
                <div className="judge-header">{`Hi ${this.props.playerName}! You are the judge for this round!`}</div>
                <div className="judge-info">{anyCardsPlayed ? this.pickCardString : this.waitingString}</div>
                {this.getJudgeCards()}
            </div>
        )
    }
}