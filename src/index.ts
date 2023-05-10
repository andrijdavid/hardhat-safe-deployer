import "@nomiclabs/hardhat-ethers";
import { Signer, Wallet } from "ethers"
import { extendEnvironment } from "hardhat/config"
import { SafeProviderAdapter } from "./adapter"

export const setupSafeDeployer = (payload: { signer: Wallet | Signer | undefined, safe: string, serivceUrl: string | undefined }) => {
  extendEnvironment((env) => {
    let fetchedSigner = undefined;
    env.ethers.getSigners().then(signers=>{
      fetchedSigner = signers[0]
    })
    while (!fetchedSigner) {
      // do nothing, just wait
    }
    const { safe, serivceUrl } = payload
    const { chainId } = env.network.config;
    if (!chainId) {
      throw new Error('The chainId was required in hardhat network config');
    }
    if(!payload.signer) payload.signer = fetchedSigner
    else payload.signer =  payload.signer.connect(env.ethers.provider)
    env.network.provider = new SafeProviderAdapter(
      env.network.provider,
      payload.signer,
      safe,
      chainId,
      serivceUrl
    )
  })
}