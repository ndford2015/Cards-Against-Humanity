import * as React from 'react';
import { Button } from 'semantic-ui-react';

export class PlayerView extends React.Component<any, any> {
    public render():any {
        console.log('Player info: ', this.props.playerInfo);
        const { playerInfo } = this.props;
        return (
            <div className="player-view-container">
                <div className="player-view-header">{`Player view for ${playerInfo.name}!`}</div>
                <div className="player-view-buttons">
                    <Button positive disabled={playerInfo.whiteCards.length >= 10} onClick={this.props.getWhiteCard}>Get white card</Button>
                    <Button positive>Swap all cards</Button>
                </div>
                <div className="player-view-cards">
                    {this.props.playerInfo.whiteCards.map((card: string) => {
                        return (<div className="white-card">{card}<Button positive>Play Card</Button></div>)
                    })}
                </div>
            </div>)
    }
}