const express = require("express");
const path = require("path");
const cors = require("cors");
const { status } = require("express/lib/response");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/img', express.static(path.join(__dirname, "..", "public/img")));

app.post("/login", (req, res) => {
    try {
        const { nome, senha } = req.body

        if (!nome || !senha) {
            return res.status(400).json({
                message: "O campo de usuário ou senha não foi preenchido!"
            });
        }

        if (nome !== "admin" || senha !== "123") {
            return res.status(401).json({
                message: "O nome de usuário ou senha está incorreto ou não foi cadastrado!"
            });
        }

        return res.status(200).json({
            id: 1,
            nome: "admin",
            email: "admin@email.com"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.get("/vehicles", (req, res) => {
    try {
        const vehicles = [
            {
                id: 1,
                vehicle: "Ranger",
                volumetotal: 4234,
                connected: 500,
                softwareUpdates: 953,
                img: "http://localhost:3001/img/ranger.png",
                vin: "2FRHDUYS2Y63NHD22454"
            },
            {
                id: 2,
                vehicle: "Mustang",
                volumetotal: 1500,
                connected: 500,
                softwareUpdates: 750,
                img: "http://localhost:3001/img/mustang.png",
                vin: "2RFAASOYS4E4HDU34875"
            },
            {
                id: 3,
                vehicle: "Territory",
                volumetotal: 4560,
                connected: 500,
                softwareUpdates: 3050,
                img: "http://localhost:3001/img/territory.png",
                vin: "2FHSVCS4E4HDU27562"
            },
            {
                id: 4,
                vehicle: "Bronco Sport",
                volumetotal: 2354,
                connected: 500,
                softwareUpdates: 1932,
                img: "http://localhost:3001/img/broncoSport.png",
                vin: "2CHVVJGYS6E4HDR33455"
            }
        ];

        return res.status(200).json({ vehicles });

    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.post("/vehicleData", (req, res) => {
    try {
        const { vin } = req.body

        switch (vin) {
            case "2FRHDUYS2Y63NHD22454":
                return res.status(200).json({
                    id: 1,
                    odometro: 50000,
                    nivelCombustivel: 90,
                    status: "on",
                    lat: -12.2322,
                    long: -35.2314
                });

            case "2RFAASOYS4E4HDU34875":
                return res.status(200).json({
                    id: 2,
                    odometro: 10000,
                    nivelCombustivel: 70,
                    status: "on",
                    lat: -12.2322,
                    long: -35.2314
                });

            case "2FHSVCS4E4HDU27562":
                return res.status(200).json({
                    id: 3,
                    odometro: 43000,
                    nivelCombustivel: 90,
                    status: "on",
                    lat: -12.2322,
                    long: -35.2314
                })

            case "2CHVVJGYS6E4HDR33455":
                return res.status(200).json({
                    id: 4,
                    odometro: 3000,
                    nivelCombustivel: 40,
                    status: "on",
                    lat: -12.2322,
                    long: -35.2314
                });

            default:
                return res.status(400).json({
                    message: "Código VIN utilizado não foi encontrado!"
                });
        }


    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
})

app.listen(3001, () => {
    console.log("http://localhost:3001/");
});
