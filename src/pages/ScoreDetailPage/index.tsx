import { useMemo, VFC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Column, BarConfig } from "@ant-design/plots";
import { Typography, Row, Col } from "antd";
import { RootState } from "../../models/store";
import { DetailData, DetailItem } from "../../domains";
import { PageContent } from "../../style";
const { Title, Text } = Typography;

const ScoreDetailPage: VFC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    detailData,
    categoryAverageData
  }: {
    detailData: { [key: string]: DetailData };
    categoryAverageData: { [key: string]: DetailItem };
  } = useSelector((state: RootState) => state.jobCategories);
  const config: BarConfig = useMemo(
    () => ({
      data: [],
      xField: "name",
      yField: "score",
      // label: {
      //   position: "middle"
      // },
      color: ({ type }) => {
        if (type === "10-30分" || type === "30+分") {
          return "#d5d5d5";
        }
        return "#d5d5d5";
      },
      xAxis: {
        label: {
          autoRotate: true,
          autoHide: false
        }
      }
    }),
    []
  );

  console.log(categoryAverageData);

  return useMemo(
    () => (
      <PageContent>
        <Title>
          エンゲージメントを構成する小項目での特徴(
          {detailData?.[Number(id)]?.name})
        </Title>
        <DifferenceTable>
          <Col span={24}>
            <Title level={5}>職種平均値</Title>
            {Object.keys(categoryAverageData).map((key) => {
              if (
                detailData[Number(id)]?.data.find(
                  (item) => item.id === Number(key)
                )
              ) {
                return (
                  <Text
                    style={{
                      width: 1800 / detailData[Number(id)]?.data.length
                    }}
                  >
                    {+categoryAverageData[key].score.toFixed(2)}
                  </Text>
                );
              } else {
                return null;
              }
            })}
          </Col>
          <Col span={24}>
            <Title level={5}>
              全職種平均
              <br />
              との差分
            </Title>
            {Object.keys(categoryAverageData).map((key) => {
              const detailItem = detailData[Number(id)]?.data.find(
                (item) => item.id === Number(key)
              );
              if (detailItem) {
                return (
                  <Text
                    style={{
                      width: 1800 / detailData[Number(id)]?.data.length
                    }}
                  >
                    {
                      +(
                        detailItem.score -
                        +categoryAverageData[key].score.toFixed(2)
                      ).toFixed(2)
                    }
                  </Text>
                );
              } else {
                return null;
              }
            })}
          </Col>
        </DifferenceTable>
        <ChartContainer>
          {detailData[Number(id)]?.data && (
            <Column
              {...config}
              data={detailData[Number(id)]?.data
                .filter(({ type }) => type === "cat")
                .map(({ name, score }) => ({
                  name,
                  score: +score.toFixed(8),
                  difference: 0
                }))}
            />
          )}
        </ChartContainer>
        <ul>
          {detailData[Number(id)]?.data
            .filter(({ type }) => type === "cat")
            .map(({ name, score }) => (
              <li>
                {name}: <br />
                {+score.toFixed(8)}
              </li>
            ))}
        </ul>
      </PageContent>
    ),
    [detailData, categoryAverageData, id]
  );
};

const ChartContainer = styled.div`
  width: 100%;
  padding-left: 50px;
  height: 400px;
`;

const DifferenceTable = styled(Row)`
  width: 100%;
  padding-top: 160px;
  padding-bottom: 30px;
  h5.ant-typography {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    text-align: center;
    display: inline-block;
    width: 80px;
    height: 40px;
    font-size: 12px;
  }

  span.ant-typography {
    flex-shrink: 0;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    font-size: 12px;
    letter-spacing: -1px;
    + span.ant-typography {
      margin-left: -1px;
    }
  }
`;

export default ScoreDetailPage;
