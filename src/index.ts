import "@nomiclabs/hardhat-ethers";
import { Signer, Wallet } from "ethers"
import { extendEnvironment } from "hardhat/config"
import { SafeProviderAdapter } from "./adapter"
import { HardhatRuntimeEnvironment } from "hardhat/types";

export const setupSafeDeployer = (signer: Wallet | Signer, safe: string, serivceUrl?: string, hre?: HardhatRuntimeEnvironment) => {
    extendEnvironment((env) => {
        const { chainId } = env.network.config;
        if (!chainId) {
          throw new Error('The chainId was required in hardhat network config');
        }
        env.network.provider = new SafeProviderAdapter(
          env.network.provider,
          signer.connect(env.ethers.provider),
          safe,
          chainId, 
          serivceUrl
        )
        if(hre) hre.network.provider = env.network.provider
    })
}