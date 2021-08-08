import nextConnect from "next-connect";
const models = require("../../../db/models/index");
import middleware from "../../../middleware/auth";

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const {
      query: { nextPage },
      method,
      body,
    } = req;

    const chats = await models.chats.findAndCountAll({
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["id", "DESC"],
      ],
      offset: nextPage ? +nextPage : 0,
      limit: 5,
    });

    res.statusCode = 200;
    res.json({
      status: "success",
      data: chats.rows,
      total: chats.count,
      nextPage: +nextPage + 5,
    });
  })
  // ============  METHODS BELOW NEED ATTENTION/UPDATES (copied from /users/index.js) ================ //

  // Post method
  .post(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const { username, email, password } = body;
    const userId = slug;
    const newUser = await models.users.create({
      username,
      email,
      password,
      status: 1,
    });
    return res.status(200).json({
      status: "success",
      message: "done",
      data: newUser,
    });
  })
  // Put method
  .put(async (req, res) => {
    res.end("method - put");
  })
  // Patch method
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export default handler;
