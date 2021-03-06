export function getBubbleSortAnimations(array){
    /* Instead of returning array of sorted value, will return an array of animations*/         
        let animations = []; 
    
        let auxArray = array.slice(); 
        let size = auxArray.length; 
        let sorted = false; 
        while(!sorted){
            sorted = true;
            for(let j=0; j < (size-1); j++){
                let swapped = false;     
                if(auxArray[j] > auxArray[j+1]){
                    let temp = auxArray[j];
                    auxArray[j] = auxArray[j+1];
                    auxArray[j+1] = temp; 
                    swapped = true; 
                    sorted = false; 
                }
                //color change 
                animations.push([j,j+1]); 
                //put back to normal 
                animations.push([j,j+1]); 
                //for the swap 
                animations.push([j,j+1, swapped]); 
                //put back to normal 
                animations.push([j,j+1]); 
            }
        }
        return animations; 
}

export function getMergeSortAnimations(array){

    if(array.length <= 1)
        return array;
    const auxArray = array.slice(); 
    const animations = [];

    mergetSort(array, 0, array.length-1, auxArray, animations); 

    return animations; 
}

function mergetSort(array, start, end, auxArray, animations){

    if(start < end){
        
        const mid =  Math.floor((start+end) / 2);
        
        mergetSort(auxArray, start, mid, array, animations);
        mergetSort(auxArray, mid+1, end, array, animations); 
        merge(array, start, mid, end, auxArray, animations);    
    }
}

function merge(array, start, mid, end, auxArray, animations){
    
    let i = start; 
    let j = mid+1; 
    let k = start; 

    while (i <= mid && j <= end){

        //2 idx that we consider in the main array // to change their color
        animations.push([i, j]); 
        //2 idx that we consider in the main array // to change back their color 
        animations.push([i, j]); 
    
        if(auxArray[i] <= auxArray[j]){
            //push the new value for the targeted id 
            animations.push([k, auxArray[i]]); 
            array[k++] = auxArray[i++]; 
        } 
        else {
            //push the new value for the targeted id 
            animations.push([k, auxArray[j]]); 
            array[k++] = auxArray[j++];   
        } 
    }
    while (i <= mid){

        animations.push([i, i]); 
        animations.push([i, i]); 
        animations.push([k, auxArray[i]]); 

        array[k++] = auxArray[i++];  
    }
    while (j <= end){

        animations.push([j, j]); 
        animations.push([j, j]); 
        animations.push([k, auxArray[j]]); 

        array[k++] = auxArray[j++];  
    }
} 

export function getQuickSortAnimations(array){
    
    if(array.length <= 1)
        return array;
    const animations = [];

        quickSort(array, 0, array.length-1, animations); 

    return animations; 
}

function quickSort(array, start, end, animations){

    if(start < end){
        let pivot = partition(array, start, end, animations); 

        quickSort(array, start, pivot-1, animations); 
        quickSort(array, pivot+1, end, animations); 
    }
    return  array; 
}

function partition(array, start, end, animations){

    let pivot = array[end]; 
    let i = (start -1); 

    let isSwapped; 
    for(let j=start; j < end; j++){
        
        isSwapped = false;
        if(array[j] <= pivot){
            i++; 

            let temp = array[i]; 
            array[i] = array[j]; 
            array[j] = temp;  
            isSwapped = true; 
        }
        animations.push([end, j, isSwapped, 1]);
        animations.push([end, j, isSwapped, 2]);
        animations.push([i === -1 ? 0 : i, j, isSwapped, 3]); //check on -1 for use case :  first iteration with no swap, i still = -1 
    }
    let temp = array[i+1]; 
    array[i+1] = array[end]; 
    array[end] = temp; 

    animations.push([i+1, end, 4]); 

    return (i+1); 
}