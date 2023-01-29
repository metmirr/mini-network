import {ethers} from 'hardhat'

const key = ethers.Wallet.createRandom();
const keyObject = {
  privateKey: key.privateKey,
  publicKey: key.publicKey,
  address: key.address,
}
console.log(keyObject)