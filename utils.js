/**
 * Created by Vadym Yatsyuk on 27/02/16
 */

export function getRandomEmptyPointOnMap(map) {
  const h = map.length;
  const w = map[0].length;
  let x;
  let y;

  do {
    x = randomIntWithRange(0, w - 1);
    y = randomIntWithRange(0, h - 1);
  } while (map[y][x] !== 0);

  return {x, y};
}

export function randomIntWithRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}