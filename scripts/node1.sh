#!/usr/bin/env bash

set -e

avalanchego --public-ip=127.0.0.1\
  --http-port=9650\
  --staking-port=9651\
  --network-id=9999\
  --genesis=./configs/genesis.json\
  --chain-data-dir=./network9999/node1/chainData\
  --log-dir=./network9999/node1/logs\
  --api-keystore-enabled \
  --db-dir=./network9999/node1/db\
  --plugin-dir=./plugins\
  --staking-tls-cert-file=./configs/staking/staker1.crt\
  --staking-tls-key-file=./configs/staking/staker1.key\
  --staking-signer-key-file=./configs/staking/signer1.key\
  --track-subnets=GbJAvRW5oXHLy1tonqzeEuZA9hwd7Tf2aejx7onNy4Q1WW5MB