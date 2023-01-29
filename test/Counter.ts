import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function CounterFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, account2, account3, account4, account5] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    return { counter, owner, account2, account3, account4, account5 };
  }

  describe("Counters", function () {
    it("Should set only one counter", async function () {
      const {counter, account2} = await loadFixture(CounterFixture);
      for (let i = 0; i<3; i++) {
        // We call connect() on contract to use a different account for 'from'
        await counter.connect(account2).increment();
      }
      const counterList = await counter.getAllCounters();
      expect(counterList.length).to.be.eq(1)

      const {0: firstCounter} = counterList
      expect(firstCounter.toString()).to.be.eq("3")
    });

    it("Should set 3 different counters", async function() {
      const {counter, account2, account3, account4} = await loadFixture(CounterFixture);

      await counter.connect(account2).increment();
      await counter.connect(account3).increment();
      await counter.connect(account4).increment();

      const counterList = await counter.getAllCounters();
      expect(counterList.length).to.be.eq(3)
    })
  });

  describe("Events", function () {
      it("Should emit an event on new counters", async function () {
        const { counter, owner, account2 } = await loadFixture(
          CounterFixture
        );

        await expect(counter.connect(account2).increment())
          .to.emit(counter, "NewCounter")
          .withArgs(account2.address, 1);
      });
    });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

    // describe("Events", function () {
    //   it("Should emit an event on withdrawals", async function () {
    //     const { lock, unlockTime, lockedAmount } = await loadFixture(
    //       deployOneYearLockFixture
    //     );

    //     await time.increaseTo(unlockTime);

    //     await expect(lock.withdraw())
    //       .to.emit(lock, "Withdrawal")
    //       .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
    //   });
    // });

    // describe("Transfers", function () {
    //   it("Should transfer the funds to the owner", async function () {
    //     const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
    //       deployOneYearLockFixture
    //     );

    //     await time.increaseTo(unlockTime);

    //     await expect(lock.withdraw()).to.changeEtherBalances(
    //       [owner, lock],
    //       [lockedAmount, -lockedAmount]
    //     );
    //   });
    // });
  // });
});
