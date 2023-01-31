# Subchain Deployment

## Create Subnet

### Create User

```shell
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.createUser",
    "params" :{
        "username":"metin",
        "password":"%passworD123-ud89"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

### Import key for the user

We are using `configs/accounts/acc2.txt`'s private key, which is funded at network creating:

```shell
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.importKey",
    "params" :{
        "username": "metin",
        "password": "%passworD123-ud89",
        "privateKey": "PrivateKey-2YUhqdPXPZ9vFhGxY9prd1atF197BoMCQqZ8DwBM67hcEDbzoE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

### Call platform.createSubnet

```shell
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-custom154xg4yd90t5gs72szaz469lwgsv9pgv264l0kd"
        ],
        "threshold":1,
        "from": ["P-custom154xg4yd90t5gs72szaz469lwgsv9pgv264l0kd"],
        "changeAddr": "P-custom154xg4yd90t5gs72szaz469lwgsv9pgv264l0kd",
        "username":"metin",
        "password":"%passworD123-ud89"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/P
```

Save txId which is subnet id `2ovZhSU7TvLprhY8JSLMKdyTtgaaLrQ2exdP7PAiRKEtheFpcd`

### Add validator to the subnet

Update the start time: `date +%s`

```shell
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.addSubnetValidator",
    "params": {
        "nodeID":"NodeID-Npgy81QJsP1URosXNDVwQR3NBG3WvuxM6",
        "subnetID":"2ovZhSU7TvLprhY8JSLMKdyTtgaaLrQ2exdP7PAiRKEtheFpcd",
        "startTime":1675149820,
        "endTime":1677601839,
        "weight":30,
        "changeAddr": "P-custom154xg4yd90t5gs72szaz469lwgsv9pgv264l0kd",
        "username":"metin",
        "password":"%passworD123-ud89"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Restart the validator node to validate the the subnet, with `--track-subnets=2ovZhSU7TvLprhY8JSLMKdyTtgaaLrQ2exdP7PAiRKEtheFpcd` option

### Get subnet validators

```shell
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {"subnetID":"2ovZhSU7TvLprhY8JSLMKdyTtgaaLrQ2exdP7PAiRKEtheFpcd"},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

## Create Subchain - EVM

### Create genesis data

```shell
curl -X POST --data '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subnetevm.buildGenesis",
  "params": {
    "genesisData": {
    "config": {
        "chainId": 111,
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
        "eip155Block": 0,
        "eip158Block": 0,
        "byzantiumBlock": 0,
        "constantinopleBlock": 0,
        "petersburgBlock": 0,
        "istanbulBlock": 0,
        "muirGlacierBlock": 0,
        "subnetEVMTimestamp": 0,
        "feeConfig": {
        "gasLimit": 20000000,
        "minBaseFee": 1000000000,
        "targetGas": 100000000,
        "baseFeeChangeDenominator": 48,
        "minBlockGasCost": 0,
        "maxBlockGasCost": 10000000,
        "targetBlockRate": 2,
        "blockGasCostStep": 500000
        }
    },
    "alloc": {
        "5e4Aaa262DbD962039D5CeF2aF6D82610520BDE5": {
        "balance": "0x52B7D2DCC80CD2E4000000"
        },
        "Fb5B8010b3193Cda51427fD32a090fcF1F17Ce2E": {
        "balance": "0x52B7D2DCC80CD2E4000000"
        },
        "b827d09b032B296605C20eee1c5103056AEF15A3": {
        "balance": "0x52B7D2DCC80CD2E4000000"
        }
    },
    "nonce": "0x0",
    "timestamp": "0x0",
    "extraData": "0x00",
    "gasLimit": "0x1312D00",
    "difficulty": "0x0",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
    }
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy/rpc
```

### Create blockchain

Do not forget to:

- Update subnet id
- Genesis data

```shell
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "subnetID": "2ovZhSU7TvLprhY8JSLMKdyTtgaaLrQ2exdP7PAiRKEtheFpcd",
        "vmID":"srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy",
        "name":"Mini Network",
        "genesisData": "0x7b22636f6e666967223a7b22636861696e4964223a3131312c22666565436f6e666967223a7b226761734c696d6974223a32303030303030302c22746172676574426c6f636b52617465223a322c226d696e42617365466565223a313030303030303030302c22746172676574476173223a3130303030303030302c22626173654665654368616e676544656e6f6d696e61746f72223a34382c226d696e426c6f636b476173436f7374223a302c226d6178426c6f636b476173436f7374223a31303030303030302c22626c6f636b476173436f737453746570223a3530303030307d2c22686f6d657374656164426c6f636b223a302c22656970313530426c6f636b223a302c2265697031353048617368223a22307832303836373939616565626561653133356332343663363530323163383262346531356132633435313334303939336161636664323735313838363531346630222c22656970313535426c6f636b223a302c22656970313538426c6f636b223a302c2262797a616e7469756d426c6f636b223a302c22636f6e7374616e74696e6f706c65426c6f636b223a302c2270657465727362757267426c6f636b223a302c22697374616e62756c426c6f636b223a302c226d756972476c6163696572426c6f636b223a302c227375626e657445564d54696d657374616d70223a307d2c226e6f6e6365223a22307830222c2274696d657374616d70223a22307830222c22657874726144617461223a2230783030222c226761734c696d6974223a22307831333132643030222c22646966666963756c7479223a22307830222c226d697848617368223a22307830303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030222c22636f696e62617365223a22307830303030303030303030303030303030303030303030303030303030303030303030303030303030222c22616c6c6f63223a7b2235653461616132363264626439363230333964356365663261663664383236313035323062646535223a7b2262616c616e6365223a22307835326237643264636338306364326534303030303030227d2c2262383237643039623033326232393636303563323065656531633531303330353661656631356133223a7b2262616c616e6365223a22307835326237643264636338306364326534303030303030227d2c2266623562383031306233313933636461353134323766643332613039306663663166313763653265223a7b2262616c616e6365223a22307835326237643264636338306364326534303030303030227d7d2c2261697264726f7048617368223a22307830303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030222c2261697264726f70416d6f756e74223a6e756c6c2c226e756d626572223a22307830222c2267617355736564223a22307830222c22706172656e7448617368223a22307830303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030222c2262617365466565506572476173223a6e756c6c7dfe64adec",
        "username":"metin",
        "password":"%passworD123-ud89"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

`txId: usYd6ZBVU2NNQarsUeKV5htjZortusZJjSYXP4iXsHzYs1ub4` is the blockchain id

### Check blockchain status

```shell
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchainStatus",
    "params" :{
        "blockchainID":"usYd6ZBVU2NNQarsUeKV5htjZortusZJjSYXP4iXsHzYs1ub4"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Response should be `{"jsonrpc":"2.0","result":{"status":"Validating"},"id":1}`

---

## Using avalanche-cli

```shell
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
#
# Command above will install avalanche cli under ~/bin dir
# Either add ~/bin to your path or call the avalanche cli from absolute path
export PATH=~/bin:$PATH

# Make sure installation was successfull
avalanche --version
```

Create Subnet

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
