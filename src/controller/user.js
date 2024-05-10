const defaults = require("../config/defaults");
const userService = require("../service/user");
const queryUtils = require("../utils/query");

const create = async (req, res, next) => {
  const { name, email, password, role, status } = req.body;

  try {
    const user = await userService.create({
      name,
      email,
      password,
      role,
      status,
    });

    const response = {
      code: 201,
      message: "User Created Successfully",
      data: { ...user },
      links: {
        self: `/users/${user.id}`,
        edit: `/users/${user.id}/edit`,
        delete: `/users/${user.id}/delete`,
        view: `/users/${user.id}/view`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

const findAllItems = async (req, res, next) => {
  // extract query params
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const name = req.query.name || "";
  const email = req.query.email || "";

  try {
    // data
    const users = await userService.findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      name,
      email,
    });

    const data = queryUtils.getTransformedItems({
      items: users,
      selection: ["id", "name", "email", "updatedAt", "createdAt"],
      path: "/users",
    });

    // pagination
    const totalItems = await userService.count({ name, email });
    const pagination = queryUtils.getPagination({ totalItems, limit, page });

    // HATEOAS Links
    const links = queryUtils.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    // generate response
    res.status(200).json({
      data,
      pagination,
      links,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  findAllItems,
};
