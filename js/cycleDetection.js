// ========================================================= Cycle Detection  =========================================================

// ****************************************** IMPORTANT PART OF THIS PROJECT ********************************************************
// Excel Cells is connected in one way i.e. 
// It is a Directed Graph
// so we need to Detect the Cycle in Directed Graph
// we use DFS(DEPTH-FIRST-SEARCH) to detect the Cycle
function checkCycle(address, newFormula) {

    let formulaTokens = newFormula.split(" ");
    
    let { rid, cid } = getRIDCIDfromAddress(address);
    let cellObject = sheetDB[rid][cid];

    let myChildren = cellObject.children; // children of that address 
    // children is dependent on parent
    // In Directed Graph terms =>   Children -> Parent

    for (let i = 0; i < myChildren.length; i++) {
        let childAddress = myChildren[i];
        for (let i = 0; i < formulaTokens.length; i++) {
            let firstCharofToken = formulaTokens[i].charCodeAt(0);
            if (firstCharofToken >= 65 && firstCharofToken <= 90) {
                let parentAddress = formulaTokens[i]; // A1

                if (parentAddress == childAddress) {
                    alert("Cycle Detected!!");
                    return true;
                }
            }
        }
        
        // Recursive Call to my childrens to find cycle
        return checkCycle(childAddress, newFormula);
    }
    // if on above cycle not found , then return false
    return false;

}
