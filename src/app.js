import express from "express";
import morgan from "morgan";
// Routes
import languageRoutes from "./routes/language.routes";
import productoRoutes from "./routes/producto.routes";
import ventaRoutes from "./routes/venta.routes";
import productoVentaRoutes from "./routes/productoVenta.routes";

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/languages", languageRoutes);
app.use("/api/producto", productoRoutes);
app.use("/api/venta", ventaRoutes);
app.use("/api/productoventa", productoVentaRoutes);

export default app;
