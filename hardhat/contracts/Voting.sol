// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Voting{
    struct Candidate {
        uint256 id;
        string name;
        uint256 numberofVotes;
    }
    Candidate[] public candidates;

    address public owner;

    mapping(address => bool) public voters;

    address[] public listofVoters;

    uint256 public votingStart;
    uint256 public votingEnd;

    bool public electionStarted;

    modifier onlyOwner(){
        require(msg.sender == owner,"You are not Authorized to start an election!");
        _;
    }

    modifier electionOngoing(){
        require(electionStarted,"No election Started!");
        _;
    }

    constructor(){
        owner=msg.sender;
    }

    function startElection(string[] memory _candidates,uint256 _votingDuration)  public onlyOwner {
        require(electionStarted == false,"Election is currently ongoing");
        delete candidates;
        resetAllVoterStatus();

        for(uint256 i=0; i < _candidates.length; i++){
            candidates.push(Candidate({id: i, name: _candidates[i], numberofVotes:0}));
        }
        electionStarted = true;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + ( _votingDuration * 1 minutes);
    }

    function addcandidate(string memory _name) public onlyOwner electionOngoing {
        require(checkElectionPeriod(),"Election Period has ended");
        candidates.push(Candidate({id: candidates.length, name: _name, numberofVotes:0}));
    }

    function voterStatus(address _voter) public view electionOngoing returns (bool){
       if(voters[_voter] == true){
        return true;
       }
       return false;
    }

    function voteTo(uint256 _id) public electionOngoing{
        require(checkElectionPeriod(), "Election period has ended");
        require(!voterStatus(msg.sender),"You already voted. You can vote only once.");
        candidates[_id].numberofVotes++;
        voters[msg.sender] = true;
        listofVoters.push(msg.sender);
    }

    function retrieveVotes() public view returns (Candidate[] memory){
        return candidates;
    }

    function electionTimer() public view electionOngoing returns (uint256){
        if(block.timestamp >= votingEnd){
            return 0;
        }
        return (votingEnd - block.timestamp);

    }

    function checkElectionPeriod() public returns (bool){
        if(electionTimer() > 0){
            return true;
        }
        electionStarted = false;
        return false;
    }

    function resetAllVoterStatus() public onlyOwner {
        for(uint256 i = 0; i < listofVoters.length; i++){
            voters[listofVoters[i]] = false;
        }
        delete listofVoters;
    }
}