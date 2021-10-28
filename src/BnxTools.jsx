import styled from "styled-components";
import faviconPng from "./img/favicon.png";
import {
  Button,
  Table,
  Form,
  Tag,
  Select,
  InputNumber,
  message,
  Alert,
  Switch,
  Statistic,
  Input,
  Popconfirm,
  Anchor,
  Space,
  BackTop,
} from "antd";
import { useEffect, useState } from "react";
import { useMetamask } from "use-metamask";
import Web3 from "web3";
import MagePng from "./img/role_Mage.png";
import RangerPng from "./img/role_Ranger.png";
import RobberPng from "./img/role_Robber.png";
import WarriorPng from "./img/role_Warrior.png";
import hreoAbi from "./hreoabi.json";
import mingAbi from "./mingAbi.json";
import newmingAbi from "./newmingAbi.json";
import LinggongAbi from "./LinggongAbi.json";
import newPlayAbi from "./newPlayAbi.json";
import BlacksmithAbi from "./BlacksmithAbi.json";
import HunterAbi from "./HunterAbi.json";
import BookmangerAbi from "./BookmangerAbi.json";
import RangeworkAbi from "./RangeworkAbi.json";
const { Countdown } = Statistic;
const { Link } = Anchor;

const network_chainId = 56;
const chain = {
  chainId: "0x38",
  chainName: "BSC",
  nativeCurrency: {
    name: "BSC",
    symbol: "BSC",
    decimals: 18,
  },
  rpcUrls: ["https://bsc-dataseed3.binance.org"],
  blockExplorerUrls: ["https://bscscan.com/"],
};

function initWeb3(provider) {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  });

  return web3;
}

const MarkUrl =
  "https://market.binaryx.pro/getSales?page=1&page_size=99999&status=selling&name=&sort=time&direction=desc&career=&value_attr=&start_value=&end_value=&pay_addr=";
const Robber = "0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3";
const Warrior = "0x22F3E436dF132791140571FC985Eb17Ab1846494";
const Mage = "0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44";
const Ranger = "0xF31913a9C8EFE7cE7F08A1c08757C166b572a937";
const gongzuo_type1 = `0xfA65a5751ef6079C1022Aa10b9163d7A2281360A`; //兼职工作
const gongzuo_type2 = `0x480d503B12ae928e8DcCd820CE45B2f6F39Ad598`; //酿酒
const gongzuo_type3 = `0x3a4D27B77B253bdb9AFec082D8f5cDE5A4D713E1`; //伐木
const gongzuo_type4 = `0x21D4Da5833d93944B8340788C6b463ED8420838B`; //卷轴抄录
const gongzuo_type5 = `0x81E9aCe9511A7d56fd31940d1C49425CA3a2B8f8`; //打猎
const gongzuo_type6 = `0xC5dDbb4ac27A939D914059A023C6A35F377B67Ff`; //皇室守卫
const gongzuo_type7 = `0xdcC5C1e7A3ADC8b7635565183a7385026502440B`; //军团士兵
const gongzuo_type8 = `0x0ac4eB7978E0dA0d53824bd590354C8Bd264C4e6`; //皇室顾问

const gongzuo_type_zh = (type) => {
  switch (type) {
    case gongzuo_type1:
      return "兼职";
    case gongzuo_type2:
      return "酿酒";
    case gongzuo_type3:
      return "伐木";
    case gongzuo_type4:
      return "卷轴";
    case gongzuo_type5:
      return "打猎";
    case gongzuo_type6:
      return "守卫";
    case gongzuo_type7:
      return "士兵";
    case gongzuo_type8:
      return "顾问";
  }
};

const prices = {
  86: 423,
  87: 576,
  88: 720,
  89: 864,
  90: 1008,
  91: 1152,
  92: 1296,
  93: 1440,
  94: 1584,
  95: 1728,
  96: 1872,
  97: 2016,
  98: 2160,
  99: 2304,
  99: 2448,
};

const multiples = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16,
  6: 25,
  7: 50,
  8: 75,
  9: 100,
  10: 200,
  11: 300,
  12: 500,
};

const Addresss = {
  WarriorAddress: "0x22F3E436dF132791140571FC985Eb17Ab1846494",
  RobberAddress: "0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3",
  MageAddress: "0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44",
  YXAddress: "0xF31913a9C8EFE7cE7F08A1c08757C166b572a937",
  NewPlayInfoAddress: "0x210d87ba2990082ff22ea15396303382b1faea56",
  MiningAddress: "0xe278BDF4541cc309b379F9A4E867F60fD6B7BC59",
  NewMiningAddress: "0x698E165F2897e4daC68671c4cDFf337bbC543767",
  BulieAddress: "0x8B2DF673a3313BB3c0A03A154D9fFECbB2cCF26F",
  DatieAddress: "0x4713A70db9AD47780EFC3300c08C17c4013DCa57",
  LinggongAddress: "0xfA65a5751ef6079C1022Aa10b9163d7A2281360A",
  TushuAddress: "0x0594522127B6276C001554C15b900166BD98eC0E",
  BlacksmithAddress: "0x3a4D27B77B253bdb9AFec082D8f5cDE5A4D713E1",
  HunterAddress: "0x480d503B12ae928e8DcCd820CE45B2f6F39Ad598",
  BookmangerAddress: "0x21D4Da5833d93944B8340788C6b463ED8420838B",
  RangeworkAddress: "0x81E9aCe9511A7d56fd31940d1C49425CA3a2B8f8",
  newSaleAddress: "0x1416e6EA40CBb1F09Cd2dbEdAAd6fbFE3e38D51F",
};

const names = {
  [Robber]: "盗贼",
  [Warrior]: "战士",
  [Mage]: "法师",
  [Ranger]: "游侠",
};

const BnxToolFrame = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Header = styled.header`
  width: 100vw;
  padding: 10px 20px;
  box-shadow: 0 1px 5px 5px #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  background: #fff;
  z-index: 99;
`;

const HeaderTools = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const HeaderTitle = styled.span`
  font-size: 1.5rem;
  margin-left: 10px;
`;

const Main = styled.main`
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-top: 100px;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const CButton = styled(Button)`
  margin: 5px;
`;

const TableFrame = styled.div`
  border: 1px solid #efefef;
  margin-top: 10px;
`;

const CTable = styled(Table)`
  width: 950px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TableHeader = styled.header`
  width: 100%;
  display: flex;
  padding: 5px 10px;
  align-items: center;
  flex-direction: column;
`;

const Pngs = (career_address) => {
  switch (career_address) {
    case Robber:
      return RobberPng;
    case Warrior:
      return WarriorPng;
    case Mage:
      return MagePng;
    case Ranger:
      return RangerPng;
  }
};

const isMobile = () => {
  const sUserAgent = navigator.userAgent;
  return (
    sUserAgent.indexOf("Android") > -1 || sUserAgent.indexOf("iPhone") > -1
  );
};

const filterHege = (
  items,
  address,
  attr1,
  atrr2,
  mainAttr1 = 86,
  seconed = 61
) => {
  return (items = items.filter((item) => {
    return (
      item.career_address === address &&
      item[attr1] >= mainAttr1 &&
      item[atrr2] >= seconed
    );
  }));
};

const filterHegeOne = (
  item,
  address,
  attr1,
  atrr2,
  mainAttr1 = 86,
  seconed = 61
) => {
  return (
    item.career_address === address &&
    item[attr1] >= mainAttr1 &&
    item[atrr2] >= seconed
  );
};

const workColumn = [
  {
    title: "工作",
    dataIndex: "workname",
    width: 60,
  },
  {
    title: "收益",
    dataIndex: "gold",
    width: 60,
  },
];

const baseColumns = [
  {
    title: "",
    width: 50,
    render: (text, record) => {
      return (
        <img style={{ width: "40px" }} src={Pngs(record.career_address)} />
      );
    },
  },
  {
    title: "角色",
    dataIndex: "js",
    width: 60,
    render: (text, record) => {
      return <p>{names[record.career_address]}</p>;
    },
  },
  {
    title: "等级",
    dataIndex: "level",
    width: 60,
    sorter: (a, b) => a.level - b.level,
  },
  {
    title: "总属性",
    dataIndex: "total",
    width: 70,
  },
  {
    title: "力量",
    dataIndex: "strength",
    width: 60,
    sorter: (a, b) => a.strength - b.strength,
    render: (text, record) => {
      return (
        <span
          style={{
            color:
              record.career_address === Robber ||
              record.career_address === Warrior ||
              record.career_address === Ranger
                ? "red"
                : "black",
          }}
        >
          {record.strength}
          {record.career_address === Warrior || record.career_address === Ranger
            ? "(主)"
            : ""}
          {record.career_address === Robber ? "(副)" : ""}
        </span>
      );
    },
  },
  {
    title: "敏捷",
    dataIndex: "agility",
    width: 60,
    sorter: (a, b) => a.agility - b.agility,
    render: (text, record) => {
      return (
        <span
          style={{
            color:
              record.career_address === Robber ||
              record.career_address === Ranger
                ? "red"
                : "black",
          }}
        >
          {record.agility}
          {record.career_address === Robber ? "(主)" : ""}
          {record.career_address === Ranger ? "(副)" : ""}
        </span>
      );
    },
  },
  {
    title: "体质",
    dataIndex: "physique",
    width: 60,
    sorter: (a, b) => a.physique - b.physique,
    render: (text, record) => {
      return (
        <span
          style={{
            color: record.career_address === Warrior ? "red" : "black",
          }}
        >
          {record.physique}
          {record.career_address === Warrior ? "(副)" : ""}
        </span>
      );
    },
  },
  {
    title: "意志",
    dataIndex: "volition",
    width: 60,
    sorter: (a, b) => a.volition - b.volition,
  },
  {
    title: "智力",
    dataIndex: "brains",
    sorter: (a, b) => a.brains - b.brains,
    width: 60,
    render: (text, record) => {
      return (
        <span
          style={{ color: record.career_address === Mage ? "red" : "black" }}
        >
          {record.brains}
          {record.career_address === Mage ? "(主)" : ""}
        </span>
      );
    },
  },
  {
    title: "精神",
    dataIndex: "charm",
    width: 60,
    sorter: (a, b) => a.charm - b.charm,
    render: (text, record) => {
      return (
        <span
          style={{ color: record.career_address === Mage ? "red" : "black" }}
        >
          {record.charm}
          {record.career_address === Mage ? "(副)" : ""}
        </span>
      );
    },
  },
];

const baseMobileColumns = [
  {
    title: "角色",
    dataIndex: "js",
    width: 60,
    render: (text, record) => {
      return <p>{names[record.career_address]}</p>;
    },
  },
  {
    title: "等级",
    dataIndex: "level",
    width: 60,
    sorter: (a, b) => a.level - b.level,
  },
  {
    title: "主属性",
    dataIndex: "m1",
    width: 70,
    render: (text, record) => {
      let value = 0;
      switch (record.career_address) {
        case Robber:
          value = record.agility;
          break;
        case Warrior:
          value = record.strength;
          break;
        case Mage:
          value = record.brains;
          break;
        case Ranger:
          value = record.strength;
          break;
      }
      return <p>{value}</p>;
    },
  },
  {
    title: "副属性",
    dataIndex: "m2",
    width: 70,
    render: (text, record) => {
      let value = 0;
      switch (record.career_address) {
        case Robber:
          value = record.strength;
          break;
        case Warrior:
          value = record.physique;
          break;
        case Mage:
          value = record.charm;
          break;
        case Ranger:
          value = record.agility;
          break;
      }
      return <p>{value}</p>;
    },
  },
];

const markColumn = [
  {
    title: "价格",
    sorter: (a, b) => a.price - b.price,
    render: (text, record) => {
      return <p>{parseInt(record.price) / 1000000000000000000}bnx</p>;
    },
  },
];

const urlColumn = [
  {
    title: "链接",
    render: (text, record) => {
      return (
        <a
          target="_blank"
          href={`https://${
            isMobile() ? "m" : "market"
          }.binaryx.pro/#/oneoffsale/detail/${record.order_id}`}
        >
          详情页
        </a>
      );
    },
  },
];
const addIdColumn = [
  {
    title: "ID",
    dataIndex: "token_id",
    width: 100,
    render: (text, record) => {
      return (
        <p>
          {String(record.token_id).substr(0, 5)}...
          {String(record.token_id).substr(-5, 5)}
        </p>
      );
    },
  },
];
const HegeColumn = [
  {
    title: "",
    dataIndex: "hege",
    width: 40,
    render: (text, record) => {
      let hege = false;
      switch (record.career_address) {
        case Robber:
          hege = filterHegeOne(record, Robber, "agility", "strength");
          break;
        case Ranger:
          hege = filterHegeOne(record, Ranger, "strength", "agility");
          break;
        case Warrior:
          hege = filterHegeOne(record, Warrior, "strength", "physique");
          break;
        case Mage:
          hege = filterHegeOne(record, Mage, "brains", "charm");
          break;
      }
      return (
        <>
          <Tag color={hege ? "green" : "black"}>
            {hege ? (isMobile() ? "🈴️" : "合格") : isMobile() ? "黑" : "黑奴"}
          </Tag>
        </>
      );
    },
  },
];

const BnxTools = () => {
  const { connect, metaState, getAccounts, getChain } = useMetamask();
  const provider = window.ethereum;
  const [address, setAddress] = useState("");
  const [allList, setAllList] = useState([]);
  const [lowPrices, setLowPrices] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [myHeroList, setMyHeroList] = useState([]);
  const [gongzuoList, setGongZuoList] = useState([]);
  const [myCardSelectedList, setMyCardSelectedList] = useState([]);
  const [myWorkCardSelectedList, setMyWorkCardSelectedList] = useState([]);
  const contracts = {};
  const [stime, setStime] = useState(0.17);
  const [deadline, setDeadline] = useState(Date.now() + 0.17 * 1000 * 60);
  const [blocks, setBlocks] = useState([]);
  const [load, setLoad] = useState(false);
  const [jianzhi, setJianzhi] = useState(false); // 兼职按钮
  const [second, setSecond] = useState(false); // 2级工作
  const [work, setWord] = useState(false); // 收菜, 退出工作
  const [heroLoad, setHeroLoad] = useState(false);
  const [workLoad, setWorkLoad] = useState(false);
  const [goldTotal, setGoldTotal] = useState(0);
  const [budgetGoldTotal, setBudgetGoldTotal] = useState(0);
  const [simple, setSimple] = useState(false);
  const [allLoad, setAllLoad] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");
  useEffect(() => {
    getAllMarkCard();
    checkBnxMark();
    onConnnect();
  }, []);

  const onConnnect = async () => {
    provider
      .request({
        method: "wallet_addEthereumChain",
        params: [chain],
      })
      .catch((error) => {});
    if (metaState.isAvailable && !metaState.isConnected) {
      try {
        await connect(Web3);
        const accounts = await getAccounts();
        if (accounts.length > 0) {
          const addr = accounts[0];
          setAddress(addr);
          initContract();

          ƒHero(addr);
          getWordCards(addr);
        }
        const chainId = await getChain();
        if (chainId.id !== network_chainId) {
          return;
        }
        MetaMaskEvent();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const initContract = () => {
    const web3 = initWeb3(Web3.givenProvider);
    contracts.WarriorContract = new web3.eth.Contract(
      hreoAbi,
      Addresss.WarriorAddress
    );
    contracts.RobberContract = new web3.eth.Contract(
      hreoAbi,
      Addresss.RobberAddress
    );
    contracts.MageContract = new web3.eth.Contract(
      hreoAbi,
      Addresss.MageAddress
    );
    contracts.youxiaContract = new web3.eth.Contract(
      hreoAbi,
      Addresss.YXAddress
    );
    contracts.NewPlayInfoContract = new web3.eth.Contract(
      newPlayAbi,
      Addresss.NewPlayInfoAddress
    );
    contracts.MiningContract = new web3.eth.Contract(
      mingAbi,
      Addresss.MiningAddress
    );
    contracts.NewMiningContract = new web3.eth.Contract(
      newmingAbi,
      Addresss.NewMiningAddress
    );
    contracts.LgongContract = new web3.eth.Contract(
      LinggongAbi,
      Addresss.LinggongAddress
    );
    contracts.BlacksmithContract = new web3.eth.Contract(
      BlacksmithAbi,
      Addresss.BlacksmithAddress
    );
    contracts.HunterContract = new web3.eth.Contract(
      HunterAbi,
      Addresss.HunterAddress
    );
    contracts.BookmangerContract = new web3.eth.Contract(
      BookmangerAbi,
      Addresss.BookmangerAddress
    );
    contracts.RangeworkContract = new web3.eth.Contract(
      RangeworkAbi,
      Addresss.RangeworkAddress
    );
  };

  // 工作中的卡
  const getWordCards = (address) => {
    if (!address) {
      message.error("请重新刷新网页");
      return;
    }
    initContract();
    const web3 = initWeb3(Web3.givenProvider);
    const types = [
      gongzuo_type1,
      gongzuo_type2,
      gongzuo_type3,
      gongzuo_type4,
      gongzuo_type5,
      gongzuo_type6,
      gongzuo_type7,
      gongzuo_type8,
    ];
    setWorkLoad(true);
    setGongZuoList([]);
    setBudgetGoldTotal(0);
    setGoldTotal(0);
    setMyWorkCardSelectedList([]);

    const allFetchPromises = types.map((item) => {
      return new Promise((resolve) => {
        fetch(
          `https://game.binaryx.pro/minev2/getWorks?address=${address}&work_type=${item}`
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            const list = res.data.result;
            let nlist = [];
            if (list) {
              nlist = list.map((item) => {
                return {
                  ...item,
                  name: gongzuo_type_zh(item.work_type),
                };
              });
            }
            resolve(nlist);
          });
      });
    });

    Promise.all(allFetchPromises).then((res) => {
      const list = res
        .reduce((pre, item) => {
          return [...pre, ...item];
        }, [])
        .map(async (item) => {
          const work = await (item.name === "兼职"
            ? contracts.MiningContract
            : contracts.NewMiningContract
          ).methods
            .getPlayerWork(item.token_id)
            .call();
          // console.log(item.token_id, work)
          const info = await contracts.NewPlayInfoContract.methods
            .getPlayerInfoBySet(item.token_id)
            .call();
          const endtime = await web3.eth.getBlockNumber();
          let typeContract;
          switch (item.name) {
            case "兼职":
              typeContract = contracts.LgongContract;
              break;
            case "兼职":
              typeContract = contracts.LgongContract;
              break;
            case "伐木":
              typeContract = contracts.BlacksmithContract;
              break;
            case "酿酒":
              typeContract = contracts.HunterContract;
              break;
            case "卷轴":
              typeContract = contracts.BookmangerContract;
              break;
            case "打猎":
              typeContract = contracts.RangeworkContract;
              break;
            default:
              typeContract = contracts.LgongContract;
              break;
          }
          const gold = await typeContract.methods
            .getIncome(info[0], work.startTime, endtime + "")
            .call();
          //   console.log(gold)
          return {
            career_address: info[1],
            strength: Number(info[0][0]),
            agility: Number(info[0][1]),
            physique: Number(info[0][2]),
            volition: Number(info[0][3]),
            brains: Number(info[0][4]),
            charm: Number(info[0][5]),
            level: Number(info[0][6]),
            total:
              Number(info[0][0]) +
              Number(info[0][1]) +
              Number(info[0][2]) +
              Number(info[0][3]) +
              Number(info[0][4]) +
              Number(info[0][5]),
            token_id: item.token_id,
            workname: item.name,
            gold: Number(gold / 1000000000000000000).toFixed(2),
          };
        });
      Promise.all(list).then((res) => {
        setWorkLoad(false);
        setGongZuoList(res);
        const total = res.reduce((pre, item) => {
          return Number(pre) + Number(item.gold);
        }, 0);
        const hgtotal = res.reduce((pre, item) => {
          let hege = false;
          switch (item.career_address) {
            case Robber:
              hege = filterHegeOne(item, Robber, "agility", "strength");
              break;
            case Ranger:
              hege = filterHegeOne(item, Ranger, "strength", "agility");
              break;
            case Warrior:
              hege = filterHegeOne(item, Warrior, "strength", "physique");
              break;
            case Mage:
              hege = filterHegeOne(item, Mage, "brains", "charm");
              break;
          }
          if (hege && item.level >= 2) {
            let value = 0;
            switch (item.career_address) {
              case Robber:
                value = item.agility;
                break;
              case Ranger:
                value = item.strength;
                break;
              case Warrior:
                value = item.strength;
                break;
              case Mage:
                value = item.brains;
                break;
            }
            const mainValue =
              Number(prices[value]) * Number(multiples[item.level]);
            return pre + mainValue;
          }
          return pre + 288;
        }, 0);
        setBudgetGoldTotal(hgtotal);
        setGoldTotal(total);
      });
    });
  };

  const getOneCard = () => {
    if (!address) {
      message.error("请重新刷新网页");
      return;
    }
    initContract();
    contracts.NewPlayInfoContract.methods
      .batchNewPlayer(1, "1000000000000000000")
      .send({
        from: address,
      })
      .then(() => ƒHero(address));
  };

  const getFiveCard = () => {
    if (!address) {
      message.error("请重新刷新网页");
      return;
    }
    initContract();
    for (let index = 0; index < 5; index++) {
      contracts.NewPlayInfoContract.methods
        .batchNewPlayer(1, "1000000000000000000")
        .send({
          from: address,
        })
        .then(() => ƒHero(address));
    }
  };

  const ƒHero = async (address) => {
    if (!address) {
      message.error("请重新刷新网页");
      return;
    }
    initContract();
    setMyHeroList([]);
    setHeroLoad(true);
    setJianzhi(false);
    setSecond(false);
    setMyCardSelectedList([]);
    const warrs = await contracts.WarriorContract.methods
      .balanceOf(address)
      .call();
    const robbers = await contracts.RobberContract.methods
      .balanceOf(address)
      .call();
    const mages = await contracts.MageContract.methods
      .balanceOf(address)
      .call();
    const youxias = await contracts.youxiaContract.methods
      .balanceOf(address)
      .call();
    const promises = [];
    for (let index = 0; index < warrs; index++) {
      promises.push(
        contracts.WarriorContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
      );
    }
    for (let index = 0; index < robbers; index++) {
      promises.push(
        contracts.RobberContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
      );
    }
    for (let index = 0; index < mages; index++) {
      promises.push(
        contracts.MageContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
      );
    }
    for (let index = 0; index < youxias; index++) {
      promises.push(
        contracts.youxiaContract.methods
          .tokenOfOwnerByIndex(address, index)
          .call()
      );
    }

    Promise.all(promises).then((res) => {
      const list = res.map(async (id) => {
        const info = await contracts.NewPlayInfoContract.methods
          .getPlayerInfoBySet(id)
          .call();
        return {
          career_address: info[1],
          strength: Number(info[0][0]),
          agility: Number(info[0][1]),
          physique: Number(info[0][2]),
          volition: Number(info[0][3]),
          brains: Number(info[0][4]),
          charm: Number(info[0][5]),
          level: Number(info[0][6]),
          total:
            Number(info[0][0]) +
            Number(info[0][1]) +
            Number(info[0][2]) +
            Number(info[0][3]) +
            Number(info[0][4]) +
            Number(info[0][5]),
          token_id: id,
        };
      });
      Promise.all(list).then((res) => setMyHeroList(res));
      setHeroLoad(false);
    });
  };

  const MetaMaskEvent = () => {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setAddress(accounts[0]);
      }
    });
    window.ethereum.on("chainChanged", (chainId) => {
      if (chainId !== chain.chainId) {
      }
    });
  };

  const getAllMarkCard = () => {
    setLoad(true);
    try {
      fetch(MarkUrl)
        .then((res) => res.json())
        .then((res) => {
          const lists = res.data.result.items;
          setAllList(lists);
          getLowPrices(lists);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const getLowPrices = (allList) => {
    const attrs = [86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
    const lowPrices = attrs.map((attr) => {
      return [
        ...filterHege(allList, Robber, "agility", "strength", attr),
        ...filterHege(allList, Ranger, "strength", "agility", attr),
        ...filterHege(allList, Warrior, "strength", "physique", attr),
        ...filterHege(allList, Mage, "brains", "charm", attr),
      ]
        .filter((item) => {
          return (
            item.agility === attr ||
            item.strength === attr ||
            item.brains === attr ||
            item.physique === attr
          );
        })
        .sort((a, b) => parseInt(a.price) - parseInt(b.price))[0];
    });
    setLowPrices(lowPrices);
  };

  const onSearchFormFinish = (values) => {
    const list = allList
      .filter((item) => {
        if (values.zy === "全部职业") return true;
        return item.career_address == values.zy;
      })
      .filter((item) => {
        if (values.dj === "全部等级") return true;
        return item.level == values.dj;
      })
      .filter((item) => {
        if (simple) {
          return switchCareer(
            values.zy === "全部职业" ? item.career_address : values.zy,
            item,
            values.m,
            values.c
          );
        }
        return (
          item.strength >= values.m &&
          item.agility >= values.c &&
          item.physique >= values.t3 &&
          item.volition >= values.t4 &&
          item.brains >= values.t5 &&
          item.charm >= values.t6
        );
      });
    setSearchList(list);
  };

  const switchCareer = (type, item, m, c) => {
    switch (type) {
      case Robber:
        return (
          item.career_address === Robber &&
          item.agility >= m &&
          item.strength >= c
        );
      case Ranger:
        return (
          item.career_address === Ranger &&
          item.strength >= m &&
          item.agility >= c
        );
      case Warrior:
        return (
          item.career_address === Warrior &&
          item.strength >= m &&
          item.physique >= c
        );
      case Mage:
        return (
          item.career_address === Mage && item.brains >= m && item.charm >= c
        );
    }
  };

  const toJianZhi = () => {
    if (!address) {
      message.error("请重新刷新网页");
      return;
    }
    initContract();
    myCardSelectedList.forEach((item) => {
      contracts.MiningContract.methods
        .work(Addresss.LinggongAddress, item.token_id)
        .send({
          from: address,
        })
        .then(() => ƒHero(address));
    });
  };

  const toTransfer = () => {
    if (!address) {
      message.error("请重新刷新网页");
      return;
    }
    if (transferAddress === "") {
      message.info("地址不能为空");
      return;
    }
    if (myCardSelectedList.length === 0) {
      message.info("请选择你要转移的卡");
      return;
    }
    initContract();
    myCardSelectedList.forEach((item) => {
      let typeContract;
      switch (item.career_address) {
        case Warrior:
          typeContract = contracts.WarriorContract;
          break;
        case Robber:
          typeContract = contracts.RobberContract;
          break;
        case Mage:
          typeContract = contracts.MageContract;
          break;
        case Ranger:
          typeContract = contracts.youxiaContract;
          break;
      }
      typeContract.methods
        .transferFrom(address, transferAddress, item.token_id)
        .send({
          from: address,
        })
        .then(() => ƒHero(address));
    });
  };

  const toSecond = () => {
    if (!address) {
      message.error("请重新刷新网页");
      return;
    }
    message.info("系统将自动分派参与符合工作的卡");
    initContract();
    myCardSelectedList.forEach((item) => {
      let workAddress = "";
      switch (item.career_address) {
        case Robber:
          workAddress = "0x480d503B12ae928e8DcCd820CE45B2f6F39Ad598";
          break;
        case Ranger:
          workAddress = "0x81E9aCe9511A7d56fd31940d1C49425CA3a2B8f8";
          break;
        case Warrior:
          workAddress = "0x3a4D27B77B253bdb9AFec082D8f5cDE5A4D713E1";
          break;
        case Mage:
          workAddress = "0x21D4Da5833d93944B8340788C6b463ED8420838B";
          break;
      }
      contracts.NewMiningContract.methods
        .work(workAddress, item.token_id)
        .send({
          from: address,
        })
        .then(() => ƒHero(address));
    });
  };
  const ds = (number) => {
    return () => {
      const web3 = initWeb3(Web3.givenProvider);
      web3.eth
        .sendTransaction(
          {
            from: address,
            to: "0x3B0D325D60b288139535e8Ee772d9e22E140444F",
            value: `${number * 1000000000000000000}`,
          },
          (err, hash) => {}
        )
        .then((result) => {
          message.success("感谢大佬");
        })
        .catch(() => {});
    };
  };

  const quitWork = (all) => {
    return () => {
      if (!address) {
        message.error("请重新刷新网页");
        return;
      }
      initContract();
      (all ? gongzuoList : myWorkCardSelectedList).forEach((item) => {
        if (item.workname === "兼职") {
          contracts.MiningContract.methods
            .quitWork(item.token_id)
            .send({ from: address })
            .then(() => getWordCards(address));
        } else {
          contracts.NewMiningContract.methods
            .quitWork(item.token_id)
            .send({ from: address })
            .then(() => getWordCards(address));
        }
      });
    };
  };

  const getGold = (all, type = 0) => {
    return () => {
      if (!address) {
        message.error("请重新刷新网页");
        return;
      }
      initContract();
      if (type === 1) {
        const a = gongzuoList.filter((item) => item.workname !== "兼职");
        if (a.length === 0) {
          message.error("你没有黑奴可收");
          return;
        }
        a.forEach((item) => {
          if (item.workname === "兼职") {
            contracts.MiningContract.methods
              .getAward(item.token_id)
              .send({ from: address })
              .then(() => getWordCards(address));
          }
        });
      } else if (type === 2) {
        const x = gongzuoList.filter((item) => item.workname !== "兼职");
        if (x.length === 0) {
          message.error("你没有合格可收");
          return;
        }
        x.forEach((item) => {
          if (item.workname !== "兼职") {
            contracts.NewMiningContract.methods
              .getAward(item.token_id)
              .send({ from: address })
              .then(() => getWordCards(address));
          }
        });
      } else {
        (all ? gongzuoList : myWorkCardSelectedList).forEach((item) => {
          if (item.workname === "兼职") {
            contracts.MiningContract.methods
              .getAward(item.token_id)
              .send({ from: address })
              .then(() => getWordCards(address));
          } else {
            contracts.NewMiningContract.methods
              .getAward(item.token_id)
              .send({ from: address })
              .then(() => getWordCards(address));
          }
        });
      }
    };
  };

  const onChange = (checked) => {
    setSimple(checked);
  };

  const checkBnxMark = () => {
    setAllLoad(true);
    try {
      fetch(MarkUrl)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const items = res.data.result.items;
          setAllList(items);
          getLowPrices(items);
          const hgs = items.filter((item) => {
            return parseInt(item.price) <= 440000000000000000;
          });
          setBlocks(hgs);
          setAllLoad(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      setAllLoad(false);
    }
  };

  const setAutoLoading = (time) => {
    checkBnxMark();
    setStime(time);
    setDeadline(Date.now() + time * 1000 * 60);
  };

  return (
    <BnxToolFrame>
      <Header>
        <HeaderTools>
          <img src={faviconPng} />
          <HeaderTitle>大鸟工具</HeaderTitle>
          <Buttons>
            <CButton
              type="primary"
              style={{ width: 100, padding: 0 }}
              danger
              onClick={ds(0.02)}
            >
              打赏0.02BNB
            </CButton>
            <CButton
              type="primary"
              style={{ width: 100, padding: 0 }}
              danger
              onClick={ds(0.04)}
            >
              打赏0.04BNB
            </CButton>
            <CButton
              type="primary"
              style={{ width: 100, padding: 0 }}
              danger
              onClick={ds(0.08)}
            >
              打赏0.08BNB
            </CButton>
          </Buttons>
        </HeaderTools>
        {
          //   "祝各位老板发大财, 天天都是400+, 赚钱了记得支持一下小弟, 这是小弟的地址: 0x3B0D325D60b288139535e8Ee772d9e22E140444F"
        }
      </Header>
      <Main>
        <Alert
          message="遇见数据不显示的情况, 请切换你科学的节点, 官方屏蔽了部分区域"
          type="warning"
          closable
        />
        <TableFrame>
          <TableHeader>
            <h3 id="menu1">当前钱包</h3>
            {address}
            {/* <Buttons>
              <CButton type="primary" size="middle" onClick={getOneCard}>
                抽一次
              </CButton>
              <CButton type="primary" size="middle" onClick={getFiveCard}>
                抽五次
              </CButton>
            </Buttons> */}
          </TableHeader>
        </TableFrame>
        <TableFrame>
          <TableHeader>
            <h3 id="menu2">我的英雄</h3>
            <Buttons>
              <Input
                placeholder="需要转移卡的地址"
                style={{ width: 200, height: 30 }}
                onChange={(e) => setTransferAddress(e.target.value)}
              />
              <Popconfirm
                placement="rightBottom"
                title={`请确认你是否将你的卡片转移到${transferAddress}这个地址下`}
                onConfirm={toTransfer}
                okText="确认转移"
                cancelText="再想想"
              >
                <CButton type="primary" size="middle">
                  转移
                </CButton>
              </Popconfirm>

              <CButton
                type="primary"
                size="middle"
                disabled={!jianzhi}
                onClick={toJianZhi}
              >
                兼职工作
              </CButton>
              <CButton
                type="primary"
                size="middle"
                disabled={!second}
                onClick={toSecond}
              >
                2级工作
              </CButton>
              {/* <CButton type="primary" size="middle" disabled>
                5级工作
              </CButton>
              <CButton type="primary" size="middle" disabled>
                6级工作
              </CButton>
              <CButton type="primary" size="middle" disabled>
                7级工作
              </CButton> */}
              <CButton
                type="primary"
                size="middle"
                onClick={() => ƒHero(address)}
              >
                刷新
              </CButton>
            </Buttons>
            {myCardSelectedList.length > 0 ? (
              <Buttons>
                <p>已选中: {myCardSelectedList.length}</p>
                <Button type="text" onClick={() => setMyCardSelectedList([])}>清除选中</Button>
              </Buttons>
            ) : (
              <></>
            )}
          </TableHeader>

          <CTable
            loading={heroLoad}
            rowKey={(record) => record.token_id}
            rowSelection={{
              selectedRows: myCardSelectedList,
              onChange: (selectedRowKeys, selectedRows) => {
                setJianzhi(selectedRows.length > 0);
                const hei = selectedRows.filter((record) => {
                  let hege = false;
                  switch (record.career_address) {
                    case Robber:
                      hege =
                        filterHegeOne(record, Robber, "agility", "strength") &&
                        record.level > 1;
                    case Ranger:
                      hege =
                        filterHegeOne(record, Ranger, "strength", "agility") &&
                        record.level > 1;
                    case Warrior:
                      hege =
                        filterHegeOne(
                          record,
                          Warrior,
                          "strength",
                          "physique"
                        ) && record.level > 1;
                    case Mage:
                      hege =
                        filterHegeOne(record, Mage, "brains", "charm") &&
                        record.level > 1;
                  }
                  return hege === false;
                });
                if (selectedRows.length > 0) {
                  setSecond(hei.length === 0);
                }
                setMyCardSelectedList(selectedRows);
              },
            }}
            bordered={false}
            pagination={false}
            columns={[
              ...(isMobile() ? [] : addIdColumn),
              ...HegeColumn,
              ...(isMobile() ? baseMobileColumns : baseColumns),
            ]}
            dataSource={myHeroList}
            size="small"
          />
        </TableFrame>
        <TableFrame>
          <TableHeader>
            <h3 id="menu3">日常挖矿</h3>
            <Buttons>
              <CButton
                type="primary"
                size="middle"
                disabled={!work}
                onClick={getGold(false)}
              >
                收菜
              </CButton>
              <CButton
                type="primary"
                size="middle"
                disabled={!work}
                onClick={quitWork(false)}
              >
                退出工作
              </CButton>
              <CButton type="primary" size="middle" onClick={getGold(true, 1)}>
                收全黑菜
              </CButton>
              <CButton type="primary" size="middle" onClick={getGold(true, 2)}>
                收全合格菜
              </CButton>
              <CButton type="primary" size="middle" onClick={getGold(true)}>
                收全部菜
              </CButton>
              <CButton type="primary" size="middle" onClick={quitWork(true)}>
                全部退出工作
              </CButton>
              <CButton
                type="primary"
                size="middle"
                onClick={() => getWordCards(address)}
              >
                刷新
              </CButton>
            </Buttons>
            {myWorkCardSelectedList.length > 0 ? (
              <Buttons>
                <p>已选中: {myWorkCardSelectedList.length}</p>
                <Button type="link" onClick={() => setMyWorkCardSelectedList([])}>清除选中</Button>
              </Buttons>
            ) : (
              <></>
            )}
            <Space>
              <p>挖矿卡片数量:{gongzuoList.length}</p>
              <p>每日预计收益:{budgetGoldTotal}</p>
              <p>挖矿总收益: {goldTotal.toFixed(2)}</p>
            </Space>
          </TableHeader>

          <CTable
            loading={workLoad}
            rowKey={(record) => record.token_id}
            rowSelection={{
              selectedRows: myWorkCardSelectedList,
              onChange: (selectedRowKeys, selectedRows) => {
                setWord(selectedRows.length > 0);
                setMyWorkCardSelectedList(selectedRows);
              },
            }}
            bordered={false}
            columns={[
              ...(isMobile() ? [] : addIdColumn),
              ...HegeColumn,
              ...(isMobile() ? baseMobileColumns : baseColumns),
              ...workColumn,
            ]}
            dataSource={gongzuoList}
            size="small"
          />
        </TableFrame>
        <TableFrame>
          <TableHeader>
            <h3 id="menu4">卡片筛选</h3>
            {isMobile() ? (
              <></>
            ) : (
              <Switch
                onChange={onChange}
                checkedChildren="简洁搜索"
                unCheckedChildren="简洁搜索"
                style={{ margin: 10 }}
              />
            )}
            <Form
              onFinish={onSearchFormFinish}
              layout="inline"
              style={{ alignItems: "center" }}
              initialValues={{
                dj: "全部等级",
                zy: "全部职业",
                m: 50,
                c: 50,
                t3: 50,
                t4: 50,
                t5: 50,
                t6: 50,
              }}
            >
              <Form.Item name="zy" label="职业">
                <Select name="zy" style={{ width: 100 }} style={{ width: 75 }}>
                  <Select.Option value="全部职业">职业</Select.Option>
                  <Select.Option value={Robber}>{names[Robber]}</Select.Option>
                  <Select.Option value={Warrior}>
                    {names[Warrior]}
                  </Select.Option>
                  <Select.Option value={Mage}>{names[Mage]}</Select.Option>
                  <Select.Option value={Ranger}>{names[Ranger]}</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="dj" label="等级">
                <Select name="dj" style={{ width: 100 }} style={{ width: 75 }}>
                  <Select.Option value="全部等级">等级</Select.Option>
                  <Select.Option value="1">L1</Select.Option>
                  <Select.Option value="2">L2</Select.Option>
                  <Select.Option value="3">L3</Select.Option>
                  <Select.Option value="4">L4</Select.Option>
                  <Select.Option value="5">L5</Select.Option>
                  <Select.Option value="6">L6</Select.Option>
                  <Select.Option value="7">L7</Select.Option>
                  <Select.Option value="8">L8</Select.Option>
                  <Select.Option value="9">L9</Select.Option>
                  <Select.Option value="10">L10</Select.Option>
                </Select>
              </Form.Item>
              {simple || isMobile() ? (
                <>
                  <Form.Item name="m" label="主属性">
                    <InputNumber
                      name="m"
                      min={0}
                      max={100}
                      size="middle"
                      style={{ width: 60 }}
                    />
                  </Form.Item>
                  <Form.Item name="c" label="附属性">
                    <InputNumber
                      name="c"
                      min={0}
                      max={100}
                      size="middle"
                      style={{ width: 60 }}
                    />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item name="m" label="力量">
                    <InputNumber
                      name="m"
                      min={0}
                      max={100}
                      size="middle"
                      style={{ width: 43 }}
                    />
                  </Form.Item>
                  <Form.Item name="c" label="敏捷">
                    <InputNumber
                      name="c"
                      min={0}
                      max={100}
                      size="middle"
                      style={{ width: 43 }}
                    />
                  </Form.Item>
                  <Form.Item name="t3" label="体质">
                    <InputNumber
                      name="t3"
                      min={0}
                      max={100}
                      size="middle"
                      style={{ width: 43 }}
                    />
                  </Form.Item>
                  <Form.Item name="t4" label="意志">
                    <InputNumber
                      name="t4"
                      min={0}
                      max={100}
                      size="middle"
                      style={{ width: 43 }}
                    />
                  </Form.Item>
                  <Form.Item name="t5" label="智力">
                    <InputNumber
                      name="t5"
                      min={0}
                      max={100}
                      size="middle"
                      style={{ width: 43 }}
                    />
                  </Form.Item>
                  <Form.Item name="t6" label="精神">
                    <InputNumber
                      name="t6"
                      min={0}
                      max={100}
                      size="middle"
                      style={{ width: 43 }}
                    />
                  </Form.Item>
                </>
              )}
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Form.Item>
            </Form>
          </TableHeader>

          <CTable
            // loading={load || allLoad}
            rowKey={(record) => record.order_id}
            bordered={false}
            columns={[
              ...(isMobile() ? [] : addIdColumn),
              ...(isMobile() ? baseMobileColumns : baseColumns),
              ...markColumn,
              ...urlColumn,
            ]}
            dataSource={searchList}
            size="small"
          />
        </TableFrame>
        <TableFrame>
          <TableHeader>
            <h3 id="menu5">捡漏区域</h3>
            <p>价格低于0.44bnx的黑卡</p>
            <Buttons>
              <CButton type="primary" onClick={checkBnxMark}>
                手动扫描
              </CButton>
              <CButton type="primary" onClick={() => setAutoLoading(10)}>
                10分钟扫描
              </CButton>
              <CButton type="primary" onClick={() => setAutoLoading(5)}>
                5分钟扫描
              </CButton>
              <CButton type="primary" onClick={() => setAutoLoading(2)}>
                2分钟扫描
              </CButton>
              <CButton type="primary" onClick={() => setAutoLoading(1)}>
                1分钟扫描
              </CButton>
              <CButton type="primary" onClick={() => setAutoLoading(0.5)}>
                30秒扫描
              </CButton>
              <CButton type="primary" onClick={() => setAutoLoading(0.17)}>
                10秒扫描
              </CButton>
            </Buttons>
            <Countdown
              title={`当前自动刷新中, 离下一次刷新还有`}
              value={deadline}
              format="mm分ss秒SSS毫秒"
              onFinish={() => {
                setAutoLoading(stime);
              }}
            />
          </TableHeader>

          <CTable
            rowKey={(record) => record.order_id}
            bordered={false}
            loading={allLoad}
            columns={[
              ...(isMobile() ? [] : addIdColumn),
              ...(isMobile() ? baseMobileColumns : baseColumns),
              ...markColumn,
              ...urlColumn,
            ]}
            pagination={false}
            dataSource={blocks}
            size="small"
          />
        </TableFrame>
        <TableFrame>
          <TableHeader>
            <h3 id="menu6">合格卡地板价</h3>
          </TableHeader>

          <CTable
            // loading={allLoad}
            rowKey={(record) => record.order_id}
            bordered={false}
            columns={[
              ...(isMobile() ? [] : addIdColumn),
              ...(isMobile() ? baseMobileColumns : baseColumns),
              ...markColumn,
              ...urlColumn,
            ]}
            pagination={false}
            dataSource={lowPrices}
            size="small"
          />
        </TableFrame>
      </Main>
      <Anchor
        targetOffset={100}
        style={{
          position: "fixed",
          visibility: isMobile() ? "hidden" : "visible",
          zIndex: 100,
          top: 0,
          left: 10,
          marginTop: 100,
        }}
      >
        <Link href="#menu1" title="当前钱包" />
        <Link href="#menu2" title="我的英雄" />
        <Link href="#menu3" title="日常挖矿" />
        <Link href="#menu4" title="卡片筛选" />
        <Link href="#menu5" title="捡漏" />
        <Link href="#menu6" title="合格卡地板价" />
      </Anchor>
      <BackTop />
    </BnxToolFrame>
  );
};

export default BnxTools;
