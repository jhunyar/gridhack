// Clear the map of aything other than active and inactive grids
const resetMap = () => {
    gridArray.forEach((grid) => {
        if ( grid.id != 'active' ) {
            grid.className = 'inactive'
        }
    })
}

// Reset the value of the activeGridId variable
const setActive = () => {
    activeGridId = gridArray.findIndex(x => x.id == 'active')
}

// Set all grids adjacent to activeGridId to be visible 
const setVisible = (grid) => {
    visibleArray.forEach(setVisible)
    if (rightCol.includes(activeGridId+grid) && leftCol.includes(activeGridId) 
    || (leftCol.includes(activeGridId+grid) && rightCol.includes(activeGridId))
    || topwall.includes(activeGridId + grid) 
    || bottomwall.includes(activeGridId + grid)) {
        return false
    } else {
        grids[activeGridId+grid].className = 'visible'
    }
}

// Clear the alerts
const clearAlerts = () => {
    alert.innerHTML = ''
}