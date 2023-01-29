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
  // defaultNetwork: 'local',
  networks: {
    local: {
      url: 'http://127.0.0.1:9656/ext/bc/22vfZAztBh5VYQRvKi4LJ1UXBURqEtQJCh6JrP2txuPvrVeENd/rpc',
      chainId: 43999,
      accounts: [
        // First one if funded account
        "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
        "0x4f62b95f3d7cd81d5c5a01d9336eb5c10493ccffcb9c4acce6aca5b91f39fe0c"
      ]
    },
  },
};

export default config;
