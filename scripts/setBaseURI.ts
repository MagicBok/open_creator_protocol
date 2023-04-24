import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ContractDetails } from './common/constants';

export interface ISetBaseURIParams {
  uri: string;
  contract: string;
  gasprice?: number;
}

export const setBaseURI = async (
  args: ISetBaseURIParams,
  hre: HardhatRuntimeEnvironment,
) => {
  const { ethers } = hre;
  let overrides: any = {};

  if (args.gasprice) {
    overrides.gasPrice = args.gasprice * 1e9;
  }
  const ERC721M = await ethers.getContractFactory(ContractDetails.ERC721M.name);
  const contract = ERC721M.attach(args.contract);
  const tx = await contract.setBaseURI(args.uri, overrides);
  console.log(`Submitted tx ${tx.hash}`);

  await tx.wait();

  console.log('Set baseURI:', tx.hash);
};
