import "@nomiclabs/hardhat-ethers";
import { Signer, Wallet } from "ethers"
import { extendEnvironment } from "hardhat/config"
import { SafeProviderAdapter } from "./adapter"

export const setupSafeDeployer = (payload: { signer: Wallet | Signer | undefined, safe: string, serivceUrl: string | undefined }) => {
  extendEnvironment(async (env) => {
    let done = false;
    let fetchedSigner = undefined;
    env.ethers.getSigners().then(signers=>{
      done = true
      fetchedSigner = signers[0]
    })
    while (!done) {
      // do nothing, just wait
    }
    const { safe, serivceUrl } = payload
    const { chainId } = env.network.config;
    if (!chainId) {
      throw new Error('The chainId was required in hardhat network config');
    }
    if(!payload.signer) payload.signer = (await env.ethers.getSigners())[0]
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