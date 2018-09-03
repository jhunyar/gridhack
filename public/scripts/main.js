// build floor elements
buildFloors()

// render the current floor
renderFloor()

// lets go ahead and reset the room to start fresh
resetFloor()

// lets also set up our visible tiles since we already know our active tile (we start with one manually set as active)
setVisible()

// display information about the first tile
describeTile()

// the movement handler itself
document.addEventListener('keydown', function(e) {
    const current = tileArray[activeTileId]
    const left = tileArray[activeTileId-1]
    const right = tileArray[activeTileId+1]
    const up = tileArray[activeTileId-14]
    const down = tileArray[activeTileId+14]
    
    let moveLeft = e.keyCode == '37'
    let moveUp = e.keyCode == '38'
    let moveRight = e.keyCode == '39'
    let moveDown = e.keyCode == '40'
    let look = e.keyCode == '76'
    let get = e.keyCode == '71'

    if (moveLeft || moveUp || moveRight || moveDown || look || get) {

        // prevent default action of ctrl and shift keys to avoid error
        if (e.ctrlKey) return false
        if (e.shiftKey) return false


        // conditional movement rules to determine which tile we need to set as active and which we need to clear
        if (moveLeft) {
            if (leftWall.includes(activeTileId-1)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                left.id = 'active'
            }
        } else if (moveRight) {
            if (rightWall.includes(activeTileId+1)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                right.id = 'active'
            }
        } else if (moveUp) {
            if (topWall.includes(activeTileId-14)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                up.id = 'active'
            }
        } else if (moveDown) {
            if (bottomWall.includes(activeTileId+14)) {
                alert.innerHTML = ' You can\'t go that way!'
                setVisible()
                return false
            } else {
                current.id = ''
                down.id = 'active'
            }
        }

        // we need to reset the room on every key action to clear any of the visible tiles from the last movement
        resetFloor()
        clearAlerts()

        // everything after this point happens regardless of which direction the user enters
        
        // first of all, set our new active tile to wherever we moved
        setActive()

        // now set the visible tiles based on that new active tile
        setVisible()

        describeRooms()

        describeTile()

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

        let room = dungeon.floors[currentFloor].tiles[activeTileId]
        
        if (look) {
            if (room.item !== null) {
                alert.innerHTML = `You see a ${room.item.name} here.`
            } else {
                alert.innerHTML = 'You see nothing of particular interest'
            }
        }
        if (room.item !== null) {
            roomInfoDesc.innerHTML += ` You found a ${room.item.name}. ${room.item.description}`
            console.log(room.item)
        }

        if (get) {
            getItem()
            roomInfoDesc.innerHTML = `"${room.desc}".`
        }
    }
})