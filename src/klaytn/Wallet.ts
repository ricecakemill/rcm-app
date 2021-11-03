import EventContainer from "eventcontainer";
import ExtWallet from "./ExtWallet";

class Wallet extends EventContainer {

    constructor() {
        super();
        this.checkConnected();
    }

    private async checkConnected() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }

    public async loadAddress(): Promise<string | undefined> {
        if (ExtWallet.installed === true) {
            return await ExtWallet.loadAddress();
        }
    }

    public async connected() {
        return await this.loadAddress() !== undefined;
    }

    public async connect() {
        if (ExtWallet.installed === true) {
            return await ExtWallet.connect();
        } else {
            alert("카이카스가 필요합니다. 카이카스를 설치해주시기 바랍니다.");
        }
    }
}

export default new Wallet();
