export const strip = arg => arg.replace(/\x1b[[(?);]{0,2}(;?\d)*./g, '')
