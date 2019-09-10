let sha256 = require('crypto-js/sha256');

let memeList = ['Dit is een test', 
    'Dit is een andere test', 
    'Ik ben Thomas Bronsveld',
    'Wij zijn team logisch'
]

class Block{

    constructor(index){
        this.index = sha256(index);
        this.timestamp = sha256(new Date().toISOString().replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '')); 
        this.data = [];
        this.hash;
        this.prevHash;
    }
    
    calculateHash(){
        this.data = sha256(this.data);
        this.hash = sha256(this.data, this.index, this.timestamp, this.prevHash);
    }
}

class Blockchain {

    constructor(){
        this.chain = [];
    }

    addBlock(block){
        if(block instanceof Block){
            this.chain.push(block);
            this.checkValidity();
            return;
        }
        console.log("Er is geprobeerd iets raars toe te voegen aan de chain");
        return;
    }
    createGenesisBlock(){
        let genesisBlock = new Block(this.chain.length);
        genesisBlock.data.push(memeList[genesisBlock.index]);
        genesisBlock.prevHash = null;
        genesisBlock.calculateHash(genesisBlock.data);
        this.chain.push(genesisBlock);
    }
    checkValidity(){
        for(let i = 1; i < this.chain.length; i++){
            if(this.chain[i].prevHash !== this.chain[i - 1].hash){
                console.log("Deze chain is niet correct. Gemanipuleerd bij block: " + (i -1));
                return;
            }
        }
        console.log("Deze chain is correct");
        return;
    }
}

//Zet de chain op.
let blockChain = new Blockchain();
blockChain.createGenesisBlock();

setInterval(function(){
    blockChain.checkValidity();
},3000);

//Voeg nieuwe Block toe.
let testBlock = new Block(blockChain.chain.length);
testBlock.data.push(memeList[testBlock.index]);
testBlock.prevHash = blockChain.chain[blockChain.chain.length - 1].hash;
testBlock.calculateHash(testBlock.data);
blockChain.addBlock(testBlock);

//Manipuleer data 2de block.=3-3
blockChain.chain[0].data = sha256("HAHAHAHAAHHA");
blockChain.chain[0].calculateHash(blockChain.chain[1].data);

let grn = "test";
blockChain.addBlock(grn);
console.log("test is geweest");

//3de block.
let testBlock3 = new Block(blockChain.chain.length);
testBlock3.data.push(memeList[testBlock3.index]);
testBlock3.prevHash = blockChain.chain[blockChain.chain.length - 1].hash;
testBlock3.calculateHash(testBlock3.data);
blockChain.addBlock(testBlock3);


//Manipuleer data 2de block.=3-3
blockChain.chain[1].data = sha256(memeList[memeList.length - 1]);
blockChain.chain[1].calculateHash(blockChain.chain[1].data);

console.log(blockChain.chain);