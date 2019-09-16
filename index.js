const crypto = require('crypto-js');
SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, prevhash){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevhash = prevhash;
        this.hash = this.calculatehash();
        this.nonce = 0;
    }

    calculatehash(){
        return SHA256(SHA256(this.index + this.prevhash + this.timestamp + this.data + this.nonce))
    }
    mineBlock(difficulty) {
        console.log("mining block: " + this.index);
        console.log("\n");
        while (this.hash.toString().substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculatehash();
        }
    
        console.log("block mined: " + this.hash);
        console.log("\n");
        console.log("block "+this.index+" is gemined op: "+this.timestamp);
        console.log("block "+this.index+" heeft als data: "+this.data);
        console.log("block "+this.index+" heeft als hash: "+this.hash);
        console.log("block "+this.index+" heeft als prevhash: "+this.prevhash);
        console.log("\n");
        console.log("\n");
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, Date.now, "hello world", null);}


    
    addBlock(newBlock){
            newBlock.prevhash = this.chain[this.chain.length -1].hash;
            newBlock.hash = newBlock.calculatehash();
            newBlock.mineBlock(this.difficulty);
            this.chain.push(newBlock);
            
    }
    chechvalid() {
        
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i-1];

        if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
        
            if (this.chain[this.chain.length] !== this.chain[this.chain.length - 1]) {
                Console.log("Error nieuwe block is niet correct");
            }

        if (currentBlock.previousHash !== previousBlock.hash) {
            return false;
            }
    

        return true;
    }
}

let coin = new Blockchain();
coin.addBlock(new Block(coin.chain.length, Date(Date.now()), "hey neal", coin.chain[coin.chain.length-1].hash));
coin.addBlock(new Block(coin.chain.length, Date(Date.now()), "hey jonah", coin.chain[coin.chain.length-1].hash));
coin.addBlock(new Block(coin.chain.length, Date(Date.now()), "hey danique", coin.chain[coin.chain.length-1].hash));
coin.addBlock(new Block(coin.chain.length, Date(Date.now()), "hey nick", coin.chain[coin.chain.length-1].hash));