import React, { Component } from 'react';
import './Tic-tac-toe.css'
import Button from '../components/Button';
const initialState = {
    signsPos: 
    [
        [null ,null ,null ],
        [null ,null ,null ],
        [null ,null ,null ]
    ],
    clearSignPos: false,
    currentPos: [0,0],
    currentSign:'X',
    turn: 1,
    displayNone: false,
    playerWin: false

}
export default class TicTacToe extends Component {
    state = {...initialState}
    renderAllButtons(Click){
        let aux = 0;
        const signsPos = this.state.signsPos;
        return signsPos.map((item,x) => item.map((item,y) => { 
            aux++;
            const pos = [x,y];
            const validPos = !signsPos[x][y];
            return (
                <Button key={aux} state={this.state} buttonClass={signsPos[x][y] === null ? '' : signsPos[x][y]} click={Click} pos={pos} validPos={validPos}/>
            )
        }))
    }
    renderTitle(){
        if(this.state.displayNone && this.state.playerWin){
            return <h1 className='turn'>Jogador <span className={this.state.currentSign}/> ganhou!</h1>;
        }else if(this.state.displayNone){
            return <h1 className='turn'>Empate!</h1>;
        }
        return <h1 className='turn'>Vez de<span className={this.state.currentSign}/></h1>;
    }
    reStartGame(){
        console.log("Restart")
        this.setState({ ...initialState })
        this.setState({
            signsPos: [
                [null ,null ,null ],
                [null ,null ,null ],
                [null ,null ,null ]
            ]
        })
    }
    setSign(sign){
        // console.log(sign)
        this.setState({currentSign: sign})
    }
    setPosition(x,y){
        const currentSign = this.state.currentSign;
        this.state.signsPos[x][y] = currentSign;
        // console.log(this.state.signsPos)
    }
    finishGame(actX,actY){
        const state = this.state;
        const turn = state.turn;
        console.log(turn);
        if( turn >= 9){
            console.log("Fim por empate.")
            this.setState({ displayNone: true, playerWin: false});
            return true;
        }
        this.setState({turn: state.turn + 1})
        const signsPos = state.signsPos;
        const currentSign = state.currentSign;
        if(signsPos[actX][0] === currentSign && signsPos[actX][1] === currentSign && signsPos[actX][2] === currentSign){
            console.log("Fim pela horizontal", actX, currentSign);
            this.setState({ displayNone: true, playerWin: true});
            return true;
        }else if(signsPos[0][actY] === currentSign && signsPos[1][actY] === currentSign && signsPos[2][actY] === currentSign){
            console.log("Fim pela vertical", actY,currentSign);
            this.setState({ displayNone: true, playerWin: true});
            return true;
        }else if((actX === actY) || (actX === 0 && actY === 2) || (actX === 2 && actY === 0)){
            if(signsPos[0][0] === currentSign && signsPos[1][1] === currentSign && signsPos[2][2] === currentSign){
                console.log("Fim pela Diagonal 1");
                this.setState({ displayNone: true, playerWin: true});
                return true;
            }else if(signsPos[2][0] === currentSign && signsPos[1][1] === currentSign && signsPos[0][2] === currentSign){
                console.log("Fim pela Diagonal 2");
                this.setState({ displayNone: true, playerWin: true});
                return true;
            }
        }
        return false;
    }
    finishTurn(pos,validPos){
        if(validPos){
            this.setPosition(pos[0],pos[1])
            if(!this.finishGame(pos[0],pos[1])){
                this.setSign(this.state.currentSign === 'X' ? 'O' : 'X')
            }
        }
    }
    render() {
        const reStartGame = () => this.reStartGame();
        const finishTurn = (pos,validPos) => this.finishTurn(pos,validPos);
        return(
            <div className='Background'>
                <div className='title'>
                    <h1>Jogo da Velha</h1>
                </div>
                { this.renderTitle()}
                <div className={`tic_tac_toe ${this.state.displayNone ? 'none' : ''}`} none>
                    { this.renderAllButtons(finishTurn) }
                </div>
                <button className='reStartButton' onClick={() => reStartGame()}>
                    <p>Reiniciar Jogo</p>
                </button>
            </div>
        )
    }
}