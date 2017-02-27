/**
 * check source is equals target
 * @param {any} s source
 * @param {any} t target
 * @returns {boolean}
 */
export const isEqual = (s, t) => {
  if (typeof s !== 'object') {
    return s === t
  }
  return JSON.stringify(s) === JSON.stringify(t)
}
