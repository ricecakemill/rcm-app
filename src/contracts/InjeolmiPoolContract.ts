import InjeolmiPoolArtifact from "./abi/artifacts/contracts/InjeolmiPool.sol/InjeolmiPool.json";
import KIP7Contract from "./standard/KIP7Contract";

class InjeolmiPoolContract extends KIP7Contract {

    constructor() {
        super("0xfABD2A8482c4Da6361e5B801538d937CC0BD21C1", InjeolmiPoolArtifact.abi);
    }
}

export default new InjeolmiPoolContract();
