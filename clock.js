const {EventEmitter} = require('events');
const clock = new EventEmitter();


setInterval(()=>{
    const time = (new Date()).toLocaleString();
    clock.emit('tick', time);
}, 5000);


clock.on('tick', time => console.log(`This is the time ${time}`));

module.exports = clock;