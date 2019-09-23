pragma solidity ^^0.5.11;

contract Hello {
    
    string public message;

    function Hello(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage){
        message = newMessage;
    }
}

contract MyContractA {

    uint firstNumber;
    uint secondNumber;

    constructor (uint _firstNumber, uint _secondNumber) public {
        firstNumber = _firstNumber;
        secondNumber = _secondNumber;
    }

    function sumNumbers() external view returns(uint) {
        return firstNumber + secondNumber;
    }
}

contract OtherContract {

    uint firstNumber;
    uint secondNumber;

    constructor (uint _firstNumber, uint _secondNumber) public {
        firstNumber = _firstNumber;
        secondNumber = _secondNumber;
    }

    function multiplyNumbers() external view returns(uint) {
        return firstNumber * secondNumber;
    }
}