import React, { Component } from 'react';

import FadeIn from '../transitions/fade-in';
import CharacterBox from './characterBox';
import ScoreDisplay from './scoredisplay';

const shuffleArray = arr => (
    arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]) 
);

const initialChars = [
    {
        name: 'Bangalore',
        img: 'img/250x180/bang.png',
        clicked: false
    },
    {
        name: 'Bloodhound',
        img: 'img/250x180/Blood.png',
        clicked: false
    },
    {
        name: 'Caustic',
        img: 'img/250x180/caustic.png',
        clicked: false
    },
    {
        name: 'Gibraltar',
        img: 'img/250x180/GIBRAL.png',
        clicked: false
    },
    {
        name: 'Lifeline',
        img: 'img/250x180/lifeline.png',
        clicked: false
    },
    {
        name: 'Mirage',
        img: 'img/250x180/mirage.png',
        clicked: false
    },
    {
        name: 'Octane',
        img: 'img/250x180/octane.png',
        clicked: false
    },
    {
        name: 'Wraith',
        img: 'img/250x180/wraith.png',
        clicked: false
    },
    {
        name: 'Pathfinder',
        img: 'img/250x180/pathfinder.png',
        clicked: false
    }   
]

export default class Board extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: {
                score: 0 
            },
            characters: shuffleArray( initialChars )
        };
    }

    onCharacterClick = ( index ) =>{
        if( !this.state.characters[index].clicked ){
            this.setState({
                characters: shuffleArray( this.state.characters.map( (character, current) =>  {
                    return ( current === index ) ? { ...character, clicked:true } : character
                })),
                user: {
                    ...this.state.user,
                    score: this.state.user.score + 1
                }
            });
            //and shuffle
        } else {
            this.setState({
                characters: shuffleArray(this.state.characters.map( character => { return { ...character, clicked : false } })),
                user: {
                    ...this.state.user,
                    score: 0
                }
            });
            //and shuffle
        }
        
    }

    render(){
        return (
            <div className="Board">
                <FadeIn 
                    in={true}
                    duration={450}
                    length={'30px'}
                    direction={'bottom'}
                    delay={'1s'}>
                    <h4>Try to click on every Apex Legend once. Once you click a Legend the grid will shuffle.<br/>Try not to click the same Legend twice or the game will start all over!</h4>
                </FadeIn>
                <FadeIn 
                    in={true}
                    duration={500}
                    direction={'bottom'}
                    delay={'1.5s'}>
                    <ScoreDisplay
                        score={this.state.user.score} />
                </FadeIn>
                <CharacterBox 
                    characters={this.state.characters} 
                    onCharacterClick={this.onCharacterClick} />
            </div>
        )
    }

}