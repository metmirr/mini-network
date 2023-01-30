# Mini Network

This project demonstrates a running an avalanche custom network. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

## Run network

Network is consists of 3 validator nodes:

```shell
# Run each command on a separate terminal tab

# node1
./scripts/node1.sh

# node2
./scripts/node2.sh

# node3
./scripts/node3.sh
```

## Subnet Deployment

[Subnet deployment](./subchain-deployment.md)

## Deploy Smart Contracts

```shell
pnpm hardhat run scripts/deploy.ts --network local
```

## Interact with Counter Contract

```shell
pnpm hardhat console --network local
```

```js
const Counter = await ethers.getContractFactory('Counter')
const counter = Counter.attach('0x21B0aC42e0a0848dB409876E34C64E31E4a8eF52')
const [acc1, acc2] = await ethers.getSigners()

// Increment counter for acc1
await counter.increment()

// Read counters
await counter.getAllCounters()

// Increment counter for acc2
await counter.connect(acc2).increment()

// Read counters
await counter.getAllCounters()
```
