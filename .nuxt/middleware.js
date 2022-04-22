const middleware = {}

middleware['route-guard'] = require('..\\middleware\\route-guard.js')
middleware['route-guard'] = middleware['route-guard'].default || middleware['route-guard']

export default middleware
