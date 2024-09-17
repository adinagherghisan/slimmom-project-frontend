import { createSelector } from "@reduxjs/toolkit";

export const selectorRecommendations = createSelector(
    (state) => state.recommendation.recommendations,
    (recommendations) => ({
        dailyCalories: recommendations.dailyCalories || 0,
        forbiddenProducts: recommendations.forbiddenProducts || []
    })
);

