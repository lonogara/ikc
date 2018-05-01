import inkscape, { inkscapePdfMerge } from 'chin-plugin-inkscape'
import { join } from 'path'

const { CHIN_ENV: format = 'png' } = process.env

const put = 'iks'
const out = join('ikc', format)

let svg, after

if (format === 'merge') {
  const { ext, dist } = inkscapePdfMerge()
  svg = ext
  after = () => dist(join('ikc', 'merge.pdf'))
} else{
  svg = inkscape(format,
    format === 'png' ? { dpi: 192 } :
    format === 'pdf' ? { background: '#283857' } :
    {}
  )
}

export default { put, out, clean: true, processors: { svg }, after }