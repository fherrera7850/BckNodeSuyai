import { getConnection } from "../database/database";
import { getConnectionMysql2 } from "../database/databaseMysql2"

const getPedidos = async (req, res) => {
    try {
        const connection = await getConnection();

        let qryFechas = 'SELECT DISTINCT FechaEntrega FROM pedido order by 1'
        const resultFechas = await connection.query(qryFechas);


        if (resultFechas.length > 0) {

            resultFechas.forEach(element => element.Pedidos = [])

            let qryAgrupados = 'SELECT ped._id Pedido_id, c._id Cliente_id, v._id Venta_id, c.Nombre, ped.Direccion, ped.Telefono, ped.FechaEntrega, ped.Estado, ped.Nota, v.PrecioTotalVenta '
            qryAgrupados += 'FROM pedido ped '
            qryAgrupados += 'LEFT JOIN venta v on v._id=ped.Venta_id '
            qryAgrupados += 'LEFT JOIN cliente c on c._id=v.Cliente_id ORDER BY 1;'

            const resultAgrupados = await connection.query(qryAgrupados);

            if (resultAgrupados.length > 0) {
                //Agrega array vacio para el detalle del pedido
                resultAgrupados.forEach(element => element.Pedido = [])

                let qryDetalleProductos = 'SELECT ped._id as Pedido_id, pv.Cantidad, p.Nombre as Producto, p._id Producto_id, pv.PrecioVentaProducto PrecioVenta '
                qryDetalleProductos += 'FROM venta v '
                qryDetalleProductos += 'RIGHT JOIN pedido ped on ped.Venta_id=v._id '
                qryDetalleProductos += 'INNER JOIN productoventa pv on v._id=pv.Venta_id '
                qryDetalleProductos += 'INNER JOIN producto p on p._id=pv.Producto_id ORDER BY 1;'

                const resultDetalleProductos = await connection.query(qryDetalleProductos);

                resultFechas.forEach(grandparent => {
                    resultAgrupados.forEach(parent => {
                        //console.log("grandparent.FechaEntrega", grandparent.FechaEntrega)
                        //console.log("parent.FechaEntrega", parent.FechaEntrega)
                        if (grandparent.FechaEntrega.toString() === parent.FechaEntrega.toString()) {
                            grandparent.Pedidos.push(parent)
                            resultDetalleProductos.forEach(child => {
                                if (parent.Pedido_id === child.Pedido_id) {
                                    parent.Pedido.push(child)
                                }
                            })
                        }
                    })
                })

                res.json(resultFechas);
            }
        }
        else {
            res.json({ ErrorMessage: "No hay pedidos para mostrar" })
        }


    } catch (error) {
        console.error(error)
        res.status(500);
        res.send(error.toString());
    }
};

const getPedido = async (req, res) => {
    try {
        const connection = await getConnection();

        const { _id } = req.params

        let qryAgrupados = 'SELECT ped._id Pedido_id, c._id Cliente_id, v._id Venta_id, c.Nombre, ped.Direccion, ped.Telefono, ped.FechaEntrega, ped.Estado, v.MedioPago, v.Observacion, v.Dcto '
        qryAgrupados += 'FROM pedido ped '
        qryAgrupados += 'LEFT JOIN venta v on v._id=ped.Venta_id '
        qryAgrupados += 'LEFT JOIN cliente c on c._id=v.Cliente_id '
        qryAgrupados += 'WHERE ped._id = ' + _id + ';'

        const resultAgrupados = await connection.query(qryAgrupados);

        //Agrega array vacio para el detalle del pedido
        resultAgrupados.forEach(element => element.Productos = [])

        let qryDetalleProductos = 'SELECT ped._id as Pedido_id, pv.Cantidad, p._id Producto_id, p.Nombre, p.Precio, p.Costo '
        qryDetalleProductos += 'FROM venta v '
        qryDetalleProductos += 'RIGHT JOIN pedido ped on ped.Venta_id=v._id '
        qryDetalleProductos += 'INNER JOIN productoventa pv on v._id=pv.Venta_id '
        qryDetalleProductos += 'INNER JOIN producto p on p._id=pv.Producto_id '
        qryDetalleProductos += 'WHERE ped._id = ' + _id + ';'

        const resultDetalleProductos = await connection.query(qryDetalleProductos);

        resultAgrupados.forEach(parent => {
            resultDetalleProductos.forEach(child => {
                if (parent.Pedido_id === child.Pedido_id) {
                    parent.Productos.push(child)
                }
            })
        })


        console.log("🚀 ~ file: pedido.controller.js:97 ~ getPedido ~ resultAgrupados", resultAgrupados)
        res.json(resultAgrupados);


    } catch (error) {
        console.error(error)
        res.status(500);
        res.send(error.toString());
    }
};

const deletePedido = async (req, res) => {
    try {
      const { id_pedido } = req.body;
      console.log("🚀 id_pedido", id_pedido);
      const connection = await getConnection();
  
      // Llamamos al procedimiento almacenado con un valor para PedidoID
      const callProcedureQuery = `CALL Del_Pedido(${id_pedido}, @Estado);`;
  
      // Ejecutamos la llamada al procedimiento
      connection.query(callProcedureQuery, async (err, results) => {
        if (err) {
          console.error(err);
          res.status(500);
          res.send(err.toString());
          return;
        }
  
        // Luego, ejecutamos una consulta adicional para obtener el valor de @Estado
        const selectEstadoQuery = `SELECT @Estado AS Estado;`;
  
        // Ejecutamos la consulta para obtener el valor de @Estado
        connection.query(selectEstadoQuery, (err, results) => {
          if (err) {
            console.error(err);
            res.status(500);
            res.send(err.toString());
            return;
          }
  
          const estado = results[0].Estado;
  
          if (estado === 0) {
            // Ocurrió un error en el procedimiento almacenado
            res.status(500);
            res.send("Error: El procedimiento almacenado no pudo eliminar el registro.");
          } else {
            res.status(200);
            // Aquí puedes enviar una respuesta exitosa si lo deseas
            res.send("Registro eliminado correctamente.");
          }
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500);
      res.send(error.toString());
    }
  };
  
const CompletarPedido = async (req, res) => { //DEPRECADO, USAR 2

    const { Venta, ProductosVenta, Pedido } = req.body
    console.log("🚀 ~ file: pedido.controller.js:116 ~ CompletarPedido ~ Pedido:", Pedido)
    console.log("🚀 ~ file: pedido.controller.js:116 ~ CompletarPedido ~ Venta:", Venta)
    let fx = Venta.Fecha.toString()
    fx = fx.replace(/T/g, " ")
    fx = fx.replace(/Z/g, "")
    Venta.Fecha = fx


    const connection = await getConnection();

    try {
        await connection.query('START TRANSACTION', async (err, rows) => {
            const datosProductoVenta = await connection.query(`select * from productoventa where Venta_id = ${Pedido.Venta_id}`)

            let eliminados = []
            let nuevos = []
            let mismos = []

            //identifica los que setan en ambos
            for (const keyDatosPV in datosProductoVenta) {
                for (const key in ProductosVenta) {

                    let PV = {
                        Producto_id: ProductosVenta[key]._id,
                        Cantidad: ProductosVenta[key].Cantidad,
                        PrecioVentaProducto: ProductosVenta[key].PrecioVenta > 0 ? ProductosVenta[key].PrecioVenta : ProductosVenta[key].Precio
                    }

                    if (PV.Producto_id === datosProductoVenta[keyDatosPV].Producto_id) {
                        //Se guardan en el array de los que ya están para hacer update
                        mismos.push(PV)
                    }
                }
            }

            //identifica eliminados
            for (const keyDatosPV in datosProductoVenta) {

                let estaEnMismos = false

                for (const key in mismos) {
                    let PV = {
                        Producto_id: ProductosVenta[key]._id
                    }

                    if (mismos[key].Producto_id === datosProductoVenta[keyDatosPV].Producto_id) {
                        estaEnMismos = true
                    }
                }

                if (!estaEnMismos) {
                    eliminados.push(datosProductoVenta[keyDatosPV])
                }
            }

            //identifica nuevos
            for (const keyProductosVenta in ProductosVenta) {

                let PV = {
                    Venta_id: Pedido.Venta_id,
                    Producto_id: ProductosVenta[keyProductosVenta]._id,
                    Cantidad: ProductosVenta[keyProductosVenta].Cantidad,
                    PrecioVentaProducto: ProductosVenta[keyProductosVenta].PrecioVenta > 0 ? ProductosVenta[keyProductosVenta].PrecioVenta : ProductosVenta[keyProductosVenta].Precio
                }

                let estaEnMismos = false

                for (const keyMismos in mismos) {
                    if (mismos[keyMismos].Producto_id === PV.Producto_id) {
                        estaEnMismos = true
                    }
                }

                if (!estaEnMismos) {
                    nuevos.push(PV)
                }
            }

            console.log("--------------MISMOS----------")
            console.log(mismos)

            console.log("--------------ELIMINADOS----------")
            console.log(eliminados)

            console.log("--------------NUEVOS----------")
            console.log(nuevos)

            console.log("--------------VENTA----------")
            console.log(Venta)

            console.log("--------------PEDIDO----------")
            console.log(Pedido)



            for (const k in mismos) {
                await connection.query(
                    `UPDATE productoventa 
                    SET 
                    CANTIDAD = ${mismos[k].Cantidad}, 
                    PRECIOVENTAPRODUCTO = ${mismos[k].PrecioVentaProducto} 
                    WHERE 
                    VENTA_ID = ${Pedido.Venta_id} AND 
                    PRODUCTO_ID = ${mismos[k].Producto_id};`
                )
            }


            /* mismos.forEach(async (item) => {
                await connection.query(
                    `UPDATE productoventa 
                    SET 
                    CANTIDAD = ${item.Cantidad}, 
                    PRECIOVENTAPRODUCTO = ${item.PrecioVentaProducto} 
                    WHERE 
                    VENTA_ID = ${Pedido.Venta_id} AND 
                    PRODUCTO_ID = ${item.Producto_id};`
                )
            }) */

            for (const k in eliminados) {
                await connection.query(
                    `DELETE FROM productoventa 
                WHERE 
                _ID = ${eliminados[k]._id};`
                )
            }


            /* eliminados.forEach(async (item) => {
                await connection.query(
                    `DELETE FROM productoventa 
                WHERE 
                _ID = ${item._id};`
                )
            }) */

            for (const k in nuevos) {
                await connection.query(
                    `INSERT INTO productoventa 
                    SET ?`, nuevos[k])
            }

            /* nuevos.forEach(async (item) => {
                await connection.query(
                    `INSERT INTO productoventa 
                    SET ?`, item)
            }) */

            let QryPedido = `UPDATE pedido `
            QryPedido += `SET `
            QryPedido += Pedido.Direccion ? `DIRECCION = '${Pedido.Direccion}' , ` : `DIRECCION = null, `
            QryPedido += Pedido.Telefono ? `TELEFONO = '${Pedido.Telefono}' , ` : `TELEFONO = null, `
            QryPedido += `FECHAENTREGA = '${Pedido.FechaEntrega}', `
            QryPedido += Pedido.Nota ? `NOTA = '${Pedido.Nota}', ` : `NOTA = null, `
            QryPedido += `ESTADO = 'C' `
            QryPedido += `WHERE `
            QryPedido += `VENTA_ID = ${Pedido.Venta_id};`

            await connection.query(QryPedido)

            let QryVenta = `UPDATE venta `
            QryVenta += `SET `
            QryVenta += `MEDIOPAGO = ${Venta.MedioPago} , `
            QryVenta += `PRECIOTOTALVENTA = ${Venta.PrecioTotalVenta} , `
            QryVenta += Venta.Cliente_id ? `CLIENTE_ID = ${Venta.Cliente_id} , ` : `CLIENTE_ID = null, `
            QryVenta += `FECHA = '${Venta.Fecha}' , `
            QryVenta += `DCTO = ${Venta.Dcto} , `
            QryVenta += Venta.Observacion ? `OBSERVACION = '${Venta.Observacion}' ` : `OBSERVACION = null `
            QryVenta += `WHERE `
            QryVenta += `_ID = ${Pedido.Venta_id}; `

            await connection.query(QryVenta)

            await connection.query('COMMIT;', async (err, rows) => {
                console.log("commit")
                res.sendStatus(200)
            })
        })

    } catch (error) {
        await connection.query("ROLLBACK;")
        console.log("🚀rollback", error)
        res.sendStatus(500)
    } finally {
        await connection.query("COMMIT;")
    }
}

const CompletarPedido2 = async (req, res) => {

    const { Venta, ProductosVenta, Pedido } = req.body
    console.log("🚀 ~ file: pedido.controller.js:116 ~ CompletarPedido ~ Pedido:", Pedido)
    console.log("🚀 ~ file: pedido.controller.js:116 ~ CompletarPedido ~ Venta:", Venta)
    let fx = Venta.Fecha.toString()
    fx = fx.replace(/T/g, " ")
    fx = fx.replace(/Z/g, "")
    Venta.Fecha = fx

    const connection1 = await getConnection();
    const datosProductoVenta = await connection1.query(`select * from productoventa where Venta_id = ${Pedido.Venta_id}`)

    let eliminados = []
    let nuevos = []
    let mismos = []

    //identifica los que setan en ambos
    for (const keyDatosPV in datosProductoVenta) {
        for (const key in ProductosVenta) {

            let PV = {
                Producto_id: ProductosVenta[key]._id,
                Cantidad: ProductosVenta[key].Cantidad,
                PrecioVentaProducto: ProductosVenta[key].PrecioVenta > 0 ? ProductosVenta[key].PrecioVenta : ProductosVenta[key].Precio
            }

            if (PV.Producto_id === datosProductoVenta[keyDatosPV].Producto_id) {
                //Se guardan en el array de los que ya están para hacer update
                mismos.push(PV)
            }
        }
    }

    //identifica eliminados
    for (const keyDatosPV in datosProductoVenta) {

        let estaEnMismos = false

        for (const key in mismos) {
            let PV = {
                Producto_id: ProductosVenta[key]._id
            }

            if (mismos[key].Producto_id === datosProductoVenta[keyDatosPV].Producto_id) {
                estaEnMismos = true
            }
        }

        if (!estaEnMismos) {
            eliminados.push(datosProductoVenta[keyDatosPV])
        }
    }

    //identifica nuevos
    for (const keyProductosVenta in ProductosVenta) {

        let PV = {
            Venta_id: Pedido.Venta_id,
            Producto_id: ProductosVenta[keyProductosVenta]._id,
            Cantidad: ProductosVenta[keyProductosVenta].Cantidad,
            PrecioVentaProducto: ProductosVenta[keyProductosVenta].PrecioVenta > 0 ? ProductosVenta[keyProductosVenta].PrecioVenta : ProductosVenta[keyProductosVenta].Precio
        }

        let estaEnMismos = false

        for (const keyMismos in mismos) {
            if (mismos[keyMismos].Producto_id === PV.Producto_id) {
                estaEnMismos = true
            }
        }

        if (!estaEnMismos) {
            nuevos.push(PV)
        }
    }

    console.log("--------------MISMOS----------")
    console.log(mismos)

    console.log("--------------ELIMINADOS----------")
    console.log(eliminados)

    console.log("--------------NUEVOS----------")
    console.log(nuevos)

    console.log("--------------VENTA----------")
    console.log(Venta)

    console.log("--------------PEDIDO----------")
    console.log(Pedido)


    return new Promise((resolve, reject) => {
        getConnectionMysql2().getConnection((err, connection) => {
            if (err) {
                console.log("🚀 ~ file: pedido.controller.js:326 ~ getConnectionMysql2 ~ err:", err)
                res.sendStatus(500)
                return reject("Error occurred while getting the connection", err);
            }
            return connection.beginTransaction(err => {
                if (err) {
                    console.log("🚀 ~ file: pedido.controller.js:331 ~ getConnectionMysql2 ~ err:", err)
                    connection.release();
                    res.sendStatus(500)
                    return reject("Error occurred while creating the transaction", err);
                }
                for (const k in mismos) {
                    connection.execute(
                        `UPDATE productoventa 
                        SET 
                        CANTIDAD = ${mismos[k].Cantidad}, 
                        PRECIOVENTAPRODUCTO = ${mismos[k].PrecioVentaProducto} 
                        WHERE 
                        VENTA_ID = ${Pedido.Venta_id} AND 
                        PRODUCTO_ID = ${mismos[k].Producto_id};`, (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                res.sendStatus(500)
                                return reject("UPDATE productoventa failed", err)
                            });
                        }
                    })
                }
                for (const k in eliminados) {
                    connection.execute(
                        `DELETE FROM productoventa 
                        WHERE 
                        _ID = ${eliminados[k]._id};`, (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                res.sendStatus(500)
                                return reject("DELETE FROM productoventa failed", err);
                            });
                        }
                    })
                }

                for (const k in nuevos) {
                    connection.execute(
                        `INSERT INTO productoventa (VENTA_ID, PRODUCTO_ID, CANTIDAD, PRECIOVENTAPRODUCTO)
                        VALUES (?,?,?,?)`, [nuevos[k].Venta_id, nuevos[k].Producto_id, nuevos[k].Cantidad, nuevos[k].PrecioVentaProducto], (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                res.sendStatus(500)
                                return reject("INSERT INTO productoventa failed", err);
                            });
                        }
                    })

                }

                let QryPedido = `UPDATE pedido `
                QryPedido += `SET `
                QryPedido += Pedido.Direccion ? `DIRECCION = '${Pedido.Direccion}' , ` : `DIRECCION = null, `
                QryPedido += Pedido.Telefono ? `TELEFONO = '${Pedido.Telefono}' , ` : `TELEFONO = null, `
                QryPedido += `FECHAENTREGA = '${Pedido.FechaEntrega}', `
                QryPedido += Pedido.Nota ? `NOTA = '${Pedido.Nota}', ` : `NOTA = null, `
                QryPedido += `ESTADO = 'C' `
                QryPedido += `WHERE `
                QryPedido += `VENTA_ID = ${Pedido.Venta_id};`

                return connection.execute(
                    QryPedido, (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                return reject("UPDATE pedido failed", err)
                            });
                        }

                        let QryVenta = `UPDATE venta `
                        QryVenta += `SET `
                        QryVenta += `MEDIOPAGO = ${Venta.MedioPago} , `
                        QryVenta += `PRECIOTOTALVENTA = ${Venta.PrecioTotalVenta} , `
                        QryVenta += Venta.Cliente_id ? `CLIENTE_ID = ${Venta.Cliente_id} , ` : `CLIENTE_ID = null, `
                        QryVenta += `FECHA = '${Venta.Fecha}' , `
                        QryVenta += `DCTO = ${Venta.Dcto} , `
                        QryVenta += Venta.Observacion ? `OBSERVACION = '${Venta.Observacion}' ` : `OBSERVACION = null `
                        QryVenta += `WHERE `
                        QryVenta += `_ID = ${Pedido.Venta_id}; `

                        return connection.execute(
                            QryVenta, (err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return reject("UPDATE venta failed");
                                    });
                                }

                                return connection.commit((err) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            res.sendStatus(500)
                                            return reject("Commit failed");
                                        });
                                    }
                                    connection.release();
                                    res.sendStatus(200)
                                });

                            })
                    }
                )
            });

        });

    });
}

const CompletarPedidoRapido = async (req, res) => {

    const { id_venta } = req.body

    return new Promise((resolve, reject) => {
        getConnectionMysql2().getConnection((err, connection) => {
            if (err) {
                console.log("🚀 ~ file: pedido.controller.js:530 ~ getConnectionMysql2 ~ err:", err)
                res.sendStatus(500)
                return reject("Error occurred while getting the connection", err);
            }
            return connection.beginTransaction(err => {
                if (err) {
                    console.log("🚀 ~ file: pedido.controller.js:535 ~ getConnectionMysql2 ~ err:", err)
                    connection.release();
                    res.sendStatus(500)
                    return reject("Error occurred while creating the transaction", err);
                }

                let QryPedido = `UPDATE pedido `
                QryPedido += `SET `
                QryPedido += `ESTADO = 'C' `
                QryPedido += `WHERE `
                QryPedido += `VENTA_ID = ${id_venta};`

                connection.execute(QryPedido, (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            res.sendStatus(500)
                            return reject("UPDATE pedido failed", err)
                        });
                    }

                    let QryVenta = `UPDATE venta `
                    QryVenta += `SET `
                    QryVenta += `FECHA = UTC_DATE `
                    QryVenta += `WHERE `
                    QryVenta += `_ID = ${id_venta}; `

                    connection.execute(QryVenta, (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                res.sendStatus(500)
                                return reject("UPDATE venta failed", err)
                            });
                        }

                        return connection.commit((err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    res.sendStatus(500)
                                    return reject("Commit failed");
                                });
                            }
                            connection.release();
                            res.sendStatus(200)
                        });

                    })
                })

            });

        })
    }
    )



}

export const methods = {
    getPedidos,
    deletePedido,
    getPedido,
    CompletarPedido,
    CompletarPedido2,
    CompletarPedidoRapido
};