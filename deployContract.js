//Require solc and Web3
const solc = require('solc');
const fs = require('fs');
const Web3 = require('web3');

//Define default candidates
const defaultCandidates = [
  "Rama",
  "Nick",
  "Jose"
]

//Establish Web3 server
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//Read contract
const code = fs.readFileSync('Voting.sol').toString();
//Compile code
const compiledCode = solc.compile(code);

//Get abi and write to file
abiDefinition = compiledCode.contracts[':Voting'].interface;
fs.writeFileSync('abi.json',abiDefinition,'utf8')
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface.toString());

//deploy
const VotingContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Voting'].byteCode
console.log('Balance = ' + web3.eth.getBalance(web3.eth.accounts[0]))
deployedContract = VotingContract.new(defaultCandidates,{data: byteCode, from: web3.eth.accounts[0], gas: 900000})
const address = deployedContract.address;
contractInstance = VotingContract.at(deployedContract.address);
