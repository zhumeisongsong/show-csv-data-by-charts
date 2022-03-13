import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Typography, Space, Layout } from "antd";
import CSVReader from "react-csv-reader";
import { RootState } from "../../models/store";
import { AverageDataItem } from "../../domains";

const { Content } = Layout;
const { Text, Link } = Typography;

const ListPage = () => {
  const dispatch = useDispatch();
  const { averageData } = useSelector(
    (state: RootState) => state.jobCategories
  );
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, "_")
  };

  const handleForce = (data: any, fileInfo: any) => {
    dispatch.jobCategories.getDataAsync(data);
  };

  return useMemo(
    () => (
      <Content style={{ padding: "40px 80px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <CSVReader
            cssClass="react-csv-input"
            label="Select CSV file"
            onFileLoaded={handleForce}
            parserOptions={papaparseOptions}
          />

          <List
            bordered
            dataSource={averageData.map((data: AverageDataItem) => ({
              name: data.name,
              rankingLink: `/job-categories-ranking/${data.id}`,
              detailLink: `/job-categories/${data.id}`
            }))}
            renderItem={(item) => (
              <List.Item>
                <Space direction="vertical">
                  <Text>{item.name}</Text>
                  <Link href={item.rankingLink} target="_blank">
                    {item.rankingLink}
                  </Link>
                  <Link href={item.detailLink} target="_blank">
                    {item.detailLink}
                  </Link>
                </Space>
              </List.Item>
            )}
          />
        </Space>
      </Content>
    ),
    [averageData]
  );
};

export default ListPage;
