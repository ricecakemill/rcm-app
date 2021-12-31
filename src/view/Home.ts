import { BodyNode, DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import AirdropContract from "../contracts/AirdropContract";
import FirstcomeAirdropContract from "../contracts/FirstcomeAirdropContract";
import InjeolmiContract from "../contracts/InjeolmiContract";
import InjeolmiPoolContract from "../contracts/InjeolmiPoolContract";
import InjeolmiPriceContract from "../contracts/InjeolmiPriceContract";
import Wallet from "../klaytn/Wallet";
import ViewUtil from "./ViewUtil";

export default class Home implements View {

    private container: DomNode;
    private interval: any;

    private priceDisplay: DomNode;
    private airdropDisplay: DomNode;
    private firstcomeAirdropEvent: DomNode;
    private ijmPrice: BigNumber = BigNumber.from(0);

    private buyInput: DomNode<HTMLInputElement>;
    private buyResult: DomNode;

    private sellInput: DomNode<HTMLInputElement>;
    private sellResult: DomNode;

    constructor() {
        this.container = el(".home-view",
            el("a.hardfork-button", "하드포크 허기", {
                click: () => ViewUtil.go("/hardpork"),
            }),
            el("h1", msg("TITLE")),
            el("p",
                msg("DESC_1"), "\n",
                msg("DESC_2"), "\n",
                msg("DESC_3"),
            ),
            el("h2", msg("INJEOLMI_TITLE")),
            el("img.logo", { src: "/images/injeolmi.png", height: "330" }),
            el("p", msg("INJEOLMI_DESC")),
            el("h3", msg("INJEOLMI_TOKENOMICS")),
            el("p", msg("INJEOLMI_TOKENOMICS_DESC_1")),
            el("p", msg("INJEOLMI_TOKENOMICS_DESC_2")),
            el("a", msg("DOWNLOAD_KAIKAS_BUTTON"), {
                href: "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi",
                target: "_blank",
            }),
            el(".links",
                el("a", msg("ADD_INJEOLMI_TO_WALLET_BUTTON"), {
                    click: () => Wallet.addToken(
                        InjeolmiContract.address,
                        "IJM",
                        8,
                        "https://raw.githubusercontent.com/tteokmill/tteok-app/main/docs/images/injeolmi.png"
                    ),
                }), "\n",
                el("a", msg("INJEOLMI_CONTRACT_BUTTON"), {
                    href: "https://scope.klaytn.com/token/0x9CFc059F64D664F92f3d0329844B8ccca4E5215B",
                    target: "_blank",
                }), "\n",
                el("a", msg("INJEOLMI_SOURCE_CODE_BUTTON"), {
                    href: "https://github.com/tteokmill/injeolmi",
                    target: "_blank",
                }), "\n",
                el("a", msg("INJEOLMI_CHART_BUTTON"), {
                    href: "https://dexata.kr/?tokenA=0x9cfc059f64d664f92f3d0329844b8ccca4e5215b&tokenB=0x0000000000000000000000000000000000000000",
                    target: "_blank",
                }),
            ),
            el("p.warning", msg("WRONG_TRANSFER_WARNING")),
            el(".card",
                el("h5", msg("INJEOLMI_PRICE")),
                el("h6", (this.priceDisplay = el("span.price", "...")), " KLAY\n"),
                el("h5", msg("INJEOLMI_AIRDROP_AMOUNT")),
                el("h6", (this.airdropDisplay = el("span.price", "...")), " IJM\n"),
                (this.firstcomeAirdropEvent = el(".event")),
            ),
            el("h3", msg("BUY_INJEOLMI_TITLE")),
            el("p", msg("BUY_INJEOLMI_DESC")),
            el(".form",
                this.buyInput = el("input", {
                    placeholder: msg("KLAY_AMOUNT"),
                    keyup: () => setTimeout(() => {
                        const value = utils.parseEther(this.buyInput.domElement.value);
                        this.buyResult.empty().appendText(
                            `대략 ${utils.formatEther(
                                value.mul(utils.parseEther("1")).div(this.ijmPrice).mul(9).div(10)
                            )} IJM`
                        );
                    }),
                }),
                this.buyResult = el(".result"),
                el("button", msg("BUY_INJEOLMI_BUTTON"), {
                    click: async () => {
                        await InjeolmiPoolContract.swapToIJM(
                            utils.parseEther(this.buyInput.domElement.value)
                        );
                    },
                })
            ),
            el("h3", msg("SELL_INJEOLMI_TITLE")),
            el("p", msg("SELL_INJEOLMI_DESC")),
            el(".form",
                this.sellInput = el("input", {
                    placeholder: msg("IMJ_AMOUNT"),
                    keyup: () => setTimeout(() => {
                        const value = utils.parseEther(this.sellInput.domElement.value);
                        this.sellResult.empty().appendText(
                            `대략 ${utils.formatEther(
                                value.mul(this.ijmPrice).div(utils.parseEther("1")).mul(9).div(10)
                            )} KLAY`
                        );
                    }),
                }),
                this.sellResult = el(".result"),
                el("button", msg("SELL_INJEOLMI_BUTTON"), {
                    click: async () => {
                        await InjeolmiPoolContract.swapToKlay(
                            utils.parseUnits(this.sellInput.domElement.value, 8)
                        );
                    },
                })
            ),
            el("h2", msg("WAREHOUSE_TITLE")),
            el("p",
                msg("WAREHOUSE_DESC_1"), "\n",
                msg("WAREHOUSE_DESC_2"),
            ),
            el("a", msg("WAREHOUSE_ADDRESS"), "\nhttps://opensea.io/tteokmill", { href: "https://opensea.io/tteokmill", target: "_blank" }),
            el("h2", msg("SPARROW_NFT_TITLE")),
            el("p", msg("SPARROW_NFT_DESC")),
            el("img.art", { src: "/images/nft/nft.jpg" }),
            el("p", el("a", msg("SPARROW_NFT_ADDRESS"), "\nhttps://opensea.io/collection/sparrow-nfts", { href: "https://opensea.io/collection/sparrow-nfts", target: "_blank" })),
            el("p", el("a", msg("MINT_SPARROW_NFT_BUTTON"), {
                click: () => ViewUtil.go("/mintnft"),
            })),
            el("h2", msg("FANGAME_TITLE")),
            el("p", msg("FANGAME_DESC")),
            el("img", { src: "/images/game/flappy.png", height: "300" }),
            el("a.game-link", msg("FANGAME_1_BUTTON"), {
                href: "https://flappy-injeolmi.netlify.app/",
                target: "_blank",
            }),
            el("footer",
                el("a", msg("TWITTER_BUTTON"), {
                    href: "https://twitter.com/tteokmill",
                    target: "_blank",
                }), "\n",
                el("a", msg("KAKAOTALK_BUTTON"), {
                    href: "https://open.kakao.com/o/g1nYzIHd",
                    target: "_blank",
                }), "\n",
                el("img", { src: "/images/thankyou.gif", height: "107.5" })
            ),
        ).appendTo(BodyNode);

        this.refresh();
        this.interval = setInterval(() => this.refresh(), 2000);
    }

    private async refresh() {

        this.ijmPrice = await InjeolmiPriceContract.price();
        const airdropBalance = await InjeolmiContract.balanceOf(
            AirdropContract.address
        );

        if (this.container.deleted !== true) {
            this.priceDisplay.empty().appendText(utils.formatEther(this.ijmPrice));
            this.airdropDisplay.empty().appendText(utils.formatUnits(airdropBalance, 8));
        }

        // 이벤트 진행중?
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const firstcomeAirdropBalance = await InjeolmiContract.balanceOf(
                FirstcomeAirdropContract.address
            );
            const airdropAmount = await FirstcomeAirdropContract.airdropAmount();
            if (firstcomeAirdropBalance.gte(airdropAmount)) {
                const season = await FirstcomeAirdropContract.season();
                const dropped = await FirstcomeAirdropContract.dropped(season, owner);
                if (this.container.deleted !== true) {
                    if (dropped === true) {
                        this.firstcomeAirdropEvent
                            .empty()
                            .appendText("선착순 떡돌리기 이벤트 참여 완료");
                    } else {
                        this.firstcomeAirdropEvent.empty().append(
                            el("h5", "★☆ 선착순 떡돌리기 이벤트 진행중! ☆★"),
                            el("a", "인절미 받기", {
                                click: async () => {
                                    await FirstcomeAirdropContract.airdrop();
                                },
                            })
                        );
                    }
                }
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}
