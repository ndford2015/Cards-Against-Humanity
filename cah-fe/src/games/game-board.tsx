import * as React from 'react'

export class GameBoard extends React.Component<any, any> {
    public render(): JSX.Element {
        console.log('props:', this.props)
        return <div>{`Welcome to game ${this.props.match.params.gameId}`}</div>
    }
}