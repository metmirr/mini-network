#!/usr/bin/env bash

set -e

avalanchego --public-ip=127.0.0.1\
  --http-port=9652\
  --staking-port=9653\
  --network-id=9999\
  --genesis=./configs/genesis.json\
  --bootstrap-ips=127.0.0.1:9651\
  --bootstrap-ids=NodeID-Npgy81QJsP1URosXNDVwQR3NBG3WvuxM6\
  --chain-data-dir=./network9999/node2/chainData\
  --log-dir=./network9999/node2/logs\
  --db-dir=./network9999/node2/db\
  --plugin-dir=./plugins\
  --staking-tls-cert-file=./configs/staking/staker2.crt\
  --staking-tls-key-file=./configs/staking/staker2.key\
  --staking-signer-key-file=./configs/staking/signer2.key