#!/usr/bin/env bash

set -e

avalanchego --public-ip=127.0.0.1\
  --http-port=9654\
  --staking-port=9655\
  --network-id=9999\
  --genesis=./configs/genesis.json\
  --bootstrap-ips=127.0.0.1:9651\
  --bootstrap-ids=NodeID-Npgy81QJsP1URosXNDVwQR3NBG3WvuxM6\
  --chain-data-dir=./network9999/node3/chainData\
  --log-dir=./network9999/node3/logs\
  --db-dir=./network9999/node3/db\
  --plugin-dir=./plugins\
  --staking-tls-cert-file=./configs/staking/staker3.crt\
  --staking-tls-key-file=./configs/staking/staker3.key\
  --staking-signer-key-file=./configs/staking/signer3.key