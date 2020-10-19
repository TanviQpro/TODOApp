import {Platform} from 'react-native';
const factor = 0.5;
export let rem = Platform.OS === 'ios' ? 15 : 14;

export const MarginConstants = {
  tab1: factor * rem,
  tab2: factor * rem + 10,
  tab3: factor * rem + 20,
  tab4: factor * rem + 30,
  halfTab: (factor * rem) / 2,
};

export const SafeAreaConstants = {
  tab4: Platform.OS === 'ios' ? MarginConstants.tab4 : 0,
  tab3: Platform.OS === 'ios' ? MarginConstants.tab3 : 0,
  tab2: Platform.OS === 'ios' ? MarginConstants.tab2 : 0,
  tab1: Platform.OS === 'ios' ? MarginConstants.tab1 : 0,
  halfTab: Platform.OS === 'ios' ? MarginConstants.halfTab : 0,
};
