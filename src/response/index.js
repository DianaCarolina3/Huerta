const statusResponseMessage = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  301: 'Moved Permanently',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Inauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  411: 'Length Required',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  505: 'HTTP Version Not Supported',
}

exports.success = (req, res, message, status, error) => {
  let statusCode = status
  let statusMessage = message

  if (!status) {
    statusCode = 200
  }
  if (!message) {
    statusMessage = statusResponseMessage[status]
  }

  error = false

  res.status(statusCode).send({
    status: statusCode,
    message: statusMessage,
    error: error,
  })
}

exports.error = (req, res, message, status, error) => {
  let statusCode = status
  let statusMessage = message

  if (!status) {
    statusCode = 500
  }
  if (!message) {
    statusMessage = statusResponseMessage[status]
  }

  error = true + ' : ' + error

  res.status(statusCode).send({
    status: statusCode,
    message: statusMessage,
    error: error,
  })
}
