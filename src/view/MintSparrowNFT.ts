import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import SparrowNFTsContract from "../contracts/SparrowNFTsContract";
import Wallet from "../klaytn/Wallet";
import ViewUtil from "./ViewUtil";

export default class MintSparrowNFT implements View {

    private container: DomNode;

    private extnameInput: DomNode<HTMLInputElement>;
    private nameInput: DomNode<HTMLInputElement>;
    private descriptionInput: DomNode<HTMLInputElement>;
    private amountInput: DomNode<HTMLInputElement>;
    private dataURL: string | undefined;

    constructor() {
        this.container = el(".mint-sparrow-nft-view",
            el("a", "< 뒤로가기", { click: () => ViewUtil.go("/") }),
            el("h2", "참새 NFT 만들기"),
            el(".form",
                this.extnameInput = el("input", { placeholder: "파일 확장자 (png 등, 점 빼고)" }),
                this.nameInput = el("input", { placeholder: "NFT 이름" }),
                this.descriptionInput = el("input", { placeholder: "NFT 설명" }),
                this.amountInput = el("input", { placeholder: "발행 개수 (숫자로만)" }),
                el("input", {
                    type: "file",
                    change: (event) => {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.addEventListener("load", () => {
                            this.dataURL = reader.result as string;
                        }, false);
                        if (file) {
                            reader.readAsDataURL(file);
                        }
                    },
                }),
                el("a", "만들기", {
                    click: async () => {

                        const owner = await Wallet.loadAddress();
                        if (owner !== undefined && this.dataURL !== undefined) {

                            const current = (await SparrowNFTsContract.current()).toNumber();
                            await SparrowNFTsContract.mint(
                                this.extnameInput.domElement.value,
                                this.nameInput.domElement.value,
                                this.descriptionInput.domElement.value,
                                parseInt(this.amountInput.domElement.value, 10),
                            );
                            const currentAfterMint = (await SparrowNFTsContract.current()).toNumber();

                            let id = -1;
                            for (let i = current; i < currentAfterMint; i += 1) {
                                if (await SparrowNFTsContract.minters(i) === owner) {
                                    id = i;
                                    break;
                                }
                            }

                            setTimeout(async () => {
                                if (this.dataURL !== undefined && id >= 0) {
                                    const signedMessage = await Wallet.signMessage("Upload SparrowNFT File");
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
                }),
            ),
            el("p", "* 이미 발행된 NFT도 수정할 수 있도록 추후 기능 제공 예정"),
        ).appendTo(BodyNode);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
