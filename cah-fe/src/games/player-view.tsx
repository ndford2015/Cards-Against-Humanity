import * as React from 'react';

export class PlayerView extends React.Component<any, any> {
    public render():any {
        console.log('Player info: ', this.props.playerInfo);
        return <div>{`Player view for ${this.props.playerInfo.name}!`}</div>
    }
}