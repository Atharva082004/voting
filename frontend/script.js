const connectWalletMsg=document.querySelector('#connectWalletMessage');
const connectWalletBtn=document.querySelector('#connectWallet');
const votingStation=document.querySelector('#votingStation');
const timerTime=document.querySelector('#time');
const timerMessage=document.querySelector('#timerMessage');
const mainBoard=document.querySelector('#mainBoard');
const voteForm=document.querySelector('#voteForm');
const vote=document.querySelector('#vote');
const voteBtn=document.querySelector('#sendVote');
const showResultContainer=document.querySelector('#showResultContainer');
const showResult=document.querySelector('#showResult');
const result=document.querySelector('#result');
const admin=document.querySelector('#admin');
const candidates=document.querySelector('#candidates');
const electionDuration=document.querySelector('#electionDuration');
const startAnElection=document.querySelector('#startAnElection');
const candidate=document.querySelector('#candidate')
const addTheCandidate=document.querySelector('#addTheCandidate');

const contractAddress = `0xC04F989ecAc841e8d8921f9BBf339DB57c3aBBda`;
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addcandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "numberofVotes",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "checkElectionPeriod",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionStarted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionTimer",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listofVoters",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "resetAllVoterStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "retrieveVotes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "numberofVotes",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidates",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_votingDuration",
          "type": "uint256"
        }
      ],
      "name": "startElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "voteTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "voterStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

let contract;
let signer;

const provider = new ethers.providers.Web3Provider(window.ethereum,80001);
provider.send("eth_requestAccounts",[]).then(()=>{
    provider.listAccounts().then((accounts)=>{
        signer = provider.getSigner(accounts[0])
        contract = new ethers.Contract(contractAddress,contractABI,signer)
    });
});

const getAllCandidates = async function(){
    if(document.getElementById("candidateBoard")){
        document.getElementById("candidateBoard").remove();
    }
    let board = document.createElement("table");
    board.id = "candidateBoard";
    mainBoard.appendChild(board);

    let tableHeader = document.createElement("tr");
    tableHeader.innerHTML = `<th>ID</th>
                            <th>Candidate</th>`;
    
    board.appendChild(tableHeader);

    let candidates = await contract.retrieveVotes();
    for(let i=0; i<candidates.length;i++){
        let candidate = document.createElement("tr");
        candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td>
                            <td>${candidates[i][1]}</td>`;

        board.appendChild(candidate);
    }
}

const getResult = async function(){
    result.style.display = "flex";

    if(document.getElementById('resultBoard')){
        document.getElementById('resultBoard').remove();
    }

    let resultBoard = document.createElement("table");
    resultBoard.id ="resultBoard";
    result.appendChild(resultBoard);

    let tableHeader = document.createElement("tr");
    tableHeader.innerHTML=`<th>ID</th>
                            <th>Candidate</th>
                            <th>No. of Votes</th>`;

    resultBoard.appendChild(tableHeader);

    let candidates = await contract.retrieveVotes();
    for(let i=0; i<candidates.length;i++){
        let candidate = document.createElement("tr");
        candidate.innerHTML = `<td>${parseInt(candidates[i][0])}</td>
                            <td>${candidates[i][1]}</td>
                            <td>${parseInt(candidates[i][2])}</td>`;

        resultBoard.appendChild(candidate);
    }
}

const refreshPage = function(){
    setInterval(async()=>{
        let time = await contract.electionTimer();
        if(time>0){
            timerMessage.innerHTML = `<span id="time">${time}</span> second/s left`;
            voteForm.style.display = 'flex';
            showResultContainer.style.display = 'none';
        }else{
            timerMessage.textContent="Either there is no ongoing election or it's ended!!";
            voteForm.style.display = 'flex';
            showResultContainer.style.display = 'flex';
        }
    },1000);

    setInterval(async()=>{
        getAllCandidates();
    },10000);
}

const sendVote = async function(){
    await contract.voteTo(vote.value);
    vote.value="";
}

const startElection = async function(){
    if(!candidates.value){
        alert('List of Candidates is empty');
    }
    if(!electionDuration.value){
        alert('Please set the election duration');
    }

    const _candidates = candidates.value.split(",");
    const _votingDuration = electionDuration.value;

    await contract.startElection(_candidates,_votingDuration);
    refreshPage();

    candidates.value = "";
    electionDuration.value = "";

    voteForm.style.display = "flex";
    showResultContainer.style.display = "flex";
}

const addCandidate = async function(){
    if(!candidate.value){
        alert('Please provide the Candidate name first!');
    }

    await contract.addCandidate(candidate.value);
    refreshPage();
    candidate.value = "";
}

const getAccount = async function(){
    const ethAccounts = await provider.send("eth_requestAccounts",[]).then(()=>{
        provider.listAccounts().then((accounts)=>{
            signer = provider.getSigner(accounts[0]);
            contract = new ethers.Contract(contractAddress,contractABI,signer);
        });
    });

    connectWalletBtn.textContent = signer._address.slice(0,4)+"..."+signer._address.slice(38,43);
    connectWalletMsg.textContent = "Connected:) Enjoy Voting!!";
    connectWalletBtn.disabled = true;

    let owner = await contract.owner();
    if(owner == signer._address){
        votingStation.style.display = "block";
        admin.style.display = "flex";
        let time = await contract.electionTimer();
        if(time == 0){
            contract.checkElectionPeriod();
        }
    }

    votingStation.style.display = "block";
    refreshPage();
    getAllCandidates();
}

connectWalletBtn.addEventListener('click',getAccount);
showResult.addEventListener('click',getResult);
voteBtn.addEventListener('click',sendVote);
addTheCandidate.addEventListener('click',addCandidate);
startAnElection.addEventListener('click',startElection);
