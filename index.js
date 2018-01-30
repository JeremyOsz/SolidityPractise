const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')

const VotingContract = web3.eth.contract(abi);
const contractInstance = VotingContract.at('0x2c3425c818b47753f04fb556eedd98f24ea2b016');
const candidates = {
  "Rama": "candidate-1",
  "Nick": "candidate-2",
  "Jose": "candidate-3"
}

function voteForCandidate() {
  $('#errorText')[0].innerHTML = ""
  candidateName = $("#candidate").val();
  if(Object.keys((candidates)).indexOf(candidateName) == -1 ){
    throwNameError();
    return
  }
  contractInstance.voteForCandidate(candidateName, {
    from: web3.eth.accounts[0]
  }, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}

function throwNameError(){
  console.log('Invalid Vote')
  $('#errorText')[0].innerHTML = "Invalid Candidate entered"
}

function updateVotes(){
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
}

$(document).ready(function() {
  updateVotes()
});

$('#vote').on('click', function(){
  voteForCandidate()
  updateVotes()
})
$('#candidate').on('keyup', function(e){
  if(e.keyCode == 13){
    voteForCandidate()
    updateVotes()
  }
})
