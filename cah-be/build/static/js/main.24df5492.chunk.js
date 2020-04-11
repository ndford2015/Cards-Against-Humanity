(this["webpackJsonpcah-fe"]=this["webpackJsonpcah-fe"]||[]).push([[0],{249:function(e,t,a){e.exports=a(441)},254:function(e,t,a){},255:function(e,t,a){},284:function(e,t){},287:function(e,t,a){},441:function(e,t,a){"use strict";a.r(t);var r,n,o,s=a(0),i=a.n(s),c=a(47),l=a.n(c),p=(a(254),a(255),a(34)),m=a(35),u=a(36),d=a(37),y=a(17),h=a(449),g=a(447),b=a(442),v=a(95),f=a.n(v),k=a(18),O=(a(287),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.playerInfo,r=t.playedCards.find((function(e){return e.playerId===a.id}));return s.createElement("div",{className:"player-view-container"},s.createElement("div",{className:"player-view-header"},"Hi ".concat(a.name,"! Select a card for this round!")),s.createElement("div",{className:"player-view-buttons"},s.createElement(b.a,{onClick:function(){return e.props.swapCards(a.id)},negative:!0},"Swap all cards for new set")),s.createElement("div",{className:"player-view-cards"},this.props.playerInfo.whiteCards.map((function(t){return s.createElement("div",{className:"white-card"},t,s.createElement(b.a,{onClick:function(){return e.props.playCard(t,e.props.playerInfo.id)},disabled:!!r||!e.props.currentJudge,positive:!0},"Play Card"))}))))}}]),a}(s.Component)),j=(r=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(p.a)(this,a);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).waitingString="Still waiting on other players to submit their cards!",e.pickCardString="Pick one of the below cards as a winner!",e}return Object(m.a)(a,[{key:"getJudgeCards",value:function(){var e=this;return this.props.playedCards.map((function(t){return s.createElement("div",{className:"judge-card"},t.cardName,s.createElement(b.a,{onClick:function(){return e.props.pickWinner(t.playerId)},positive:!0},"Select as winner"))}))}},{key:"render",value:function(){var e=!!this.props.playedCards.length;return s.createElement("div",{className:"judge-view-container"},s.createElement("div",{className:"judge-header"},"Hi ".concat(this.props.playerName,"! You are the judge for this round!")),s.createElement("div",{className:"judge-info"},e?this.pickCardString:this.waitingString),this.getJudgeCards())}}]),a}(s.Component),Object(y.a)(r.prototype,"getJudgeCards",[k.a],Object.getOwnPropertyDescriptor(r.prototype,"getJudgeCards"),r.prototype),r),C=(n=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(p.a)(this,a),(r=t.call(this,e)).socket=f()(),r.state={games:{},gameToJoin:"",gameName:"",playerName:"",modalOpen:!1,subscribedGame:null,playerId:""},r}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.socket.on("connect",(function(){var t=window.localStorage.getItem("playerId");t?e.setState({playerId:t}):(e.setState({playerId:e.socket.id}),window.localStorage.setItem("playerId",e.socket.id))})),this.socket.on("getGames",(function(t){e.setState({games:t})})),this.socket.on("updatedGameState",(function(t){e.setState({subscribedGame:t})})),this.socket.on("reconnect",(function(t){e.state.subscribedGame&&e.socket.emit("subscribeToGame",e.state.subscribedGame.id)}))}},{key:"getWhiteCard",value:function(){this.socket.emit("getWhiteCard",this.state.subscribedGame.id,this.state.playerId)}},{key:"createGame",value:function(){this.socket.emit("createGame",this.state.gameName),this.props.history.push("/games/".concat(this.socket.id))}},{key:"joinGame",value:function(){this.state.gameToJoin&&(this.socket.emit("joinGame",this.state.gameToJoin,this.state.playerName,this.state.playerId),this.socket.emit("subscribeToGame",this.state.gameToJoin))}},{key:"setCurrentGame",value:function(e){this.state.games[e].players[this.state.playerId]?this.socket.emit("subscribeToGame",e):this.setState({gameToJoin:e,modalOpen:!0})}},{key:"setGameName",value:function(e,t){e.preventDefault(),this.setState({gameName:t.value})}},{key:"setPlayerName",value:function(e,t){e.preventDefault(),this.setState({playerName:t.value})}},{key:"playCard",value:function(e,t){this.socket.emit("playCard",this.state.subscribedGame.id,t,e)}},{key:"getJoinModal",value:function(){return s.createElement(h.a,{closeOnDimmerClick:!0,onClose:this.onCloseModal,open:this.state.modalOpen,size:"mini"},s.createElement(h.a.Content,null,s.createElement("div",null,"Please enter your name to join game"),s.createElement(g.a,{onChange:this.setPlayerName})),s.createElement(h.a.Actions,null,s.createElement(b.a,{positive:!0,onClick:this.joinGame},"Join Game")))}},{key:"onCloseModal",value:function(){this.setState({modalOpen:!1})}},{key:"nextRound",value:function(e){this.socket.emit("nextRound",this.state.subscribedGame.id,e)}},{key:"swapCards",value:function(e){this.socket.emit("swapCards",this.state.subscribedGame.id,e)}},{key:"getPlayerView",value:function(){var e=this.state,t=e.subscribedGame,a=e.playerId;return t.currentJudge===a?s.createElement(j,{playedCards:t.playedWhiteCards,playerName:t.players[a].name,pickWinner:this.nextRound}):s.createElement(O,{getWhiteCard:this.getWhiteCard,playerInfo:this.state.subscribedGame.players[this.state.playerId],playedCards:this.state.subscribedGame.playedWhiteCards,playCard:this.playCard,swapCards:this.swapCards,currentJudge:this.state.subscribedGame.currentJudge})}},{key:"render",value:function(){var e=this;return this.state.subscribedGame?this.getPlayerView():s.createElement("div",{className:"games-container"},s.createElement("h3",null,"Create a new game!"),s.createElement("div",null,s.createElement(g.a,{placeholder:"Enter a name for the game!",onChange:this.setGameName}),s.createElement(b.a,{className:"create-game-btn",onClick:this.createGame},"Create Game")),s.createElement("div",{className:"available-games"},"Available Games",Object.values(this.state.games).map((function(t){return s.createElement(b.a,{className:"game-button",onClick:function(){return e.setCurrentGame(t.id)}},"Join ".concat(t.name))}))),this.getJoinModal())}}]),a}(s.Component),Object(y.a)(n.prototype,"getWhiteCard",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"getWhiteCard"),n.prototype),Object(y.a)(n.prototype,"createGame",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"createGame"),n.prototype),Object(y.a)(n.prototype,"joinGame",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"joinGame"),n.prototype),Object(y.a)(n.prototype,"setCurrentGame",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"setCurrentGame"),n.prototype),Object(y.a)(n.prototype,"setGameName",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"setGameName"),n.prototype),Object(y.a)(n.prototype,"setPlayerName",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"setPlayerName"),n.prototype),Object(y.a)(n.prototype,"playCard",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"playCard"),n.prototype),Object(y.a)(n.prototype,"getJoinModal",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"getJoinModal"),n.prototype),Object(y.a)(n.prototype,"onCloseModal",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"onCloseModal"),n.prototype),Object(y.a)(n.prototype,"nextRound",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"nextRound"),n.prototype),Object(y.a)(n.prototype,"swapCards",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"swapCards"),n.prototype),Object(y.a)(n.prototype,"getPlayerView",[k.a],Object.getOwnPropertyDescriptor(n.prototype,"getPlayerView"),n.prototype),n),w=a(236),E=a(38),G=a(448),N=(o=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(p.a)(this,a),(r=t.call(this,e)).socket=f()(),r.state={game:null},r}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.socket.emit("subscribeToGame",this.props.match.params.gameId),this.socket.on("updatedGameState",(function(t){e.setState({game:t})}))}},{key:"getMakeJudgeButton",value:function(e){var t=this;return this.state.game.currentJudge?null:s.createElement(b.a,{onClick:function(){return t.socket.emit("setJudge",t.state.game.id,e)},positive:!0},"Make judge")}},{key:"nextRound",value:function(){this.socket.emit("nextRound",this.state.game.id,null)}},{key:"render",value:function(){var e=this;if(!this.state.game)return s.createElement(G.a,{active:!0});var t=this.state.game,a=t.currentJudge,r=t.activeBlackCard,n=t.players,o=t.name;return s.createElement("div",null,s.createElement("div",{className:"game-board-header"},"Welcome to game: ".concat(o)),s.createElement("div",{className:"round-info"},s.createElement("div",{className:"active-judge-header"},a?"".concat(n[a].name," is judging!"):"**No judge selected, choose a judge to start round!**"),s.createElement("div",{className:"active-black-card"},r.text),s.createElement(b.a,{negative:!0,onClick:this.nextRound},"Skip this round")),s.createElement("div",{className:"game-players"},Object.values(n).map((function(t){var r=a===t.id?" active-judge":"";return s.createElement("div",{className:"player-card".concat(r)},s.createElement("div",{className:"player-card-header"},t.name),s.createElement("div",null,s.createElement("div",null,"Score: "),t.score),e.getMakeJudgeButton(t.id))}))))}}]),a}(s.Component),Object(y.a)(o.prototype,"getMakeJudgeButton",[k.a],Object.getOwnPropertyDescriptor(o.prototype,"getMakeJudgeButton"),o.prototype),Object(y.a)(o.prototype,"nextRound",[k.a],Object.getOwnPropertyDescriptor(o.prototype,"nextRound"),o.prototype),o);var J=function(){return i.a.createElement(w.a,null,i.a.createElement(E.c,null,i.a.createElement(E.a,{key:"games",exact:!0,path:"/",component:Object(E.f)(C)}),i.a.createElement(E.a,{key:"game-board",exact:!0,path:"/games/:gameId",component:Object(E.f)(N)})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[249,1,2]]]);
//# sourceMappingURL=main.24df5492.chunk.js.map