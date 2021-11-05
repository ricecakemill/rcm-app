import { BigNumber } from "@ethersproject/bignumber";
import KIP7Contract from "./standard/KIP7Contract";
declare class InjeolmiPriceContract extends KIP7Contract {
    constructor();
    price(): Promise<BigNumber>;
}
declare const _default: InjeolmiPriceContract;
export default _default;
//# sourceMappingURL=InjeolmiPriceContract.d.ts.map