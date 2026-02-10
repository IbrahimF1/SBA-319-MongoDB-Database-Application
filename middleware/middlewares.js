export function logReq(req, _res, next) {
  console.log(`${new Date().toLocaleTimeString()} -- ${req.method} -- ${req.url}`);

  if (req.body)
    console.table(req.body);

  next();
}

export function globalErr(err, req, res, next) {
  res.status(err.status || 500).json({ error: `${new Date().toLocaleTimeString()} -- ❌ Error: ${err.message}` });
}