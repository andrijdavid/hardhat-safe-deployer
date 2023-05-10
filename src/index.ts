import "@nomiclabs/hardhat-ethers";
import { Signer, Wallet } from "ethers"
import { extendEnvironment } from "hardhat/config"
import { SafeProviderAdapter } from "./adapter"

export const setupSafeDeployer = (payload: { signer: Wallet | Signer | undefined, safe: string, serivceUrl: string | undefined }) => {
  extendEnvironment(async (env) => {
    const { safe, serivceUrl } = payload
    const { chainId } = env.network.config;
    if (!chainId) {
      throw new Error('The chainId was required in hardhat network config');
    }
    if(!payload.signer) payload.signer = (await env.ethers.getSigners())[0]
    env.network.provider = new SafeProviderAdapter(
      env.network.provider,
      payload.signer.connect(env.ethers.provider),
      safe,
      chainId,
      serivceUrl
    )
  })
}