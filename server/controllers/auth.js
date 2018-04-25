const jwt = require('jsonwebtoken')

const token = async (ctx, next) => {
  const secretKey = 'wjcHlqytTDBhxYpWPp3NkmLJaHXzn8xWbpX7xmT7JxqQJREguXRjzKIw9L2q';
  const environmentId = 'NQoFK1NLVelFWOBQtQ8A';
  const result = jwt.sign( { iss: environmentId }, secretKey, { algorithm: 'HS256' } );

  ctx.body = result
  return next()
}

export default {
  token
}

