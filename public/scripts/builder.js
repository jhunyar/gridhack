import { mobs } from './mobs.js'

let rooms = []

const describeRooms =()=> {
  let tileCount = 784 // 196
  for (let i = 0; i < tileCount; i++) {
      rooms.push([ 'Title', `Description of room ${i}`, 'Earth'])
  }
}

describeRooms()

// Item variables
let items = []

// items[#] = [ 'name', 'description', 'type' rarity/100, affect{} ]
items[0] = [ 'Breath recycler', 'Provides breathable air for a human or any similar creature who wears the device.', 'armor', 75, { poisonResist: true, swimming: true } ]
items[1] = [ 'Floor map', 'Reveals all tiles on the current floor', 'map', 50, { revealMap: true } ]
items[2] = [ 'Healing potion', 'Heals user 5 HP', 'potion', 40, { hp: 5 } ]
items[3] = [ 'Tincture', 'Cures poison', 'poition', 70, { poisoned: false } ],
items[4] = [ 'Wooden practice sword', 'Hits for 3 HP', 'weapon', 40, { atk: 3 } ]
items[5] = [ 'Spectral chalice', 'Heals user to full HP and removes all afflictions', 'potion', 75, { hp: 100 } ]
items[6] = [ 'Leather armor', 'Provides 3 defense points', 'armor', 40, { def: 3 }]

// Object variables
const dungeon = {
  depth: 49,
  floors: []
}

const player = {
  name: '',
  currentFloor: 0,
  currentTile: 0,
  inventory: {
      capacity: 14,
      items: []
  },
  stats: {
      level: 1,
      exp: 0,
      hp: 10,
      atk: 1,
      def: 1,
      abolished: 0
  },
  status: {
      poisoned: false, // TODO: take poison damage (rabid rats?)
      poisonResist: false, // TODO: negate poison damage (rabid rats?)
      swimming: false, // TODO: walk through water tiles
      revealMap: false,
      phasing: false, // TODO: walk through room walls
  },
  person: {
      armor: null,
      helmet: null,
      gloves: null,
      ringL: null,
      ringR: null,
      amulet: null,
      aura: null,
      curse: null
  }
}

// Constructor functions
function Floor(number, tiles) {
  this.number = number;
  this.tiles = tiles
}

function Tile(id, name, desc, floor, item, mob, mapped) {
  this.id = id;
  this.name = name;
  this.desc = desc;
  this.floor = floor;
  this.item = item;
  this.mob = mob;
  this.mapped = mapped
}

// const buildDungeon =()=> {
//   buildFloors()
//   buildTiles()
// }

const buildFloors =()=> {
  for (let i = 0; i < dungeon.depth; i++) {
      let floor = new Floor(i, buildTiles())
  
      dungeon.floors.push(floor)

      // Create a down staircase on current floor in a random tile
      if (i !== dungeon.depth) {
          Object.defineProperty(dungeon.floors[i].tiles[Math.floor(Math.random() * 196)], 'stairDown', {
              value: true
          })
      }

      // Create an up staircase on each subsequent floor based on the prior floor's stairDown location
      if (i !== 0) {
          const staircase = dungeon.floors[i-1].tiles.filter((tile) => tile.stairDown)[0].id
          Object.defineProperty(dungeon.floors[i].tiles[staircase], 'stairUp', {
              value: true
          })
      }
  }
}

const buildTiles =()=> {
  let tileCount = 784 // 196
  let tiles = []
  for (let i = 0; i < tileCount; i++) {

      let item = placeItems()
      let mob = placeMobs()
      if (mob !== null) {
          mob.currentTile = i
      }

      // Construct the tile and push it to the temporary tiles array
      let tile = new Tile(i, rooms[i][0], rooms[i][1], rooms[i][2], item, mob, false)
      tiles.push(tile)
  }
  return tiles
}

const placeItems =()=> {
  let currentItem = items[Math.floor(Math.random() * Math.floor(items.length))]

  let item = {
      name: currentItem[0],
      description: currentItem[1],
      type: currentItem[2],
      rarity: currentItem[3],
      affects: currentItem[4],
      chance: Math.floor(Math.random() * Math.floor(currentItem[3]))
  }

  if (item.chance !== 1) {
      item = null
  }

  return item
}

const placeMobs =()=> {
  let currentMob = mobs[Math.floor(Math.random() * Math.floor(mobs.length))]

  let mob = {
      id: currentMob[0],
      name: currentMob[1],
      description: currentMob[2],
      atk: currentMob[3],
      def: currentMob[4],
      rarity: currentMob[5],
      chance: Math.floor(Math.random() * Math.floor(currentMob[5])),
      aggro: currentMob[6],
      symbol: currentMob[7],
      hp: currentMob[8]
  }

  if (mob.chance !== 1) {
      mob = null
  }

  return mob
}

export { items, rooms, player, dungeon, describeRooms, buildFloors, buildTiles }