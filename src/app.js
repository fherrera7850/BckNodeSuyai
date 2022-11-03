import express from "express";
import morgan from "morgan";
// Routes
import languageRoutes from "./routes/language.routes";
import productoRoutes from "./routes/producto.routes";
import ventaRoutes from "./routes/venta.routes";
import productoVentaRoutes from "./routes/productoVenta.routes";
import clienteRoutes from "./routes/cliente.routes";

const app = express();

// Settings
app.set("port", process.env.PORT || 7666);

// Middlewares
app.use(morgan("dev"));
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

// Routes
app.use("/api/languages", languageRoutes);
app.use("/api/producto", productoRoutes);
app.use("/api/venta", ventaRoutes);
app.use("/api/productoventa", productoVentaRoutes);
app.use("/api/cliente", clienteRoutes);

export default app;
