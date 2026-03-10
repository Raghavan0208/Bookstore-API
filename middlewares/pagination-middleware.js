const paginationMiddleware = (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);

  req.pagination = {
    limit: parsedLimit > 0 ? parsedLimit : 10, // Default to 10 items per page
    offset:
      (parsedPage > 0 ? parsedPage - 1 : 0) *
      (parsedLimit > 0 ? parsedLimit : 10),
  };

  next();
};

module.exports = paginationMiddleware;
