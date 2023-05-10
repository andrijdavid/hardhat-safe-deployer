import "@nomiclabs/hardhat-ethers";
import { Signer, Wallet } from "ethers"
import { extendEnvironment } from "hardhat/config"
import { SafeProviderAdapter } from "./adapter"

export const setupSafeDeployer = (payload: { signer: Wallet | Signer, safe: string, serivceUrl: string | undefined }) => {
  extendEnvironment((env) => {
    const { safe, serivceUrl } = payload
    const { chainId } = env.network.config;
    if (!chainId) {
      throw new Error('The chainId was required in hardhat network config');
    }
    // do-not setup safe if using hardhat local network
    if (env.network.name === "hardhat") return
    env.network.provider = new SafeProviderAdapter(
      env.network.provider,
      payload.signer.connect(env.ethers.provider),
      safe,
      chainId,
      serivceUrl
    )
  })
}