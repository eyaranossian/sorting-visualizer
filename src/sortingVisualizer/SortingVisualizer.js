import React from 'react'; 
import './SortingVisualizer.css'; 
import {bubbleSort} from './SortingAlgorithms.js'; 


class SortingVisualizer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {  
            array: [], 
        }
    }

    componentDidMount(){
        this.resetArray(); 
    }

    bubbleSort(){
        //const sortedArrayFromJs = this.state.array.slice().sort((a,b) => a-b);
        const animations = bubbleSort(this.state.array);
        
        
        for(let i=0; i<animations.length;i++){

            for(let j=0; j<animations.length;j++){

            const arrayBars = document.getElementsByClassName('bar');
            
            const[barIdxOne, barIdxTwo] = animations[j]; 

            let barStyleOne = arrayBars[barIdxOne].style; 
            let barStyleTwo = arrayBars[barIdxTwo].style; 

             setTimeout(() => { 
                
                barStyleOne.backgroundColor = 'red';    
                barStyleTwo.backgroundColor = 'red';

                }, 500);
            }
        }

        //Not correct anymore because bubbleSort returns an array of animations 
        //console.log(isArrayAreEquals(sortedArrayFromJs, sortedArray)); 
    }

    mergeSort(){

    }

    quickSort(){

    }

    resetArray(){
        const array = []; 
        for(let i=0; i<100; i++){
            array.push(randomIntFromInterval(5, 730))
        }
        this.setState({array}); 
    }

    render() { 

        const {array} = this.state; 
        return (  
            <>
            <div className="btn-wrapper"> 
                <button className="btn" onClick={() => this.resetArray()}> Generate new array </button>
                <button className="btn" onClick={() => this.bubbleSort()}> Bubble Sort </button>
                <button className="btn" onClick={() => this.mergeSort()}> Merge Sort </button>
                <button className="btn" onClick={() => this.quickSort()}> Quick Sort </button>
            </div>

            <div className="bar-wrapper"> 
            {array.map((value, idx) => (
                    <div className="bar" key={idx}  style={{height: value + 'px', backgroundColor: 'rgb(60, 166, 236)'}}> </div>            
                ))}
            </div>
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