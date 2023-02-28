import { Router } from "express";
import { methods as pedidoController } from "../controllers/pedido.controller";

const router = Router();

router.get("/", pedidoController.getPedidos);
router.get("/:_id", pedidoController.getPedido);
router.post("/CompletarPedido", pedidoController.CompletarPedido);


export default router;