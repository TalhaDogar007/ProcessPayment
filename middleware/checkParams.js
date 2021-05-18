
const checkParams = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      res.status(400).json({ error: `The request is invalid ${details[0].message}`})
    }
  }
}
module.exports = checkParams