let sha256 = require('crypto-js/sha256');

let memeList = ['Donald Blimp Trump', 
    'Belle Bathwater Delphine', 
    'Boris Thought the coke was icing sugar Johnson',
    'Thierry Wanneer heb je voor het laatst gehuild Baudet'
]

class Block{

    constructor(index){
        this.index = index;
        this.timestamp = Date.now();
        this.data;
        this.hash;
        this.prevHash;
    }
    
    calculateHash(){
        this.hash = sha256(sha256(this.data));
    }
}

class Blockchain{
    constructor(){
        this.chain = [];
    }

    addBlock(block){
        if(block instanceof Block){
            this.chain.push(block);
            return;
        }
        console.log("Er is geprobeerd iets raars toe te voegen aan de chain");
    }
    createGenesisBlock(){
        let genesisBlock = new Block(this.chain.length);
        genesisBlock.data = memeList[genesisBlock.index];
        genesisBlock.calculateHash(genesisBlock.data);
        genesisBlock.prevHash = null;
        this.chain.push(genesisBlock);
    }
    checkValidity(){
        for(let i = 1; i < this.chain.length; i++){
            if(this.chain[i].prevHash !== this.chain[i - 1].hash){
                console.log("Deze chain is niet correct. Gemanipuleerd bij block: " + this.chain[i - 1].index);
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

//Voeg nieuwe Block toe.
let testBlock = new Block(blockChain.chain.length);
testBlock.data = memeList[testBlock.index];
testBlock.calculateHash(testBlock.data);
testBlock.prevHash = blockChain.chain[testBlock.index - 1].hash;
blockChain.addBlock(testBlock);


let grn = "test";
blockChain.addBlock(grn);
console.log("test is geweest");

//3de block.
let testBlock3 = new Block(blockChain.chain.length);
testBlock3.data = memeList[testBlock3.index];
testBlock3.calculateHash(testBlock3.data);
testBlock3.prevHash = blockChain.chain[testBlock3.index - 1].hash;
blockChain.addBlock(testBlock3);
console.log(blockChain.chain);
blockChain.checkValidity();

//Manipuleer data 2de block.
blockChain.chain[1].data = memeList[memeList.length - 1];
blockChain.chain[1].calculateHash(blockChain.chain[1].data);
console.log(blockChain.chain);
blockChain.checkValidity();
