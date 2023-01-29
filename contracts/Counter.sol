// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Counter {
    event NewCounter(address indexed, uint256);
    event CounterIncreased(address indexed, uint256);

    mapping(address => uint256) _counters;
    address[] private _addresses;
    uint256 private _totalCounters;

    function increment() external {
        _counters[msg.sender] = _counters[msg.sender] + 1;
        // New counter
        if (_counters[msg.sender] == 1) {
            _addresses.push(msg.sender);
            _totalCounters++;
            emit NewCounter(msg.sender, 1);
        }
        emit CounterIncreased(msg.sender, _counters[msg.sender]);
    }

    function getAllCounters()
        public
        view
        returns (uint256[] memory allCounters)
    {
        allCounters = new uint256[](_totalCounters);
        for (uint256 i = 0; i < _totalCounters; i++) {
            allCounters[i] = _counters[_addresses[i]];
        }
        return allCounters;
    }
}
