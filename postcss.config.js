import postcssExtend from 'postcss-extend';
import postcssCustomMedia from 'postcss-custom-media';

export default {
  plugins: [
    postcssExtend(),
    postcssCustomMedia(),
  ]
};

