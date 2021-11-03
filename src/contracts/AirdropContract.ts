import AirdropArtifact from "./abi/artifacts/contracts/Airdrop.sol/Airdrop.json";
import KIP7Contract from "./standard/KIP7Contract";

class AirdropContract extends KIP7Contract {

    constructor() {
        super("0x05f2b0c56826f4244525d96C0004CB0032CD9709", AirdropArtifact.abi);
    }
}

export default new AirdropContract();
