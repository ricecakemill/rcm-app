import InjeolmiArtifact from "./abi/artifacts/contracts/Injeolmi.sol/Injeolmi.json";
import KIP7Contract from "./standard/KIP7Contract";

class InjeolmiContract extends KIP7Contract {

    constructor() {
        super("0x215A86F9215a7A0592118c45a87C168c1A1b3C75", InjeolmiArtifact.abi);
    }
}

export default new InjeolmiContract();
