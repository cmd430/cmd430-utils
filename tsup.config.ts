import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    classes: 'src/Classes/index.ts',
    log: 'src/Log/index.ts',
    utils: 'src/Utils/index.ts'
  },
  format: [ 'esm' ],
  external: [],
  dts: true,
  clean: true
})
