import { Router } from "express";
import { methods as clienteController } from "./../controllers/cliente.controller";

const router = Router();

router.post("/", clienteController.addCliente)
router.get("/", clienteController.getClientes)

export default router;