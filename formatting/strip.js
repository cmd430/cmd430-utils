// eslint-disable-next-line prefer-named-capture-group, no-control-regex
export const strip = arg => arg.replace(/\x1b[[(?);]{0,2}(;?\d)*./g, '')
