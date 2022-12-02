import fs from 'fs'

/// crearemos un nuevo streams

const readStream = fs.createReadStream('../ultils/logs.txt');
const writeStream = fs.createWriteStream('../ultils/copy.txt')

/// el stream pipé canaliza  la informacion de el read stream y la transforma eb un nuevo archivo 
readStream.pipe(writeStream).on('error', console.error)


///streams por medio de keyboard 
const writeStreams = fs.createWriteStream('../ultils/introKeyboard.txt')
process.stdin.pipe(writeStreams)