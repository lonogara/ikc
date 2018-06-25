import inkscape, { inkscapeMergePdfs } from 'chin-plugin-inkscape'
import { parse, format } from 'path'

const ink2png = inkscape('png', { width: 1200 })
const ink2pdf = inkscape('pdf')
const ink2prt = inkscape('pdf', { area: 'drawing' })

const configs = {
  png: {
    put: 'png',
    out: '.dist/png',
    clean: true,
    ignored: [],
    processors: { svg: ink2png },
    after: () => {}
  },
  pdf: {
    put: 'pdf',
    out: '.dist/pdf',
    clean: true,
    ignored: [],
    processors: { svg: ink2pdf },
    after: () => {}
  },
  prt: {
    put: 'pdf',
    out: '.dist/prt',
    clean: true,
    ignored: [],
    processors: { svg: ink2prt },
    after: () => {}
  },
  all() {
    return (
      Object
      .values(this)
      .filter(config =>
        typeof config === 'object'
      )
    )
  }
}

const command = process.env.npm_lifecycle_event
const config = typeof configs[command] === 'function' ? configs[command]() : configs[command]
export default config

/* utils */
function dir2merge({ prefix = '.', dirs, options }) {
  return dirs.map(dirpath => [
    `${prefix}/${dirpath}`,
    inkscapeMergePdfs(options)
  ])
}

function parseXbase(filepath) {
  const { root, dir, name, ext } = parse(filepath)
  return { root, dir, name, ext }
}

function mergeSort(filepaths) {
  return (
    filepaths
    .map(parseXbase)
    .sort((a, b) => {
      const anum = +a.name
      const bnum = +b.name
      return (
        anum === NaN ? 1 :
        anum < bnum ? -1 :
        anum > bnum ? 1 :
        0
      )
    })
    .map(format)
  )
}