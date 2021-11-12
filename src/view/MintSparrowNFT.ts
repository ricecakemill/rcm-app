import { BodyNode, DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { SkyRouter, View, ViewParams } from "skyrouter";
import CommonUtil from "../CommonUtil";
import SparrowNFTsContract from "../contracts/SparrowNFTsContract";
import Wallet from "../klaytn/Wallet";
import ViewUtil from "./ViewUtil";

export default class MintSparrowNFT implements View {

    private container: DomNode;

    private extnameInput: DomNode<HTMLInputElement>;
    private nameInput: DomNode<HTMLInputElement>;
    private descriptionInput: DomNode<HTMLInputElement>;
    private amountInput: DomNode<HTMLInputElement>;
    private nftList: DomNode;

    private dataURL: string | undefined;

    constructor() {
        this.container = el(".mint-sparrow-nft-view",
            el("header",
                el("a", "< 뒤로가기", { click: () => ViewUtil.go("/") }),
                el("h2", "참새 NFT 만들기"),
                el("p", msg("SPARROW_NFT_DESC")),
                el("img.art", { src: "images/sparrowNFT.png" }),
                el("p", el("a", msg("SPARROW_NFT_ADDRESS"), "\nhttps://opensea.io/collection/sparrow-nfts", { href: "https://opensea.io/collection/sparrow-nfts", target: "_blank" })),
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
                    el("button", "만들기", {
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
                                        await fetch(`https://api.ricecakemill.com/sparrow/nft/${id}/upload`, {
                                            method: "POST",
                                            body: JSON.stringify({
                                                dataURL: this.dataURL,
                                                signedMessage,
                                            }),
                                        });
                                        SkyRouter.refresh();
                                    }
                                }, 2000);
                            }
                        },
                    }),
                ),
                el("p.danger", "* 무료 패러디물은 관계없으나, 판매를 목적으로 하는 경우는 저작권에 주의하세요."),
                el("h5", "NFT 목록"),
            ),
            this.nftList = el("ul.nft-list"),
        ).appendTo(BodyNode);

        this.loadNFTs();
    }

    private async loadNFTs() {

        const current = await SparrowNFTsContract.current();
        const address = await Wallet.loadAddress();

        const promises: Promise<void>[] = [];
        for (let id = 0; id < current.toNumber(); id += 1) {
            const promise = async (index: number) => {

                const minter = await SparrowNFTsContract.minters(index);
                const extname = await SparrowNFTsContract.extnames(index);
                const title = await SparrowNFTsContract.titles(index);
                const description = await SparrowNFTsContract.descriptions(index);
                const totalSupply = await SparrowNFTsContract.getTotalSupply(index);

                el(".nft",
                    el(".content",
                        el(".title", title),
                        el("img", {
                            src: `https://storage.googleapis.com/sparrow-nfts/${id}.${extname}`,
                            click: () => open(`https://opensea.io/assets/klaytn/0xfe1970e7fba02c2ab7721840eca0277d5ee6b482/${id}`),
                        }),
                        el(".minter", `발행자: ${CommonUtil.shortenAddress(minter)}`),
                        el(".totalSupply", `총 발행량: ${totalSupply.toNumber()}`),
                        el(".description", description),
                        minter !== address ? undefined : el(".reupload",
                            el("h6", "이미지 재업로드"),
                            el("input.hidden", {
                                type: "file",
                                change: (event) => {
                                    const file = event.target.files[0];
                                    const reader = new FileReader();
                                    reader.addEventListener("load", async () => {
                                        let dataURL = reader.result as string;
                                        const signedMessage = await Wallet.signMessage("Upload SparrowNFT File");
                                        await fetch(`https://api.ricecakemill.com/sparrow/nft/${id}/upload`, {
                                            method: "POST",
                                            body: JSON.stringify({
                                                dataURL,
                                                signedMessage,
                                            }),
                                        });
                                        SkyRouter.refresh();
                                    }, false);
                                    if (file) {
                                        reader.readAsDataURL(file);
                                    }
                                },
                            }),
                        ),
                    ),
                ).appendTo(this.nftList);
            };
            promises.push(promise(id));
        }
        await Promise.all(promises);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
