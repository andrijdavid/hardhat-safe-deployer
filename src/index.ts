import "@nomiclabs/hardhat-ethers";
import { Signer, Wallet } from "ethers"
import { extendEnvironment } from "hardhat/config"
import { SafeProviderAdapter } from "./adapter"
import { EthereumProvider } from "hardhat/types";
interface MyProvider extends EthereumProvider {
  getSigner(index?: number): Signer;
}

export const setupSafeDeployer = (payload: { signer: Wallet | Signer | undefined, safe: string, serivceUrl: string | undefined }) => {
  extendEnvironment((env) => {
    const { safe, serivceUrl } = payload
    const { chainId } = env.network.config;
    if (!chainId) {
      throw new Error('The chainId was required in hardhat network config');
    }
    if(!payload.signer) payload.signer = (env.network.provider as MyProvider).getSigner(0)
    env.network.provider = new SafeProviderAdapter(
      env.network.provider,
      payload.signer.connect(env.ethers.provider),
      safe,
      chainId,
      serivceUrl
    )
  })
}