import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@nomiclabs/hardhat-ethers';

task("balance", "Prints an account's balance", async(_, {ethers}) =>{
    const balance = await ethers.provider.getBalance('0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC');
    console.log(ethers.utils.formatEther(balance), "ETH");
});

task("transfer", "Transfer", async(_, {ethers}) =>{
  const balance = await ethers.provider.getBalance('0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC');
  console.log(ethers.utils.formatEther(balance), "ETH");
  const [fundedAccount, ...otherAccounts] = await ethers.getSigners()

  await fundedAccount.sendTransaction({'value': ethers.utils.parseEther('1.0'), 'to': otherAccounts[0].address})

});

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  defaultNetwork: 'local',
  networks: {
    local: {
      url: 'http://127.0.0.1:9650/ext/bc/C/rpc',
      chainId: 43112,
      accounts: [
        // acc2
        "0xcb2b82ec1654c24bca239af3060bb6c6ca6ea006c37d374b72bb55c6b69190ea",
        // acc3
        "0xf17978b3ed3674e246c61eec3112bf167d5be7989e7abd7718ad1ffc3e77a2cd"
      ]
    },
  },
};

export default config;
