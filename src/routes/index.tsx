import type { RouteObject } from "react-router-dom";
import ListPage from "../pages/ListPage";
import RankingDetailPage from "../pages/RankingDetailPage";
import ScoreDetailPage from "../pages/ScoreDetailPage";

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      { index: true, element: <ListPage /> },
      { path: "/job-categories-ranking/:id", element: <RankingDetailPage /> },
      {
        path: "/job-categories/:id",
        element: <ScoreDetailPage />
      }
      // { path: "*", element: <NoMatch /> }
    ]
  }
];

export default routes;
