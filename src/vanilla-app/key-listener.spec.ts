import {KeyListener} from './key-listener';

function keyPress(key) {
  let event: KeyboardEvent = <KeyboardEvent> document.createEvent('Event');
  (<any> event).keyCode = key;
  event.initEvent('keypress', true, true);
  document.dispatchEvent(event);
}

const keyListener: KeyListener = new KeyListener();

describe('test that all key listenres event are working', () => {

  it('should be able to submit key press', (done) => {
    const obj = {
      func :  () => {
        console.log('the spy has run');
    }};
    const spy = spyOn(obj, 'func').and.callThrough();
    keyListener.addKeyListener(55, obj.func, obj, null);
    keyPress(55);
    setTimeout(() => {
      expect(obj.func).toHaveBeenCalled();

      done();
    }, 0);

  });
});
