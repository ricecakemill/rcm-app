import { BodyNode, DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import AirdropContract from "./contracts/AirdropContract";
import InjeolmiContract from "./contracts/InjeolmiContract";
import InjeolmiPoolContract from "./contracts/InjeolmiPoolContract";
import InjeolmiPriceContract from "./contracts/InjeolmiPriceContract";
import Klaytn from "./klaytn/Klaytn";
import Wallet from "./klaytn/Wallet";

(async () => {
  let priceDisplay: DomNode;
  let airdropDisplay: DomNode;
  let ijmPrice: BigNumber;

  let buyInput: DomNode<HTMLInputElement>;
  let buyResult: DomNode;

  let sellInput: DomNode<HTMLInputElement>;
  let sellResult: DomNode;

  BodyNode.append(
    el("h1", "떡방앗간.닷컴"),
    el(
      "p",
      "한국인의 정과 훈훈한 인심. 따뜻한 코인 커뮤니티 떡방앗간 코인 이야기. \n",
      el("a", "http://ricecakemill.com", {
        href: "http://ricecakemill.com",
        target: "_blank",
      }),
      "으로도 접속하실 수 있습니다."
    ),

    el("h2", "인절미"),
    el("img.logo", { src: "/images/injeolmi.png", height: "330" }),
    el(
      "p",
      '우리나라에는 새로 이사를 오면 떡을 돌리는 풍습이 있습니다. 이런 "떡돌리기" 문화를 토크노믹스로 만들어 보았습니다. 한국인의 정과 훈훈한 인심을 느껴보세요.'
    ),

    el("h3", "인절미 떡크노믹스"),
    el(
      "p",
      "토큰 전송 시 10% 떼감 -> 9%는 홀더들한테 떡돌림, 1%는 떡방앗간에 팁으로 제공 (팁은 이벤트, 에드, 기부, 개발자 사리사욕에 쓰임)"
    ),
    el(
      ".links",
      el("a", "인절미 카이카스 지갑에 추가", {
        click: () =>
          Wallet.addToken(
            InjeolmiContract.address,
            "IJM",
            8,
            "https://raw.githubusercontent.com/ricecakemill/rcm-app/main/docs/images/injeolmi.png"
          ),
      }),
      el("span.danger", "(클립은 영원히 지원 계획이 없습니다.)"),
      "\n",
      el(
        "a",
        "스마트 콘트랙트 주소: 0x9CFc059F64D664F92f3d0329844B8ccca4E5215B",
        {
          href: "https://scope.klaytn.com/token/0x9CFc059F64D664F92f3d0329844B8ccca4E5215B",
          target: "_blank",
        }
      ),
      "\n",
      el("a", "소스 코드", {
        href: "https://github.com/ricecakemill/injeolmi",
        target: "_blank",
      })
    ),
    el(
      ".card",
      el("h5", "인절미 가격"),
      el("h6.price", (priceDisplay = el("span", "...")), " KLAY\n"),
      el("h5", "에어드롭 물량"),
      el("h6.price", (airdropDisplay = el("span", "...")), " IJM\n")
    ),

    el("h3", "클레이로 인절미 사기"),
    el("p", "인절미를 살때도 떡크노믹스 때문에 10%를 적게 받습니다."),
    el(
      ".form",
      (buyInput = el(
        "input",
        { placeholder: "KLAY 수량" },
        {
          keyup: () => {
            const value = utils.parseEther(buyInput.domElement.value);
            buyResult
              .empty()
              .appendText(
                `대략 ${utils.formatEther(
                  value.mul(utils.parseEther("1")).div(ijmPrice).mul(9).div(10)
                )} IJM`
              );
          },
        }
      )),
      (buyResult = el(".result")),
      el("button", "사기", {
        click: async () => {
          await InjeolmiPoolContract.swapToIJM(
            utils.parseEther(buyInput.domElement.value)
          );
        },
      })
    ),

    el("h3", "인절미 클레이로 팔기"),
    el("p", "인절미를 팔때도 떡크노믹스 때문에 10%를 적게 받습니다."),
    el(
      ".form",
      (sellInput = el(
        "input",
        { placeholder: "IJM 수량" },
        {
          keyup: () => {
            const value = utils.parseEther(sellInput.domElement.value);
            sellResult
              .empty()
              .appendText(
                `대략 ${utils.formatEther(
                  value.mul(ijmPrice).div(utils.parseEther("1")).mul(9).div(10)
                )} KLAY`
              );
          },
        }
      )),
      (sellResult = el(".result")),
      el("button", "팔기", {
        click: async () => {
          await InjeolmiPoolContract.swapToKlay(
            utils.parseUnits(sellInput.domElement.value, 8)
          );
        },
      })
    ),

    el("h2", "떡 NFT"),
    el(
      "p",
      "떡 NFT(KIP-37) 발행 예정입니다. 순수 2차 창작물로 발행되며 창작자에게 발행된 NFT를 전량 전달합니다. 떡 NFT는 Klubs가 출시되면 Klubs에 배포됩니다."
    ),
    el("img", { src: "/images/nft/nft.jpg" }),
    el(
      "footer",
      el("a", "트위터", {
        href: "https://twitter.com/ricecakemill",
        target: "_blank",
      }),
      "\n",
      el("a", "오카방 (오픈 카카오톡 방)", {
        href: "https://open.kakao.com/o/g1nYzIHd",
        target: "_blank",
      }),
      "\n",
      el("img", { src: "/images/thankyou.gif", height: "107.5" })
    )
  );

  const refresh = async () => {
    ijmPrice = await InjeolmiPriceContract.price();
    priceDisplay.empty().appendText(utils.formatEther(ijmPrice));
    const airdropBalance = await InjeolmiContract.balanceOf(
      AirdropContract.address
    );
    airdropDisplay.empty().appendText(utils.formatUnits(airdropBalance, 8));
  };
  setInterval(() => refresh(), 1000);

  if ((await Wallet.connected()) !== true) {
    await Wallet.connect();
  }
})();
