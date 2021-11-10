import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import KIP7Contract from "./standard/KIP7Contract";
declare class SparrowNFTsContract extends KIP7Contract {
    constructor();
    current(): Promise<BigNumber>;
    minters(id: BigNumberish): Promise<string>;
    mint(extname: string, title: string, description: string, amount: BigNumberish): Promise<void>;
}
declare const _default: SparrowNFTsContract;
export default _default;
//# sourceMappingURL=SparrowNFTsContract.d.ts.map