/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: skibidi toilet
@author: me
@tags: []
@addedOn: 2024-00-00
*/

const camera = "p"
const toilet = "t"
setLegend(
  [ camera, bitmap`
................
................
................
................
.1111111111111..
.1111111111111..
..LLLLLLLLLLL3..
..LLLLLLLLLLL...
...LLLLLL.......
....LLLLL.......
...LLLLL........
..LLLLL.........
..LLLL..........
................
................
................` ],
  [ toilet, bitmap`
...666666L111LLL
..66FF3F6L1L111L
..6F3FFF611LLL1L
..6FFLLF611LLL11
..66LLFF6LLLLLL1
..6666FC6611LLL1
....L66CC671LLL1
....L16CC6611L11
....L166CC671L1L
....L176CC67111L
....L116666111LL
....LL117711LLL.
.....LL1111LL...
......LLLLLL....
................
................`]
)

setSolids([])

let level = 0
const levels = [
  map`
...
tpt
...`
]

setMap(levels[level])

setPushables({
  [ camera ]: []
})

onInput("d", () => {
  getFirst(camera).y += 1
})

afterInput(() => {
  
})