const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// asynchron with callbacks

fs.mkdir('zippedFiles', (err) => {
    if (err) console.log(err.message);

    console.log('zippedFiles directory is successfully created');
    const arg = process.argv.slice(2)[0];
    const pathToContainer = path.join(__dirname, arg);

    fs.readdir(pathToContainer, (err, files) => {
        if (err) console.log(err.message);
        files.forEach(file => {
            let extension = path.extname(file);
            let fileName = path.basename(file, extension);
            // console.log(fileName);

            const input = fs.createReadStream(`${pathToContainer}/${file}`);
            const output = fs.createWriteStream(`${__dirname}/zippedFiles/${fileName}.gzip`);
            
            input.on('error', err => {
                console.log(err.message);
            })

            output.on('error', err => {
                console.log(err.message);
            })
            
            input.pipe(zlib.createGzip()).pipe(output);
        })
    })
}) 




// asynchron with promises

/* fs.promises.mkdir('zippedFiles')
.then(() => {
    console.log('zippedFiles directory is successfully created');
    const arg = process.argv.slice(2)[0];
    const pathToContainer = path.join(__dirname, arg);

    fs.promises.readdir(pathToContainer)
    .then( files => {
        files.forEach(file  => {
            let extension =  path.extname(file);
            let fileName = path.basename(file, extension); 
        
            const input = fs.createReadStream(`${pathToContainer}/${file}`);
            const output = fs.createWriteStream(`${__dirname}/zippedFiles/${fileName}.gzip`);
            

            input.on('error', err => {
                console.log(err.message);
            })            

            output.on('error', err => {
                console.log(err.message);
            })
        
            input.pipe(zlib.createGzip()).pipe(output);
        })
    }).catch(err => {
        console.log(err.message);
    })
})
.catch(err => {
    console.log(err.message);
})  */
 



// synchronous version

/* fs.mkdirSync('zippedFiles');

const arg = process.argv.slice(2)[0];

const pathToContainer =  path.join(__dirname, arg);

const files = fs.readdirSync(pathToContainer);

files.forEach(file  => {
    let extension =  path.extname(file);
    let fileName = path.basename(file, extension); 

    const input = fs.createReadStream(`${pathToContainer}/${file}`);
    const output = fs.createWriteStream(`${__dirname}/zippedFiles/${fileName}.gzip`);

    output.on('error', err => {
        console.log(err.message);
    })

    input.pipe(zlib.createGzip()).pipe(output);
}) */






























