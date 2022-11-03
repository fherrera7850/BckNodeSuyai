import app from "./app";

const main = () => {
    console.log(process.env.HOST, process.env.PORT, process.env.DBPORT, process.env.USER)
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main();
