/*
@title: getting_started
@tags: ['beginner', 'tutorial']
@addedOn: 2022-07-26
@author: leo, edits: samliu, belle, kara

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
hi reviewer i added a second character that moves in the opposite, making each level annoyingly harder
*/

// define the sprites in our game
const player = "p";
const player2 = "l";
const box = "b";
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ player2, bitmap`
................
................
................
.....LLLLL......
...LL....L......
..LL.6.6.L......
..L......LL.....
..LLC...CCL.....
...L.C..C..L....
...LLCCC.LLL....
....LLLLLL......
.......L........
................
................
................
................`],
  [ box, bitmap`
................
................
................
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
................
................`],
  [ goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
l.p.
.b.g
....`,
  map`
pl.
.b.
..g`,
  map`
p...
l..b
...b
.bbg`,
  map`
p...
...b
.l.b
.bbg`,v
  map`
l..
.p.
...`,
  map`
plw.
.bwg
....
..bg`,
  map`
.pwwl.
..ww..
.bwwb.
bgwwgb
g.ww.g
..ww..`
];

// set the map displayed to the current level
const currentLevel = levels[level];
const melody = tune`
69.60556844547564: C5/69.60556844547564 + D5/69.60556844547564,
69.60556844547564: D5~69.60556844547564,
2088.167053364269`
setMap(currentLevel);

setSolids([ player, box, wall, player2 ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [player2]: [box],
  [box]: [box]
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  getFirst(player2).y -= 1;
  playTune(melody)
});

onInput("d", () => {
  getFirst(player).x += 1; // positive x is right
  getFirst(player2).x -= 1;
  playTune(melody)
});

onInput("w", () => {
  getFirst(player).y -= 1;
  getFirst(player2).y += 1;
  playTune(melody)
});

onInput("a", () => {
  getFirst(player).x -= 1;
  getFirst(player2).x += 1;
  playTune(melody)
});

// input to reset leveljs
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`9` });
    }
  }
});
