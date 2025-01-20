# Hardhat Safe Deployer

## Overview
The **Hardhat Safe Deployer** plugin simplifies the deployment of smart contracts to Gnosis Safe using Hardhat. It provides an easy-to-use setup for interacting with a deployer Safe, ensuring secure and reliable deployments.

This repository is a fork of [rmeissner's Hardhat Safe Deployer](https://github.com/rmeissner/hardhat-safe-deployer). Special thanks to [@rmeissner](https://github.com/rmeissner) for the original implementation and inspiration.

## Installation

Install the plugin via Yarn:
```bash
yarn add github://andrijdavid/hardhat-safe-deployer
```
## Configuration

1. Import the plugin in your hardhat.config.ts:

```ts
import { setupSafeDeployer } from "hardhat-safe-deployer";
```

2.Configure the deployer by calling setupSafeDeployer with the required parameters:

  * Signer: An `Ethers` Wallet instance representing the owner, signer, or delegate of the deployer Safe.
  * Deployer Safe Address: The address of the deployer Safe. For example: [0x9b35af71d77eaf8d7e40252370304687390a1a52](https://contractscan.xyz/contract/0x9b35af71d77eaf8d7e40252370304687390a1a52).
  * Safe Service URL: The URL of the Safe service to use. The default is https://safe-transaction-base-sepolia.safe.global.
  * Salt (optional): If provided, the plugin uses `CREATE2` for smart contract creation, enabling deterministic addresses.

## Example Configuration

Below is an example configuration using `dotenv` for environment variables:

```ts

import { setupSafeDeployer } from "hardhat-safe-deployer";
import dotenv from "dotenv";
import { Wallet } from "ethers";

// Load environment variables.
dotenv.config();
const {
  INFURA_KEY,
  MNEMONIC,
  PRIVATE_KEY,
  MNEMONIC_PATH,
  ETHERSCAN_API_KEY,
  SAFE_SERVICE_URL,
  DEPLOYER_SAFE,
} = process.env;

// Configuration using mnemonic
setupSafeDeployer(
  Wallet.fromMnemonic(MNEMONIC!!, MNEMONIC_PATH),
  DEPLOYER_SAFE,
  SAFE_SERVICE_URL
);

// Or, configuration using private key
setupSafeDeployer({
  signer: new Wallet(PRIVATE_KEY),
  safe: DEPLOYER_SAFE,
  serviceUrl: SAFE_SERVICE_URL,
});

```
## Example Project

For a complete example, check out the [Hardhat Safe Deployer Example project](https://github.com/rmeissner/hardhat-safe-deployer-example).
