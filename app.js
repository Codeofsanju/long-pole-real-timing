const express  = require('express');
const app = express();
// const clock = ('./clock');
const {EventEmitter} = require('events');
const clock = new EventEmitter();

app.get('/', (req, res)=>{
    res.send(`
        <html>
            <head>
                <script type="text/javascript">
                    console.log('Hello World!')
                    function longPollForTime () {
                        fetch('/the-time', { headers: { 'Cache-Control': 'no-cache' } })
                        .then(response => response.text())
                        .then(time => {
                            console.log('The time is:', time)
                            longPollForTime()
                        })
                    }
                    longPollForTime()
                </script>
            </head>
        </html>
    `);
});




setInterval(()=>{
    const time = (new Date()).toLocaleString();
    clock.emit('tick', time);
}, 5000);
clock.on('tick', time => console.log(`This is the time ${time}`));



app.get('/the-time', (req, res) =>{
    clock.once('tick', (time) => res.send(time));
});


const PORT = 3333;
app.listen(3333, () => {
    console.log(`Listening on port ${PORT}`);
});