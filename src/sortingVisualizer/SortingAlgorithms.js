/* export function bubbleSort(array){

    console.log("In bubble sort from sortingAl.js")
    let auxArray = array.slice(); 
    let size = auxArray.length; 
    for(let i=0; i < size-1; i++){
        let swapped = false; 
        for(let j=0; j < (size-1); j++){
            if(auxArray[j] > auxArray[j+1]){
                let temp = auxArray[j];
                auxArray[j] = auxArray[j+1];
                auxArray[j+1] = temp; 
                swapped = true; 
            }
        }
        if (swapped !== true)
            break; 
    }
    return auxArray; 
} */

export function bubbleSort(array){
/* Instead of returning array of sorted value, will return an array of animations*/ 

    console.log("In bubble sort/animations from sortingAl.js")
    
    let animations = []; 

    let auxArray = array.slice(); 
    let size = auxArray.length; 
    
    for(let i=0; i < size-1; i++){
        let globalSwapped = false; 
        for(let j=0; j < (size-1); j++){

            let swapped = false; 

            if(auxArray[j] > auxArray[j+1]){
                let temp = auxArray[j];
                auxArray[j] = auxArray[j+1];
                auxArray[j+1] = temp; 
                swapped = true; 
                globalSwapped = true; 
            }
            animations.push([j,j+1, swapped]); 
        }
        if (globalSwapped !== true)
            break; 
    }
    console.log(array);
    console.log(auxArray);

    return animations; 
}