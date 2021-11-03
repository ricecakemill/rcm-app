import { BodyNode, el } from "@hanul/skynode";
import InjeolmiContract from "./contracts/InjeolmiContract";
import Wallet from "./klaytn/Wallet";

(async () => {

    BodyNode.append(
        el("h1", "떡방앗간.닷컴"),
        el("p", "사이트가 아직도 개발중입니다."),
        el("footer",
            el("a", "트위터", { href: "https://twitter.com/ricecakemill", target: "_blank" }), "\n",
            el("a", "오카방 (오픈 카카오톡 방)", { href: "https://open.kakao.com/o/g1nYzIHd", target: "_blank" }), "\n",
            el("img", { src: "/images/thankyou.gif", height: "107.5" }),
        ),
    );

    if (await Wallet.connected() !== true) {
        await Wallet.connect();
    }
    const owner = await Wallet.loadAddress();
    if (owner !== undefined) {
        console.log(await InjeolmiContract.balanceOf(owner));
    }
})();