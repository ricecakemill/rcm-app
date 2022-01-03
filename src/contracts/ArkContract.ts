import { BigNumber } from "ethers";
import ArkArtifact from "./abi/injeolmi-v2/artifacts/contracts/Ark.sol/Ark.json";
import Contract from "./Contract";

class ArkContract extends Contract {

    constructor() {
        super("0xb532a6A7a5Fbf64DA0FDc1333FBB0EfA83D913D1", ArkArtifact.abi);
    }

    public async records(address: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("records", address));
    }

    public async sendOld(): Promise<void> {
        await this.runWalletMethod("sendOld");
    }
}

export default new ArkContract();
