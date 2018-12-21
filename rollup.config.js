import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const plugins = [
  resolve(),
  babel(),
  terser({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
      drop_console: true,
      drop_debugger: true
    }
  })
];

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/iwd.cjs.js',
      format: 'cjs',
    },
    plugins, 
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/iwd.umd.js',
      format: 'umd',
      name: 'iwd',
      sourcemap: true,
    },
    plugins, 
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/iwd.es.js',
      format: 'es',
    },
    plugins, 
  }
];
