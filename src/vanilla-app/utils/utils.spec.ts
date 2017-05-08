import * as Utils from './utils';
describe('test utils functions', () => {
  it('should always return 2 different number randomly while in prod mode', () => {
    Utils.setProdMode();
    const first = Utils.getRadnom();
    const second = Utils.getRadnom();
    expect(first).not.toEqual(second);
  });
  it('should always return 2 same number randomly while in test ' +
    'mode for the first time for the same seed', () => {
    Utils.setTestMode();
    const first = Utils.getRadnom();
    Utils.resetSeed();
    const second = Utils.getRadnom();
    expect(first).not.toEqual(second);
  });
});
