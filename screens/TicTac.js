import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Circle from '../components/Circle';
import Cross from '../components/Cross';
import { CENTERPOINTS, AREAS, CONDITIONS, GAME_RESULT_NO, GAME_RESULT_USER, GAME_RESULT_AI, GAME_RESULT_TIE, CENTER_POINTS } from '../components/Constants';
import PromptArea from './PromptArea';

export default class TicTac extends React.Component{

    constructor(){
        super()
        this.state= {
        AIInputs: [],
        userInputs: [],
        result: GAME_RESULT_NO,
        round: 0,
        }
    }      

    restart() {
        const { round } = this.state
        this.setState({
            AIInputs: [],
            userInputs: [],
            result: GAME_RESULT_NO,
            round: round + 1
        })
        setTimeout(() => {
            if (round % 2 === 0) {
                this.AIAction()
            }
        }, 10)
    }

    boardClickHandler(e) {

        function allInputs() {
        return e !== area.id
        }

        console.log("got me")
        const { locationX, locationY } = e.nativeEvent
        const { userInputs, AIInputs, result } = this.state
        if (result !== -1) {
            return
        }
        const inputs = userInputs.concat(AIInputs)

        const area = AREAS.find(e => 
            (locationX >= e.startX && locationX <= e.endX) &&
            (locationY >= e.startY && locationY <= e.endY))

            if (area && inputs.every(allInputs)) {
                this.setState({ userInputs: userInputs.concat(area.id) })
                setTimeout(() => {
                this.judgeWinner()
                this.AIAction()
                 }, 5)
            }
    }

    AIAction() {
        const { userInputs, AIInputs, result } = this.state
        if (result !== -1) {
            return 
        }
        while(true) {
            const inputs = userInputs.concat(AIInputs)

            const randomNumber = Math.round(Math.random() * 8.3)
            if (inputs.every(e => e !== randomNumber)) {
                this.setState({ AIInputs: AIInputs.concat(randomNumber) })
                this.judgeWinner()
                break
            }
        }
    }

    componentDidMount(){
        this.restart()
    }

    isWinner() {
        const { userInputs, AIInputs } = this.state
        const inputs = userInputs.concat(AIInputs)
        console.log(userInputs, "in inputs")
        return CONDITIONS.some(e => e.every(item => inputs.indexOf(item !== -1)))
    }

    judgeWinner() {
        const { userInputs, AIInputs, result } = this.state
        const inputs = userInputs.concat(AIInputs)
        //maybe change line 96 to less turns
        if (inputs.length >= 8) {
            let res = this.isWinner(userInputs)
            if (res && result !== GAME_RESULT_USER) {
                return this.setState({ result: GAME_RESULT_USER })
            }
            res = this.isWinner(AIInputs)
            if (res && result !== GAME_RESULT_AI) {
                return this.setState({ result: GAME_RESULT_AI })
            }
        }

        if (inputs.length === 9 &&
                result === GAME_RESULT_NO &&
                    result !== GAME_RESULT_TIE) {
                        this.setState({
                            result: GAME_RESULT_TIE
                        })
                    }
    }

    render(){
        const { userInputs, AIInputs, result } = this.state;
        return(
            <TouchableOpacity onPress={(e) => this.boardClickHandler(e)}>
            <View style={styles.container}> 
                <View style={styles.board} >
                    <View style={[styles.lines,{
                        transform: [
                           { translateX: 200 }
                        ] 
                    } ] }  
                    />
                    <View style={[styles.lines,{
                        transform: [
                           { translateX: 100 }
                        ] 
                    } ] } 
                    />
                     <View style={[styles.lines,{
                         height: 3,
                         width: 295,
                        transform: [
                           { translateY: 100 }
                        ] 
                    } ] } 
                    />
                    <View style={[styles.lines,{
                         height: 3,
                         width: 295,
                        transform: [
                           { translateY: 200 }
                        ] 
                    } ] } 
                    />
                    {
                        userInputs.map((e, i) => (
                            <Circle
                                key={i}
                                xTranslate={CENTER_POINTS[e].x}
                                yTranslate={CENTER_POINTS[e].y}
                                color='blue'
                            />
                        ))
                    }
                    {
                        AIInputs.map((e, i) => (
                            <Cross
                                key={i}
                                xTranslate={CENTER_POINTS[e].x}
                                yTranslate={CENTER_POINTS[e].y}
                            />
                        ))
                    }
                </View>
                <PromptArea result={result} onRestart={() => this.restart()} />
            </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: '80%',
        alignItems: 'center'
    },
    board: {
        borderWidth: 3,
        height: 300,
        width: 300
    },
    lines: {
        backgroundColor: '#000',
        height: 295,
        width: 3, 
        position: 'absolute'
    }
})