import {rem} from './margin.constants';
const factor = 0.5;

export const PaddingConstants = {
  tab1: factor * rem,
  tab2: factor * rem + 10,
  tab3: factor * rem + 20,
  tab4: factor * rem + 30,
  halfTab: (factor * rem) / 2,
};
