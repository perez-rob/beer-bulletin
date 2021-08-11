import nextConnect from "next-connect";
const models = require("../../../db/models/index");
import middleware from "../../../middleware/auth";

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const tradeID = slug;
    const trade = await models.trades.findOne({
      where: {
        id: tradeID,
      },
    });
    res.statusCode = 200;
    return res.json({ status: "success", data: trade });
  })
  .put(async (req, res) => {
    const { slug } = req.query;
    const tradeID = slug;
    const tradeData = await models.trades.update(req.body, {
      where: {
        id: tradeID,
      },
    });
    if (tradeData[0] === 0) {
      return res.status(400).json({
        status: "failed",
        message: `No new data or no trade found with ID = ${tradeID}`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Updated Trade ID = ${tradeID}`,
    });
  })
  .delete(async (req, res) => {
    const { slug } = req.query;
    const tradeID = slug;
    const tradeData = await models.trades.destroy({
      where: {
        id: tradeID,
      },
    });

    if (!tradeData) {
      return res.status(400).json({
        status: "failed",
        message: `No trade found with ID = ${tradeID}`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Deleted Trade ID = ${tradeID}`,
    });
  });

export default handler;
