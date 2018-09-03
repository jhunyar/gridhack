buildFloors()   // Build all dungeon floors
renderFloor()   // Render the current floor
resetFloorEls() // Reset the floor elements
setActive()     // Set the active tile
setVisible()    // Set visible tiles around active tile
describeTile()  // Display information about the current tile

// the movement handler itself
document.addEventListener('keydown', function(e) {
    const current = tileArray[player.currentTile]
    const west = tileArray[player.currentTile-1]
    const east = tileArray[player.currentTile+1]
    const north = tileArray[player.currentTile-14]
    const south = tileArray[player.currentTile+14]
    
    let moveWest = e.keyCode == '37'
    let moveNorth = e.keyCode == '38'
    let moveEast = e.keyCode == '39'
    let moveSouth = e.keyCode == '40'
    let moveDown = e.keyCode == '34'
    let moveUp = e.keyCode == '33'
    let look = e.keyCode == '76'
    let get = e.keyCode == '71'

    if (moveWest || moveNorth || moveEast || moveSouth || moveDown || look || get) {

        // prevent default action of ctrl and shift keys to avoid error
        if (e.ctrlKey) return false
        if (e.shiftKey) return false


        // conditional movement rules to determine which tile we need to set as active and which we need to clear
        if (moveWest) {
            if (westWall.includes(player.currentTile-1)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                west.id = 'active'
                player.currentTile = player.currentTile-1
            }
        } else if (moveEast) {
            if (eastWall.includes(player.currentTile+1)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                east.id = 'active'
                player.currentTile = player.currentTile+1
            }
        } else if (moveNorth) {
            if (northWall.includes(player.currentTile-14)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                north.id = 'active'
                player.currentTile = player.currentTile-14
            }
        } else if (moveSouth) {
            if (southWall.includes(player.currentTile+14)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                south.id = 'active'
                player.currentTile = player.currentTile+14
            }
        }

        if (moveDown) {
            if (dungeon.floors[player.currentFloor].tiles[player.currentTile].stairDown) {
                dungeon.visitedFloors.push(dungeon.floors[player.currentFloor])
                player.currentFloor += 1
                renderFloor()   // Render the current floor
                resetFloorEls()    // Reset the floor on every key action to clear any visible tiles from last movement
                clearAlerts()   // Reset alerts area after action
                setActive()     // Set active tile to wherever player moved
                setVisible()    // Set new visible area based on active tile
                describeTile()  // Describe the new active tile
            } else {
                console.log('There is no staircase here!')
            }
        }

        if (moveUp) {
            if (dungeon.floors[player.currentFloor].tiles[player.currentTile].stairUp) {
                player.currentFloor -= 1
            }
        }

        resetFloorEls()    // Reset the floor on every key action to clear any visible tiles from last movement
        clearAlerts()   // Reset alerts area after action
        setActive()     // Set active tile to wherever player moved
        setVisible()    // Set new visible area based on active tile
        describeTile()  // Describe the new active tile

        // The cartographer's aide

        //       -14 -13 -12 -11 -10  -9  -8  -7  -6  -5  -4  -3  -2  -1        
        //     |---------------------------------------------------------|
        //  -1 |   0   1   2   3   4   5   6   7   8   9  10  11  12  13 | 14
        //  13 |  14  15  16  17  18  19  20  21  22  23  24  25  26  27 | 28        
        //  27 |  28  29  30  31  32  33  34  35  36  37  38  39  40  41 | 42        
        //  41 |  42  43  44  45  46  47  48  49  50  51  52  53  54  55 | 56        
        //  53 |  56  57  58  59  60  61  62  63  64  65  66  67  68  69 | 70
        //  69 |  70  71  72  73  74  75  76  77  78  79  80  81  82  83 | 84
        //  83 |  84  85  86  87  88  89  90  91  92  93  94  95  96  97 | 98
        //  97 |  98  99 100 101 102 103 104 105 106 107 108 109 110 111 | 112
        // 111 | 112 113 114 115 116 117 118 119 120 121 122 123 124 125 | 126
        // 125 | 126 127 128 129 130 131 132 133 134 135 136 137 138 139 | 140
        // 139 | 140 141 142 143 144 145 146 147 148 149 150 151 152 153 | 154
        // 153 | 154 155 156 157 158 159 160 161 162 163 164 165 166 167 | 168
        // 167 | 168 169 170 171 172 173 174 175 176 177 178 179 180 181 | 182
        // 181 | 182 183 184 185 186 187 188 189 190 191 192 193 194 195 | 196
        //     |---------------------------------------------------------|
        //       196 197 198 199 200 201 202 203 204 205 206 207 208 209 

        let tile = dungeon.floors[player.currentFloor].tiles[player.currentTile]

        if (tile.stairDown) {
            tileInfoDesc.innerHTML += ' You see a staircase leading down.'
        }
        
        if (look) {
            if (tile.item !== null) {
                alert.innerHTML = `You see a ${tile.item.name} here.`
            } else {
                alert.innerHTML = 'You see nothing of particular interest'
            }
        }
        if (tile.item !== null) {
            tileInfoDesc.innerHTML += ` You found a ${tile.item.name}. ${tile.item.description}`
        }

        if (get) {
            getItem()
            tileInfoDesc.innerHTML = `"${tile.desc}".`
        }
    }
})