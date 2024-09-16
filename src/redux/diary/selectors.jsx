
export const selectDiary = (state) => state.diary.consumedProducts;
export const selectIsLoading = (state) => state.diary.isLoading;
export const selectconsumedProductsError = (state) => state.diary.error;
export const selectConsumedProducts = (state) => state.diary.consumedProducts.consumedProducts || [];


    