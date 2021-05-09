import React from 'react'; 
import './SortingVisualizer.css'; 
import {bubbleSort, getMergeSortAnimations, getMergeSortAnimationsAlternate} from './SortingAlgorithms.js'; 


const  BASE_COLOR = 'rgb(60, 166, 236)';
const  PRIMARY_COLOR = 'green';
const  SECONDARY_COLOR = 'red';
const  NUMBER_OF_BARS = 65;

class SortingVisualizer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {  
            array: [], 
            active: true,
            animationSpeed : 10,
            barWidth : 6
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

                    const isColorChange = j % 4 !== 2; 
                    const barStyleOne = arrayBars[barIdxOne].style; 
                    const barStyleTwo = arrayBars[barIdxTwo].style; 
            
                    if(isColorChange){
                        const color = j % 4 === 1 ? PRIMARY_COLOR : BASE_COLOR; 
                        //highlight consider bar with right color
                        barStyleOne.backgroundColor = color;    
                        barStyleTwo.backgroundColor = color;      
                    } else{
                        // if swapped - change hightlight color and swap height
                        if(swapped){
                            barStyleOne.backgroundColor = SECONDARY_COLOR;    
                            barStyleTwo.backgroundColor = SECONDARY_COLOR;
                            
                            let temp = barStyleOne.height; 
                            barStyleOne.height = barStyleTwo.height;    
                            barStyleTwo.height = temp;     
                        }
                    }
                }, j * this.state.animationSpeed);
            }

        this.toggleBtn(); 
    }

    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array); 
    
        console.log(animations);
        //console.log(isArrayAreEquals(array.sort((a,b)=> a-b), animations)); 

        for(let j = 0; j < animations.length; j++){
            
                const arrayBars = document.getElementsByClassName('bar');
                const isColorChange = j % 3 !== 2; 

                if(isColorChange){
                    const[barIdxOne, barIdxTwo] = animations[j]; 
                    //highlight consider bar   
                    const barStyleOne = arrayBars[barIdxOne].style; 
                    const barStyleTwo = arrayBars[barIdxTwo].style; 

                    const color = j % 3 === 0 ? SECONDARY_COLOR : BASE_COLOR; 
                    setTimeout(() => { 
                        barStyleOne.backgroundColor = color; 
                        barStyleTwo.backgroundColor = color; 
                    }, j * this.state.animationSpeed);
                } 
                else {
                    setTimeout(() => { 
                        const[barIdxTarget, newHeight] = animations[j]; 
                        const barStyleTarget = arrayBars[barIdxTarget].style; 
                        barStyleTarget.height = newHeight+'px'; 
                    }, j * this.state.animationSpeed);
                }    
        }
    }

    quickSort(){
        alert("Not implemented yet...");
        //TODO 
    }

    toggleBtn(){
        //DOES NOT WORK IF CALLED FROM SORT FUNCTION BUT OK FROM onClick btn event.... 
        this.setState((currentState) => ({ 
                active : !currentState.active, 
        }));
    }

    handleChange(e){
        const valueFromInput = e.currentTarget.valueAsNumber;
        const animationSpeed = 131 - (valueFromInput)
        const barWidth = 300 / (valueFromInput);

        this.setState({animationSpeed})
        this.resetArray(valueFromInput); 
        this.setState({barWidth})
    }
    resetArray(nbrBar){
        if(nbrBar === 0){
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
                    <div className="text-wrapper"> 
                        <p>Change array size & </p>
                        &nbsp; <p>sorting speed</p>
                    </div>
                    
                    <input 
                        type="range"
                        min="2" 
                        max="130"
                        onChange={(e) => this.handleChange(e)}
                    /> 
                </div> 

                <div className="btn-wrapper"> 
                    {/* <button className={`btn ${this.state.active === false ? 'notActive' : ''}`} onClick={() => this.resetArray()}> Generate new array </button> */}
                    <button className={`btn ${this.state.active === false ? 'notActive' : ''}`} onClick={() => this.bubbleSort()}> Bubble Sort </button>
                    <button className={`btn ${this.state.active === false ? 'notActive' : ''}`} onClick={() => this.mergeSort()}> Merge Sort </button>
                    <button className={`btn ${this.state.active === false ? 'notActive' : ''}`} onClick={() => this.quickSort()}> Quick Sort </button>
                </div>
            </div>

            <div className="bar-wrapper"> 
            {array.map((value, idx) => (
                    <div className="bar" key={idx}  style={{height: value + 'px', width: this.state.barWidth +'px'}}> </div>            
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