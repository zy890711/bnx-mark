import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useMetamask } from "use-metamask";
import Web3 from "web3";
import mint from "./mint.json";

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

const AppFrame = styled.div`
  width: 100%;
  padding: 20px 50px;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 2px;
  }
`;

const OptFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CButton = styled(Button)`
  min-width: 50px;
`;

const CCButton = styled(Button)`
  min-width: 50px;
  margin: 5px;
`;

const CCTable = styled(Table)`
  width: 345px;
  margin: 5px;
`;

const CCAllTable = styled(Table)`
  width: 100%;
  margin: 5px;
`;

const Robber = "0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3";
const Warrior = "0x22F3E436dF132791140571FC985Eb17Ab1846494";
const Mage = "0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44";
const Ranger = "0xF31913a9C8EFE7cE7F08A1c08757C166b572a937";
const names = {
  [Robber]: "盗贼",
  [Warrior]: "战士",
  [Mage]: "法师",
  [Ranger]: "游侠",
};
const a = {
  PlayInfoAddress: "0x210d87BA2990082FF22eA15396303382B1FaEA56",
  NewPlayInfoAddress: "0x210d87BA2990082FF22eA15396303382B1FaEA56",
  MiningAddress: "0xe278BDF4541cc309b379F9A4E867F60fD6B7BC59",
  NewMiningAddress: "0x698E165F2897e4daC68671c4cDFf337bbC543767",
  BscAddress: "0x8C851d1a123Ff703BD1f9dabe631b69902Df5f97",
  NewtokenAddress: "0xb3a6381070B1a15169DEA646166EC0699fDAeA79",
  WarriorAddress: "0x22F3E436dF132791140571FC985Eb17Ab1846494",
  RobberAddress: "0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3",
  MageAddress: "0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44",
  RangerAddress: "0xF31913a9C8EFE7cE7F08A1c08757C166b572a937",
  DatieAddress: "0x4713A70db9AD47780EFC3300c08C17c4013DCa57",
  BulieAddress: "0x8B2DF673a3313BB3c0A03A154D9fFECbB2cCF26F",
  TushuAddress: "0x0594522127B6276C001554C15b900166BD98eC0E",
  LinggongAddress: "0xfA65a5751ef6079C1022Aa10b9163d7A2281360A",
  blacksmithAddress: "0x3a4D27B77B253bdb9AFec082D8f5cDE5A4D713E1",
  hunterAddress: "0x480d503B12ae928e8DcCd820CE45B2f6F39Ad598",
  bookmangerAddress: "0x21D4Da5833d93944B8340788C6b463ED8420838B",
  RangeworkAddress: "0x81E9aCe9511A7d56fd31940d1C49425CA3a2B8f8",
  GaojiAddress: "0xC5dDbb4ac27A939D914059A023C6A35F377B67Ff",
  SixthAddress: "0xdcC5C1e7A3ADC8b7635565183a7385026502440B",
  SeventhAddress: "0x0ac4eB7978E0dA0d53824bd590354C8Bd264C4e6",
  poolAddress: "0xB84A69Ef7c5c823707b2Ba7bc23faA40f33242d1",
  poolV2Address: "0x8dFe5535576C720896E98b9c9DBAf81eE03eA903",
  routerpath: "0xA92FE30CBB04fB647068e13208F5Ecd4EA52FF8d",
  USDTAddress: "0x55d398326f99059fF775485246999027B3197955",
  gameManager: "0xA100C0f774Ed525C186e6BeCDa88812427e1742d",
  FeeAddress: "0x092092Ec06C5D06775249c689AaD880336dD5c8e",
};

const gongzuo = `https://game.binaryx.pro/minev2/getWorks?address=&work_type=`;
const gongzuo_type1 = `0xfA65a5751ef6079C1022Aa10b9163d7A2281360A`; //兼职工作
const gongzuo_type2 = `0x480d503B12ae928e8DcCd820CE45B2f6F39Ad598`; //酿酒
const gongzuo_type3 = `0x3a4D27B77B253bdb9AFec082D8f5cDE5A4D713E1`; //伐木
const gongzuo_type4 = `0x0594522127B6276C001554C15b900166BD98eC0E`; //卷轴抄录
const gongzuo_type5 = `0x81E9aCe9511A7d56fd31940d1C49425CA3a2B8f8`; //打猎
const gongzuo_type6 = `0xC5dDbb4ac27A939D914059A023C6A35F377B67Ff`; //皇室守卫
const gongzuo_type7 = `0xdcC5C1e7A3ADC8b7635565183a7385026502440B`; //军团士兵
const gongzuo_type8 = `0x0ac4eB7978E0dA0d53824bd590354C8Bd264C4e6`; //皇室顾问

const gongzuo_type_zh = (type) => {
  switch (type) {
    case gongzuo_type1:
      return "兼职工作";
    case gongzuo_type2:
      return "酿酒";
    case gongzuo_type3:
      return "伐木";
    case gongzuo_type4:
      return "卷轴抄录";
    case gongzuo_type5:
      return "打猎";
    case gongzuo_type6:
      return "皇室守卫";
    case gongzuo_type7:
      return "军团士兵";
    case gongzuo_type8:
      return "皇室顾问";
  }
};

function NewApp() {
  const { connect, metaState, getAccounts } = useMetamask();
  const provider = window.ethereum;
  const [address, setAddress] = useState("");
  const [gongzuos, setGongzuos] = useState([]);
  const [wallet, setWallet] = useState({ money: 0, coin: 0, coupon: 0 });
  const [loglist, setLoglist] = useState([]);
  const [fubenList, setFubenlist] = useState([]);

  useEffect(() => {
    onConnnect();
  });

  // 我的英雄

  const getMyCards = () => {
    
  }

  // 副本列表
  const getFubenlist = () => {
    fetch(
      "https://game.binaryx.pro//v1/dungeon/list?Page=1&Limit=3&lang=zh-cn&sign=ee05987d4d4e2c7bb18c2aa1858617a5",
      { method: "POST" }
    )
      .then((res) => res.json())
      .then((res) => setFubenlist(res.data.Lists));
  };

  // 冒险奖励记录
  const getWallet = (address) => {
    fetch(
      `https://game.binaryx.pro/v1/user/wallet?GoldAddress=${address}&lang=zh-cn&sign=276bf144d035ba5f5ed0f52e06dfb9a4`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setWallet(res.data.data);
      });
  };

  // 副本记录
  const getLoglist = (address) => {
    fetch(
      `https://game.binaryx.pro/v1/dungeon/loglist?Page=1&GoldAddress=${address}&Limit=100&lang=zh-cn&sign=4b71493003083bd0bbc252879b6357ff`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setLoglist(res.data.Lists);
      });
  };


  // 工作中的卡
  const getWordCards = (address) => {
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

    const allFetchPromises = types.map((item) => {
      return new Promise((resolve) => {
        fetch(
          `https://game.binaryx.pro/minev2/getWorks?address=${address}&work_type=${item}`
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            resolve({
              list: res.data.result ?? [],
              name: gongzuo_type_zh(item),
              num: res.data.result?.length ?? 0,
            });
          });
      });
    });

    Promise.all(allFetchPromises).then((res) => {
      setGongzuos(res);
    });
  };

  // 获取金币
  const getGold = (list) => {
    return () => {
      try {
        const web3 = initWeb3(Web3.givenProvider);
        const myContract = new web3.eth.Contract(mint, a.MiningAddress, {
          from: address,
        });
        list.forEach((item) => {
          myContract.methods.getAward(item.token_id).send({
            from: address,
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

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
          getWordCards(addr);
          getWallet(addr);
          getLoglist(addr);
          getFubenlist();
        }
        MetaMaskEvent();
      } catch (error) {
        console.log(error);
      }
    }
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

  // 副本记录
  const loglistColumns = [
    {
      title: "",
      dataIndex: "win",
      render: (text) => {
        return <span>{text === 1 ? "胜利" : "失败"}</span>;
      },
    },
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "地牢",
      dataIndex: "lv",
    },
    {
      title: "角色",
      dataIndex: "p_role",
      render: (text) => {
        return <span>{names[text]}</span>;
      },
    },
    {
      title: "等级",
      dataIndex: "p_lv",
    },
    {
      title: "杀敌",
      dataIndex: "m_name",
    },
    {
      title: "奖励",
      dataIndex: "jl",
      render: (text, record) => {
        return (
          <span>
            {`${record.r_money}个金币\n${record.r_coupon}个铁质钥匙\n${record.r_coin}个BNX`}
          </span>
        );
      },
    },
  ];

  // 挖矿
  const richangColumns = [
    {
      title: "类型",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "数量",
      dataIndex: "num",
      key: "name",
    },
    {
      title: "操作",
      key: "opt",
      render: (text, record) => {
        return (
          <>
            <CButton type="primary" size="small" onClick={getGold(record.list)}>
              收菜
            </CButton>
          </>
        );
      },
    },
  ];


  const fubenlistColumns = [
    {
      title: "等级",
      dataIndex: "lv",
    },
    {
      title: "金币",
      dataIndex: "money",
    },
    {
      title: "BNX",
      dataIndex: "coin",
    },
    {
      title: "选择英雄",
      dataIndex: "cards",
    },
  ];

  return (
    <AppFrame>
      <div>当前地址: {address}</div>
      {/* <OptFrame>
        <CCButton type="primary">收冒险奖励</CCButton>
        <CCButton type="primary">收挖矿奖励</CCButton>
      </OptFrame>
      <OptFrame>
        {fubenList?.map((item) => {
          return (
            <CCTable
              rowKey={(record) => record.lv}
              bordered={true}
              columns={fubenlistColumns}
              dataSource={item.costs}
              title={() => `${item.name}  ${item.desc}`}
              size="small"
              pagination={false}
              loading={item.status === 0}
            />
          );
        })}
      </OptFrame> */}
      <CCAllTable
        rowKey={(record) => record.uuid}
        bordered={true}
        columns={loglistColumns}
        dataSource={loglist}
        title={() =>
          `冒险记录[BNX: ${wallet.money}  -  金币: ${wallet.coin}  -  铁质钥匙: ${wallet.coupon}]`
        }
        size="small"
        pagination={{pageSize: 5}}
      />
      <CCTable
        rowKey={(record) => record.name}
        bordered={true}
        columns={richangColumns}
        dataSource={gongzuos}
        title={() => "日常挖矿"}
        size="small"
        pagination={false}
      />
    </AppFrame>
  );
}

export default NewApp;
