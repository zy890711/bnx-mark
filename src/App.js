import { Button, Table, Switch, Statistic } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MagePng from "./img/role_Mage.png";
import RangerPng from "./img/role_Ranger.png";
import RobberPng from "./img/role_Robber.png";
import WarriorPng from "./img/role_Warrior.png";
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
  [Warrior]: "游侠",
  [Mage]: "法师",
  [Ranger]: "战士",
};
function App() {
  const [blocks, setBlocks] = useState([]);
  const [stime, setStime] = useState(0.17);
  const [heges, setHeges] = useState([]);
  const [lowPrices, setLowPrices] = useState([]);
  const [switchAuto, setSwitchAuto] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deadline, setDeadline] = useState(Date.now() + 0.17 * 1000 * 60);
  const [autoLink, setAutoLick] = useState(true);

  useEffect(() => checkBnxMark(), [])
  const checkBnxMark = () => {
    setLoading(true);
    fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.data.result.items);
        const items = res.data.result.items;
        const hgs = items
          .filter((item) => {
            return parseInt(item.price) <= 430000000000000000;
          })
          .filter((item) => {
            return item.order_id != "11215";
          })
          .filter((item) => {
            return item.order_id != "48877";
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
    </AppFrame>
  );
}

export default App;
