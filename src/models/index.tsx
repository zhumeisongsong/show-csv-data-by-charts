import { Models } from "@rematch/core";
import { jobCategories } from "./jobCategories";
export interface RootModel extends Models<RootModel> {
  jobCategories: typeof jobCategories;
}
export const models: RootModel = { jobCategories };