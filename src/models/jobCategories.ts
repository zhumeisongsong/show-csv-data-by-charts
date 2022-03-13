import { createModel } from "@rematch/core";
import { RootModel } from "./";
// import data from "../data";
import { DetailData, AverageDataItem, DetailItem } from "../domains";

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

        return null;
      });

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
