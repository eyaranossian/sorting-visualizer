import React from 'react'; 
import './SortingVisualizer.css'; 
import {bubbleSort} from './SortingAlgorithms.js'; 


const  BASE_COLOR = 'rgb(60, 166, 236)';
const  PRIMARY_COLOR = 'green';
const  SECONDARY_COLOR = 'red';
const  SORTED_COLOR = 'rgba(169, 92, 232, 0.8)';
const  NUMBER_OF_BARS = 100;
const  ANIMATION_SPEED_MS = 100;

class SortingVisualizer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {  
            array: [], 
            active: true,
            animationSpeed : 100
        }
    }

    componentDidMount(){
        this.resetArray(0); 
    }

    bubbleSort(){
        this.toggleBtn(); 

        const animations = bubbleSort(this.state.array);
        console.log(animations); 
        
            for(let j=0; j<animations.length;j++){
                setTimeout(() => { 
                    const arrayBars = document.getElementsByClassName('bar');
        
                    const[barIdxOne, barIdxTwo, swapped] = animations[j]; 

                    //Reset to base color previous bar
                    if(j !== 0){
                        const[prevBarIdxOne, prevBarIdxTwo] = animations[j-1]; 
                    
                        let prevBarStyleOne = arrayBars[prevBarIdxOne].style; 
                        let prevBarStyleTwo = arrayBars[prevBarIdxTwo].style; 
                            
                        prevBarStyleOne.backgroundColor = BASE_COLOR;    
                        prevBarStyleTwo.backgroundColor = BASE_COLOR;    
                    }   
                    //highlight consider bar 
                    let barStyleOne = arrayBars[barIdxOne].style; 
                    let barStyleTwo = arrayBars[barIdxTwo].style; 
                    barStyleOne.backgroundColor = PRIMARY_COLOR;    
                    barStyleTwo.backgroundColor = PRIMARY_COLOR;      
                    
                    // if swapped - change hightlight color and swap height
                    if(swapped){
        
                        barStyleOne.backgroundColor = SECONDARY_COLOR;    
                        barStyleTwo.backgroundColor = SECONDARY_COLOR;
                        
                        let temp = barStyleOne.height; 
                        barStyleOne.height = barStyleTwo.height;    
                        barStyleTwo.height = temp;      
                    }

                    //to clean color on the last 2 considered bars 
                    if( j === (animations.length-1)){
                        const[prevBarIdxOne, prevBarIdxTwo] = animations[j]; 
                    
                        let prevBarStyleOne = arrayBars[prevBarIdxOne].style; 
                        let prevBarStyleTwo = arrayBars[prevBarIdxTwo].style; 
                            
                        prevBarStyleOne.backgroundColor = BASE_COLOR;    
                        prevBarStyleTwo.backgroundColor = BASE_COLOR;    
                    }
                }, j * this.state.animationSpeed);
            }

        this.toggleBtn(); 
    }

    mergeSort(){
        //TODO 
    }

    quickSort(){
        //TODO 
    }

    toggleBtn(){
        //DOES NOT WORK IF CALLED FROM SORT FUNCTION BUT OK FROM onClick btn event.... 
        this.setState((currentState) => ({ 
                active : !currentState.active, 
        }));
    }

    handleChange(e){
        let animationSpeed = 101 - (e.currentTarget.valueAsNumber)
        this.setState({animationSpeed})
        this.resetArray(e.currentTarget.valueAsNumber); 
    }

    resetArray(nbrBar){
        if(nbrBar == 0){
            nbrBar = NUMBER_OF_BARS
        }
        const array = []; 
        for(let i=0; i<nbrBar; i++){
            array.push(randomIntFromInterval(5, 730))
        }
        this.setState({array}); 
    }

    render() { 

        const {array} = this.state; 
        return (  
            <>
            <div className="header-wrapper">
                <div className="title-wrapper"> 
                    <h2> <a href="/" className="title">Sorting Visualiser</a> </h2>
                </div>
                <div className="range-wrapper">
                    <input 
                        type="range"
                        min="0" 
                        max="100"
                        onChange={(e) => this.handleChange(e)}
                    /> 
                </div> 

                <div className="btn-wrapper"> 
                    <button className={`btn ${this.state.active === false ? 'notActive' : ''}`} onClick={() => this.resetArray()}> Generate new array </button>
                    <button className={`btn ${this.state.active === false ? 'notActive' : ''}`} onClick={() => this.bubbleSort()}> Bubble Sort </button>
                    <button className={`btn ${this.state.active === false ? 'notActive' : ''}`} onClick={() => this.mergeSort()}> Merge Sort </button>
                    <button className={`btn ${this.state.active === false ? 'notActive' : ''}`} onClick={() => this.quickSort()}> Quick Sort </button>
                </div>
            </div>

            <div className="bar-wrapper"> 
            {array.map((value, idx) => (
                    <div className="bar" key={idx}  style={{height: value + 'px'}}> </div>            
                ))}
            </div>
            <footer> </footer>
            </>
        );
    }
}

function isArrayAreEquals(array1, array2){
    
    console.log("Sort from JS");
    console.log(array1);

    console.log("Sort from Custom");
    console.log(array2);

    if(array1 === undefined || array2 === undefined)
        return false;

    if(array1.length !== array2.length)
        return false;
    for(let i = 0; i < array1.length; i++){
        if(array1[i] !== array2[i])
            return false;
    }
    return true;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min); 
}
 
export default SortingVisualizer;