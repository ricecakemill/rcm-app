"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const skyrouter_1 = require("skyrouter");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const SparrowNFTsContract_1 = __importDefault(require("../contracts/SparrowNFTsContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class MintSparrowNFT {
    constructor() {
        this.container = (0, skynode_1.el)(".mint-sparrow-nft-view", (0, skynode_1.el)("header", (0, skynode_1.el)("a", "< 뒤로가기", { click: () => ViewUtil_1.default.go("/") }), (0, skynode_1.el)("h2", "참새 NFT 만들기"), (0, skynode_1.el)("p", (0, msg_js_1.default)("SPARROW_NFT_DESC")), (0, skynode_1.el)("img.art", { src: "images/sparrowNFT.png" }), (0, skynode_1.el)("p", (0, skynode_1.el)("a", (0, msg_js_1.default)("SPARROW_NFT_ADDRESS"), "\nhttps://opensea.io/collection/sparrow-nfts", { href: "https://opensea.io/collection/sparrow-nfts", target: "_blank" })), (0, skynode_1.el)(".form", this.extnameInput = (0, skynode_1.el)("input", { placeholder: "파일 확장자 (png 등, 점 빼고)" }), this.nameInput = (0, skynode_1.el)("input", { placeholder: "NFT 이름" }), this.descriptionInput = (0, skynode_1.el)("input", { placeholder: "NFT 설명" }), this.amountInput = (0, skynode_1.el)("input", { placeholder: "발행 개수 (숫자로만)" }), (0, skynode_1.el)("input", {
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
        }), (0, skynode_1.el)("button", "만들기", {
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
                            await fetch(`https://api.tteok.org/sparrow/nft/${id}/upload`, {
                                method: "POST",
                                body: JSON.stringify({
                                    dataURL: this.dataURL,
                                    signedMessage,
                                    extname: this.extnameInput.domElement.value,
                                }),
                            });
                            alert("등록 완료!~!");
                            skyrouter_1.SkyRouter.refresh();
                        }
                    }, 2000);
                }
            },
        })), (0, skynode_1.el)("p.danger", "* 무료 패러디물은 관계없으나, 판매를 목적으로 하는 경우는 저작권에 주의하세요."), (0, skynode_1.el)("h5", "NFT 목록")), this.nftList = (0, skynode_1.el)("ul.nft-list")).appendTo(skynode_1.BodyNode);
        this.loadNFTs();
    }
    async loadNFTs() {
        const current = await SparrowNFTsContract_1.default.current();
        const address = await Wallet_1.default.loadAddress();
        const promises = [];
        for (let id = 0; id < current.toNumber(); id += 1) {
            const promise = async (index) => {
                const minter = await SparrowNFTsContract_1.default.minters(index);
                const extname = await SparrowNFTsContract_1.default.extnames(index);
                const title = await SparrowNFTsContract_1.default.titles(index);
                const description = await SparrowNFTsContract_1.default.descriptions(index);
                const totalSupply = await SparrowNFTsContract_1.default.getTotalSupply(index);
                (0, skynode_1.el)(".nft", (0, skynode_1.el)(".content", (0, skynode_1.el)(".title", title), (0, skynode_1.el)("img", {
                    src: `https://storage.googleapis.com/sparrow-nfts/${id}.${extname}`,
                    click: () => open(`https://opensea.io/assets/klaytn/0xfe1970e7fba02c2ab7721840eca0277d5ee6b482/${id}`),
                }), (0, skynode_1.el)(".minter", `발행자: ${CommonUtil_1.default.shortenAddress(minter)}`), (0, skynode_1.el)(".totalSupply", `총 발행량: ${totalSupply.toNumber()}`), (0, skynode_1.el)(".description", description), minter !== address ? undefined : (0, skynode_1.el)(".reupload", (0, skynode_1.el)("h6", "이미지 재업로드"), (0, skynode_1.el)("input.hidden", {
                    type: "file",
                    change: (event) => {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.addEventListener("load", async () => {
                            let dataURL = reader.result;
                            const signedMessage = await Wallet_1.default.signMessage("Upload SparrowNFT File");
                            await fetch(`https://api.tteok.org/sparrow/nft/${id}/upload`, {
                                method: "POST",
                                body: JSON.stringify({
                                    dataURL,
                                    signedMessage,
                                }),
                            });
                            skyrouter_1.SkyRouter.refresh();
                        }, false);
                        if (file) {
                            reader.readAsDataURL(file);
                        }
                    },
                })))).appendTo(this.nftList);
            };
            promises.push(promise(id));
        }
        await Promise.all(promises);
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MintSparrowNFT;
//# sourceMappingURL=MintSparrowNFT.js.map