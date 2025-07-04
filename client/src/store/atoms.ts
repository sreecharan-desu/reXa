import { atom } from 'recoil';

export const rewardsState = atom({
  key: 'rewardsState',
  default: [],
});

export const rewardsLoadingState = atom({
  key: 'rewardsLoadingState',
  default: true,
});

export const myRewardsState = atom({
    key: 'myRewardsState',
    default: [],
  });
  
  export const myRewardsLoadingState = atom({
    key: 'myRewardsLoadingState',
    default: true,
  });

  export const transactionsState = atom({
    key: 'transactionsState',
    default: [],
  });
  
  export const transactionsLoadingState = atom({
    key: 'transactionsLoadingState',
    default: true,
  });
  
  export const transactionsErrorState = atom({
    key: 'transactionsErrorState',
    default: null,
  });

  export const profileState = atom({
    key: 'profileState',
    default: null,
  });
  
  export const profileLoadingState = atom({
    key: 'profileLoadingState',
    default: true,
  });
  
  export const profileErrorState = atom({
    key: 'profileErrorState',
    default: '',
  });