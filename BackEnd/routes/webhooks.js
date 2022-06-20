const { Router } = require("express");
const PaymentsService = require("../services/payment");

function webhooks(app) {
  const router = Router();
  app.use("/api/webhooks", router);
  const paymentServ = new PaymentsService();

  router.post("/stripe", async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const result = await paymentServ.confirm(req.body, sig);
    return res.status(result.success ? 200 : 400).json(result);
  });
}

module.exports = webhooks;
