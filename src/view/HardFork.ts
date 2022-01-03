import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import ArkContract from "../contracts/ArkContract";
import Wallet from "../klaytn/Wallet";
import ViewUtil from "./ViewUtil";

export default class HardFork implements View {

    private container: DomNode;
    private ddd: DomNode;
    private interval: any;

    constructor() {
        this.container = el(".hardfork-view",
            el("a", "< 뒤로가기", { click: () => ViewUtil.go("/") }),
            el("h1", "안녕하신가?\n 힘세고 강한 아침,\n 만일 내게 물어보면\n 나는 물레방아 하드포크"),
            this.ddd = el(".done"),
            el("p", "나는 한다. 강한 풀! 나는 한다. 딱풀!"),
            el("p.warning", "1. 절대로 하드포크 도중에 인절미를 다른 지갑에 옮겨선 안됨!!! 모두 잃어버릴 수 있음!!!\n3. 트랜잭션은 2번 발생됨\n2. 너의 지갑에 인절미 수량이 줄어들었다면, 이전이 잘 된 것이야"),
            el("a", { href: "https://medium.com/tteok/%EB%AC%BC%EB%A0%88%EB%B0%A9%EC%95%84-%ED%95%98%EB%93%9C%ED%8F%AC%ED%81%AC-%EC%9D%B8%EC%A0%88%EB%AF%B8-2-0-7bcfcd7f2b9a", target: "_blank" },
                el("img", { src: "/images/hardInjeolmi.png" })),
            el("button", "기록했지? 인절미 이전하기", {
                click: async () => {
                    if (await Wallet.connected() !== true) {
                        await Wallet.connect();
                    }
                    const owner = await Wallet.loadAddress();
                    if (owner !== undefined) {
                        await ArkContract.sendOld();
                    }
                },
            })
        ).appendTo(BodyNode);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}
