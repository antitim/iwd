import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    file: 'build/iwd.min.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    //uglify()
  ]
};
