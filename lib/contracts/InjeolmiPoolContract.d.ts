import { BigNumber } from "@ethersproject/bignumber";
import KIP7Contract from "./standard/KIP7Contract";
declare class InjeolmiPoolContract extends KIP7Contract {
    constructor();
    swapToIJM(value: BigNumber): Promise<void>;
    swapToKlay(amount: BigNumber): Promise<void>;
}
declare const _default: InjeolmiPoolContract;
export default _default;
//# sourceMappingURL=InjeolmiPoolContract.d.ts.map