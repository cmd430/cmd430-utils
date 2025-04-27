import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [ 'src/index.ts', 'src/Classes/index.ts', 'src/Log/index.ts', 'src/Utils/index.ts' ],
  format: [ 'esm' ],
  external: [],
  sourcemap: true,
  splitting: true,
  dts: true,
  clean: true
})
