export let IS_TEST = true;
const SEED_INIT = 6;
let seed = SEED_INIT;

export function pureRandomRange(from: number = 0, to: number = 1) {
  return Math.floor(Math.random() * to) + from;
};

export function getRandomRange(from: number = 0, to: number = 1): number {

  return IS_TEST ? getRandomRangeMock(from, to) : pureRandomRange();
}

export function getRandomRangeMock(from: number = 0, to: number = 1): number {
  return Math.floor(seededRandom(from, to));
}

export function getRadnom(): number {
  return IS_TEST ? seededRandom() : Math.random();
}
export function setTestMode(): void {
  IS_TEST = true;
}
export function resetSeed(): void {
  seed = SEED_INIT;

}
export function setProdMode(): void {
  IS_TEST = false;
}

// the initial seed


// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
export function seededRandom(min?, max?) {
  max = max || 1;
  min = min || 0;

  seed = (seed * 9301 + 49297) % 233280;
  let rnd = seed / 233280;

  const random = min + rnd * (max - min);
  console.log(random);
  return random;
}
