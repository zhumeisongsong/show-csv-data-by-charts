import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Table, Row, Col } from "antd";
import styled from "styled-components";
import { ColumnsType } from "antd/es/table";
import { RootState } from "../../models/store";
import { AverageDataItem } from "../../domains";
import { PageContent } from "../../style";

const RankingDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { averageData } = useSelector(
    (state: RootState) => state.jobCategories
  );

  const columns: ColumnsType<AverageDataItem> = [
    {
      title: "職種", // TODO:Chinese
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "エンゲージメントスコア", // TODO:Chinese
      dataIndex: "score",
      key: "score",
      align: "center"
    }
  ];

  return useMemo(
    () => (
      <PageContent>
        {averageData.length > 0 && (
          <Row>
            <Col span={24}>
              <RankingTable
                dataSource={averageData.map((item: AverageDataItem) => ({
                  ...item,
                  key: item.id,
                  score: +item.score.toFixed(2)
                }))}
                columns={columns as any}
                pagination={false}
              />
            </Col>
          </Row>
        )}
      </PageContent>
    ),
    [averageData, id]
  );
};

const RankingTable = styled(Table)`
  .ant-table-cell {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

export default RankingDetailPage;
