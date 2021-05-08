export function bubbleSort(array){
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
                animations.push([j,j+1, swapped]); 
            }
        }
        return animations; 
}

export function getMergeSortAnimations(array, start, end){

    if(array.length <= 1)
        return array;
    const auxArray = array.slice(); 
    let animations = [];

    mergetSort(array, start, end, auxArray, animations); 

    return animations; 
}

function mergetSort(array, start, end, auxArray, animations){

    if(start < end){
        let mid =  Math.floor((start+end) / 2); 

        mergetSort(array, start, mid, auxArray, animations); 
        mergetSort(array, mid+1, end, auxArray, animations); 
    
        merge(array, start, mid, end, auxArray, animations);    
    }
}

function merge(array, start, mid, end, auxArray, animations){
    
    let i = start; 
    let j = mid; 
    let k = start; 

    while (i < (mid -1) && j < end){

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

    while (i <= (mid -1)){

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