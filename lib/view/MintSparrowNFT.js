"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const SparrowNFTsContract_1 = __importDefault(require("../contracts/SparrowNFTsContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class MintSparrowNFT {
    constructor() {
        this.container = (0, skynode_1.el)(".mint-sparrow-nft-view", (0, skynode_1.el)("a", "< 뒤로가기", { click: () => ViewUtil_1.default.go("/") }), (0, skynode_1.el)("h2", "참새 NFT 만들기"), (0, skynode_1.el)(".form", this.extnameInput = (0, skynode_1.el)("input", { placeholder: "파일 확장자 (png 등, 점 빼고)" }), this.nameInput = (0, skynode_1.el)("input", { placeholder: "NFT 이름" }), this.descriptionInput = (0, skynode_1.el)("input", { placeholder: "NFT 설명" }), this.amountInput = (0, skynode_1.el)("input", { placeholder: "발행 개수 (숫자로만)" }), (0, skynode_1.el)("input", {
            type: "file",
            change: (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    this.dataURL = reader.result;
                }, false);
                if (file) {
                    reader.readAsDataURL(file);
                }
            },
        }), (0, skynode_1.el)("a", "만들기", {
            click: async () => {
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined && this.dataURL !== undefined) {
                    const current = (await SparrowNFTsContract_1.default.current()).toNumber();
                    await SparrowNFTsContract_1.default.mint(this.extnameInput.domElement.value, this.nameInput.domElement.value, this.descriptionInput.domElement.value, parseInt(this.amountInput.domElement.value, 10));
                    const currentAfterMint = (await SparrowNFTsContract_1.default.current()).toNumber();
                    let id = -1;
                    for (let i = current; i < currentAfterMint; i += 1) {
                        if (await SparrowNFTsContract_1.default.minters(i) === owner) {
                            id = i;
                            break;
                        }
                    }
                    setTimeout(async () => {
                        if (this.dataURL !== undefined && id >= 0) {
                            const signedMessage = await Wallet_1.default.signMessage("Upload SparrowNFT File");
                            await fetch("https://api.ricecakemill.com/sparrow/nft/1/upload", {
                                method: "POST",
                                body: JSON.stringify({
                                    dataURL: this.dataURL,
                                    signedMessage,
                                }),
                            });
                            open(`https://opensea.io/assets/klaytn/0xfe1970e7fba02c2ab7721840eca0277d5ee6b482/${id}`);
                        }
                    }, 2000);
                }
            },
        })), (0, skynode_1.el)("p", "* 이미 발행된 NFT도 수정할 수 있도록 추후 기능 제공 예정")).appendTo(skynode_1.BodyNode);
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MintSparrowNFT;
//# sourceMappingURL=MintSparrowNFT.js.map