# Mini Network

This project demonstrates a running an avalanche custom network. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

## Install Avalanche CLI

```shell
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
#
# Command above will install avalanche cli under ~/bin dir
# Either add ~/bin to your path or call the avalanche cli from absolute path
export PATH=~/bin:$PATH

# Make sure installation was successfull
avalanche --version
```

## Create Subnet

```shell
avalanche subnet create miniNetwork
# 1. Select SubnetEvm
# 2. Enter ChainId e.g 43999
# 3. Token symbol e.g MINI
# 4. Use latest SubnetEvm version
# 5. Select Low disk use / Low Throughput 1.5 mil gas/s (C-Chain's setting)
# 6. Select Airdrop 1 million tokens to the default address (do not use in production)
# 7. Precompiles: No
# 8. If all worked successfully, the command prints Successfully created subnet configuration
# 9. Deploy the subnet to the network:
avalanche subnet deploy miniNetwork
# 10. Select local network
# This command boots a five node Avalanche network on your machine. It needs to download the latest versions of AvalancheGo and Subnet-EVM.
```

## Deploy Smart Contracts

```shell
pnpm hardhat run scripts/deploy.ts
```

## Interact with Counter Contract

```shell
pnpm hardhat console --network local
```

```js
const Counter = await ethers.getContractFactory('')
const counter = Counter.attach('')
const [acc1, acc2] = await ethers.getSigners()

// Increment counter for acc1
await counter.connect(acc1).increment()

// Read counters
let allCounters = await counter.getAllCounters()

// Increment counter for acc2
await counter.connect(acc2).increment()

// Read counters
allCounters = await counter.getAllCounters()
```
