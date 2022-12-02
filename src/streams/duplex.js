import {Duplex, PassThrough} from 'stream';
import  {createReadStream, createWriteStream} from 'fs';
const readStream = createReadStream('../ultils/lion.jpg');
const writeStream = createWriteStream('../ultils/lionTWo.jpg');

/* Tal como explicamos anteriormente, el flujo dúplex es básicamente una mezcla de los flujos de lectura y escritura.
Un ejemplo de un flujo dúplex es un Socket , que proporciona dos canales para enviar y recibir datos.
*/
class Throttle extends Duplex {

  constructor(ms) {
    super();
    this.delay = ms;
  }

  _read(){}

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  _final(){
    this.push(null)
  }
}

const report = new PassThrough();
const throttle = new Throttle(100);

let total = 0;
report.on('data', (chunk) => {
  total += chunk.length;
  console.log('bytes: ', total);
})

readStream.pipe(throttle).pipe(report).pipe(writeStream);