// Elevator shift practice

// closest Elevator (1,3,5) => right

function closestElevator (left, right, call) {

    const leftDistance = Math.abs(call - left);
    const rightDistance = Math.abs(right - call);
    
    if (leftDistance > rightDistance)
        return "Right" 
    else
        return "Left"
}