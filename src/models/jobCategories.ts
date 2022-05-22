import { createModel } from "@rematch/core";
import { RootModel } from "./";
// import data from "../data";
import { DetailData, AverageDataItem, DetailItem } from "../domains";

const displayCategories: string[] = [
  "やりがい",
  "裁量",
  "達成感",
  "成長機会",
  "仕事量",
  "ストレス反応",
  "職務上の支援",
  "自己成長への支援",
  "使命や目標の明示",
  "同僚からの困難時の支援",
  "上司との関係",
  "仕事仲間との関係",
  "成果に対する承認",
  "発言・意見に対する承認",
  "評価への納得感",
  "ミッション・ビジョンへの共感",
  "会社の方針や事業戦略への納得感",
  "経営陣に対する信頼",
  "事業やサービスへの誇り",
  "キャリア機会の提供",
  "挑戦する風土",
  "部署間での協力",
  "称賛への妥当性",
  "職場環境への満足度",
  "ワーク・ライフ・バランス",
  "給与への納得感"
];

export const jobCategories = createModel<RootModel>()({
  state: {
    originalData: [],
    averageData: [],
    detailData: {},
    categoryAverageData: {}
  },
  reducers: {
    setOriginalData(state, payload) {
      state.originalData = payload;
      return state;
    },
    setAverageData(state, payload) {
      state.averageData = payload;
      return state;
    },
    setDetailData(state, payload) {
      state.detailData = payload;
      return state;
    },
    setcategoryAverageData(state, payload) {
      state.categoryAverageData = payload;
      return state;
    }
  },
  effects: (dispatch) => ({
    async getDataAsync(payload) {
      const detailData: { [key: string]: DetailData } = {};
      const averageData: AverageDataItem[] = [];
      const categoryAverageData: {
        [key: string]: { id: string; score: number; data: DetailItem[] };
      } = {};

      payload?.map((value: any) => {
        if (
          displayCategories.find((categoryName) => categoryName === value.title)
        ) {
          if (detailData[value.job_category_id]) {
            detailData[value.job_category_id].data.push({
              id: value.item_id,
              name: value.title,
              score: value.score_100,
              type: value.item_layer
            });
          } else {
            detailData[value.job_category_id] = {
              id: value.job_category_id,
              name: value.job_category_name,
              data: [
                {
                  id: value.item_id,
                  name: value.title,
                  score: value.score_100,
                  type: value.item_layer
                }
              ]
            };
          }

          if (value.item_layer === "cat") {
            if (categoryAverageData[value.item_id]) {
            } else {
              categoryAverageData[value.item_id] = {
                id: value.item_id,
                score: 0,
                data: []
              };
            }
            categoryAverageData[value.item_id].data.push({
              id: value.item_id,
              name: value.title,
              score: value.score_100,
              type: value.item_layer
            });
          }
        } else {
          return null;
        }
      });

      console.log(detailData);

      Object.keys(detailData).map((key: string) => {
        averageData.push({
          id: detailData[Number(key)].id,
          name: detailData[Number(key)].name,
          score:
            detailData[Number(key)].data.find((item) => item.type === "eng")
              ?.score || 0
        });

        return null;
      });

      Object.keys(categoryAverageData).map((key: string) => {
        let sum: number = 0;

        categoryAverageData[Number(key)].data.map(
          ({ score }: { score: number }) => {
            sum += score;
            return null;
          }
        );

        categoryAverageData[Number(key)].score =
          sum / categoryAverageData[Number(key)].data.length;

        return null;
      });

      averageData.sort((a, b) => b.score - a.score);
      dispatch.jobCategories.setAverageData(averageData);
      dispatch.jobCategories.setDetailData(detailData);
      dispatch.jobCategories.setcategoryAverageData(categoryAverageData);
    }
  })
});
