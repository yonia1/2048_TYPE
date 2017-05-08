import { PubSub } from './pub-sub';

describe('pub sub module', () => {

  let pubSub: PubSub = new PubSub();

  it('should be able to add a listener', () => {
    const guid = pubSub.addListener('topic', () => {
      console.log('test')
    }, null, null);
    expect(pubSub.contains('topic', guid)).toBe(true);
  });

  it('should be able to remove a listener', () => {
    const guid = pubSub.addListener('topic', () => {
      console.log( 'test' );
    }, null, null);
    pubSub.removeListener(guid);
    expect(pubSub.contains('topic', guid)).toBe(false);
  });


 /* it('should be able to emit', (done) => {

    var func= () => {
      console.log('The emit function is working');
    }
    const obj: any = {
      func: func,
      context: null,
      args: null
    };
    const guid = pubSub.addListener('topic',obj.func,obj,null);
    const spy = spyOn(obj, 'func');
    pubSub.emit('topic');
    setTimeout(function() {
      expect(spy).toHaveBeenCalled();
      done()
    },0)

  });
*/

});
