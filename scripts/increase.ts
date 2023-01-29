import { ethers, } from "hardhat";

const constractName = 'Counter'
const contractAddress: string = '0x4a433BFD4D53A0657B15529D4880Dd0165a0CA2B'

async function main() {
  const Counter = await ethers.getContractFactory(constractName);
  const counter = Counter.attach(contractAddress);
  const [acc1, acc2] = await ethers.getSigners()

  await counter.connect(acc1).increment()
  await Promise.resolve(setTimeout(() => {}, 2000))

  let allCounters = await counter.getAllCounters();
  console.log(allCounters)
  
  
  await counter.connect(acc2).increment()
  await Promise.resolve(setTimeout(() => {}, 2000))


  allCounters = await counter.getAllCounters();
  console.log(allCounters)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
