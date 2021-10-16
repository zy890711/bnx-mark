import {
  Button,
  Table,
  Switch,
  Statistic,
  Form,
  Select,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MagePng from "./img/role_Mage.png";
import RangerPng from "./img/role_Ranger.png";
import RobberPng from "./img/role_Robber.png";
import WarriorPng from "./img/role_Warrior.png";
import { useMetamask } from "use-metamask";
import Web3 from "web3";

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

const { Countdown } = Statistic;
const AppFrame = styled.div`
  width: 100%;
  padding: 20px 50px;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 2px;
  }
`;

const BnxFrame = styled.div`
  heigth: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const OptFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const CTable = styled(Table)`
  width: 40%;
  margin: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CCTable = styled(Table)`
  width: 100%;
  margin: 5px;
`;

const CFram = styled.div`
  width: 100%;
  margin: 5px;
`;

const CButton = styled(Button)`
  width: 100px;
  margin: 10px 10px 0 0;
`;
const URL =
  "https://www.binaryx.pro/getSales?page=1&page_size=99999&status=selling&name=&sort=price&direction=asc&career=&value_attr=&start_value=&end_value=&pay_addr=";
const Robber = "0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3";
const Warrior = "0x22F3E436dF132791140571FC985Eb17Ab1846494";
const Mage = "0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44";
const Ranger = "0xF31913a9C8EFE7cE7F08A1c08757C166b572a937";
const types = {
  agility: "敏",
  strength: "力",
  physique: "体",
  volition: "意",
  brains: "智",
  charm: "精",
};
const names = {
  [Robber]: "盗贼",
  [Warrior]: "战士",
  [Mage]: "法师",
  [Ranger]: "游侠",
};
function App() {
  const { connect, metaState, getAccounts, getChain } = useMetamask();
  const provider = window.ethereum;
  const [blocks, setBlocks] = useState([]);
  const [stime, setStime] = useState(0.17);
  const [heges, setHeges] = useState([]);
  const [lowPrices, setLowPrices] = useState([]);
  const [switchAuto, setSwitchAuto] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deadline, setDeadline] = useState(Date.now() + 0.17 * 1000 * 60);
  const [autoLink, setAutoLick] = useState(true);
  const [searchList, setSearchList] = useState([]);
  const [allList, setAllList] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    checkBnxMark();
    onConnnect();
  }, []);

  const onConnnect = async () => {
    provider
      .request({
        method: "wallet_addEthereumChain",
        params: [chain],
      })
      .catch((error) => {
        // alert(
        //   "An error has occurred. Please make sure the metamask is ready to go. See error in log"
        // );
      });
    if (metaState.isAvailable && !metaState.isConnected) {
      try {
        await connect(Web3);
        const accounts = await getAccounts();
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
        const chainId = await getChain();
        if (chainId.id !== network_chainId) {
          // alert(
          //   "Manually set the current network to " + chain.nativeCurrency.name
          // );
          return;
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
        // alert(
        //   "Manually set the current network to " + chain.nativeCurrency.name
        // );
      }
    });
  };
  const checkBnxMark = () => {
    setLoading(true);
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res.data.result.items);
        const items = res.data.result.items
          .filter((item) => {
            return item.order_id != "11215";
          })
          .filter((item) => {
            return item.order_id != "48877";
          })
          .filter((item) => item.order_id != "104965");

        setAllList(items);
        const hgs = items.filter((item) => {
          return parseInt(item.price) <= 430000000000000000;
        });
        setBlocks(hgs);

        let agilitys = filterHege(hgs, Robber, "agility", "strength");
        let strengths = filterHege(hgs, Ranger, "strength", "agility");
        let physiques = filterHege(hgs, Warrior, "strength", "physique");
        let brainss = filterHege(hgs, Mage, "brains", "charm");
        let hs = [
          ...new Set([...agilitys, ...strengths, ...physiques, ...brainss]),
        ];
        setHeges(hs);
        // if (autoLink) {
        //   if (hgs.length > 0) {
        //     window.location.href = `https://${
        //       isMobile() ? "m" : "www"
        //     }.binaryx.pro/#/oneoffsale/detail/${hgs[0].order_id}`;
        //   }
        //   if (hs.length > 0) {
        //     window.location.href = `https://${
        //       isMobile() ? "m" : "www"
        //     }.binaryx.pro/#/oneoffsale/detail/${hs[0].order_id}`;
        //   }
        // }
        const attrs = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
        const lowPrices = attrs.map((attr) => {
          return [
            ...filterHege(items, Robber, "agility", "strength", attr),
            ...filterHege(items, Ranger, "strength", "agility", attr),
            ...filterHege(items, Warrior, "strength", "physique", attr),
            ...filterHege(items, Mage, "brains", "charm", attr),
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
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

  const columns = [
    {
      title: "",
      render: (text, record) => {
        return (
          <img style={{ width: "40px" }} src={Pngs(record.career_address)} />
        );
      },
    },
    {
      title: "属性",
      render: (text, record) => {
        const { agility, strength, physique, volition, brains, charm } = record;
        return (
          <p>
            {types.strength}
            {strength}/{types.agility}
            {agility}/{types.physique}
            {physique}/{types.volition}
            {volition}/{types.brains}
            {brains}/{types.charm}
            {charm}
          </p>
        );
      },
    },
    {
      title: "价格",
      render: (text, record) => {
        return <p>{parseInt(record.price) / 1000000000000000000}bnx</p>;
      },
    },
    {
      title: "链接",
      render: (text, record) => {
        return (
          <a
            target="_blank"
            href={`https://${
              isMobile() ? "m" : "www"
            }.binaryx.pro/#/oneoffsale/detail/${record.order_id}`}
          >
            详情页
          </a>
        );
      },
    },
  ];

  const searchColumns = [
    {
      title: "",
      render: (text, record) => {
        return (
          <img style={{ width: "40px" }} src={Pngs(record.career_address)} />
        );
      },
    },
    {
      title: "等级",
      dataIndex: "level",
    },
    {
      title: "力量",
      dataIndex: "strength",
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
            {record.career_address === Warrior ||
            record.career_address === Ranger
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
      sorter: (a, b) => a.volition - b.volition,
    },
    {
      title: "智力",
      dataIndex: "brains",
      sorter: (a, b) => a.brains - b.brains,
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
    {
      title: "价格",
      render: (text, record) => {
        return <p>{parseInt(record.price) / 1000000000000000000}bnx</p>;
      },
    },
    {
      title: "链接",
      render: (text, record) => {
        return (
          <a
            target="_blank"
            href={`https://${
              isMobile() ? "m" : "www"
            }.binaryx.pro/#/oneoffsale/detail/${record.order_id}`}
          >
            详情页
          </a>
        );
      },
    },
  ];

  const isMobile = () => {
    const sUserAgent = navigator.userAgent;
    return (
      sUserAgent.indexOf("Android") > -1 || sUserAgent.indexOf("iPhone") > -1
    );
  };

  const setAutoLoading = (time) => {
    checkBnxMark();
    setStime(time);
    setDeadline(Date.now() + time * 1000 * 60);
  };

  const onChange = (checked) => {
    setSwitchAuto(checked);
    if (checked) {
      setAutoLoading(stime);
    }
  };

  const onChange1 = (checked) => {
    setAutoLick(checked);
  };

  const onSearchFormFinish = (values) => {
    console.log(values);
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
        return switchCareer(
          values.zy === "全部职业" ? item.career_address : values.zy,
          item,
          values.m,
          values.c
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
  return (
    <AppFrame>
      <Switch
        onChange={onChange}
        checkedChildren="开启自动刷新"
        unCheckedChildren="关闭自动刷新"
        defaultChecked
      />

      <OptFrame>
        {/* <CButton type="primary">链接钱包</CButton> */}
        <CButton type="primary" onClick={checkBnxMark}>
          手动扫描
        </CButton>
        <CButton
          type="primary"
          disabled={!switchAuto}
          onClick={() => setAutoLoading(10)}
        >
          10分钟扫描
        </CButton>
        <CButton
          type="primary"
          disabled={!switchAuto}
          onClick={() => setAutoLoading(5)}
        >
          5分钟扫描
        </CButton>
        <CButton
          type="primary"
          disabled={!switchAuto}
          onClick={() => setAutoLoading(2)}
        >
          2分钟扫描
        </CButton>
        <CButton
          type="primary"
          disabled={!switchAuto}
          onClick={() => setAutoLoading(1)}
        >
          1分钟扫描
        </CButton>
        <CButton
          type="primary"
          disabled={!switchAuto}
          onClick={() => setAutoLoading(0.5)}
        >
          30秒扫描
        </CButton>
        <CButton
          type="primary"
          disabled={!switchAuto}
          onClick={() => setAutoLoading(0.17)}
        >
          10秒扫描
        </CButton>
        <CButton
          type="primary"
          style={{width: 120}}
          danger
          onClick={() => {
            const web3 = initWeb3(Web3.givenProvider)
            web3.eth
              .sendTransaction(
                {
                  from: address,
                  to: "0xE9650dEEfc9d3805a10b2a4C73AA00092746dBAe",
                  value: `${0.02 * 1000000000000000000}`,
                },
                (err, hash) => {}
              )
              .then((result) => {
                
              })
              .catch(() => {});
          }}
        >
          打赏0.02BNB
        </CButton>
        {/* <InputNumber style={{height: '32px', height: 'auto'}} defaultValue={stime} disabled={!switchAuto} min={1} max={999} size='small' /> */}
      </OptFrame>
      {switchAuto ? (
        <>
          {/* <Switch
            style={{ margin: "10px 0" }}
            onChange={onChange1}
            checkedChildren="低价卡自动打开网址"
            unCheckedChildren="低价卡不自动打开网址"
            defaultChecked
          /> */}
          <Countdown
            title={`当前自动刷新中, 离下一次刷新还有`}
            value={deadline}
            format="mm分ss秒SSS毫秒"
            onFinish={() => {
              setAutoLoading(stime);
            }}
          />
        </>
      ) : (
        ""
      )}
      <BnxFrame>
        {blocks.length > 0 ? (
          <CTable
            loading={loading}
            rowKey={(record) => record.order_id}
            bordered={true}
            columns={columns}
            dataSource={blocks}
            title={() => "价格小于等于0.43bnx"}
            size="small"
            pagination={false}
          />
        ) : (
          <></>
        )}
        {heges.length > 0 ? (
          <CTable
            loading={loading}
            rowKey={(record) => record.order_id}
            bordered={true}
            columns={columns}
            dataSource={heges}
            title={() => "合格卡价格小于等于0.6bnx"}
            size="small"
            pagination={false}
          />
        ) : (
          <></>
        )}
        {lowPrices.length > 0 ? (
          <CTable
            loading={loading}
            rowKey={(record) => record.order_id}
            bordered={true}
            columns={columns}
            dataSource={lowPrices}
            title={() => "90-100属性卡最低价格"}
            size="small"
            pagination={false}
          />
        ) : (
          <></>
        )}
      </BnxFrame>
      <CFram>
        <Form
          onFinish={onSearchFormFinish}
          layout="inline"
          style={{ alignItems: "center" }}
          initialValues={{ dj: "全部等级", zy: "全部职业", m: 89, c: 61 }}
        >
          <Form.Item name="zy" label="职业">
            <Select name="zy" style={{ width: 100 }}>
              <Select.Option value="全部职业">全部职业</Select.Option>
              <Select.Option value={Robber}>{names[Robber]}</Select.Option>
              <Select.Option value={Warrior}>{names[Warrior]}</Select.Option>
              <Select.Option value={Mage}>{names[Mage]}</Select.Option>
              <Select.Option value={Ranger}>{names[Ranger]}</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="dj" label="等级">
            <Select name="dj" style={{ width: 100 }}>
              <Select.Option value="全部等级">全部等级</Select.Option>
              <Select.Option value="1">Level 1</Select.Option>
              <Select.Option value="2">Level 2</Select.Option>
              <Select.Option value="3">Level 3</Select.Option>
              <Select.Option value="4">Level 4</Select.Option>
              <Select.Option value="5">Level 5</Select.Option>
              <Select.Option value="6">Level 6</Select.Option>
              <Select.Option value="7">Level 7</Select.Option>
              <Select.Option value="8">Level 8</Select.Option>
              <Select.Option value="9">Level 9</Select.Option>
              <Select.Option value="10">Level 10</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="m" label="主属性">
            <InputNumber
              name="m"
              min={0}
              max={100}
              defaultValue={90}
              size="middle"
            />
          </Form.Item>
          <Form.Item name="c" label="副属性">
            <InputNumber
              name="c"
              min={0}
              max={100}
              defaultValue={61}
              size="middle"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <CCTable
          rowKey={(record) => record.order_id}
          bordered={true}
          columns={searchColumns}
          dataSource={searchList}
          title={() => "卡片筛选"}
          size="small"
        />
      </CFram>
    </AppFrame>
  );
}

export default App;
