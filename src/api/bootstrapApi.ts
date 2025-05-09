import mock from '../utils/mock.ts';

export const loadAppStartupData = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    budgetCategories: mock.categories,
  };
};
