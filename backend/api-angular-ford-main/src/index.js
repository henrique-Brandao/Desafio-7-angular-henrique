const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/img', express.static(path.join(__dirname, "..", "public/img")));

const users = [
    {
        id: 1,
        nome: "Admin User",
        email: "admin",
        password: "123"
    }
];
let nextUserId = 2;

app.post("/register", async (req, res) => {
    try {
        const { email, password, nome } = req.body;
        console.log('BACKEND /register - Recebido:', req.body);

        if (!email || !password) {
            return res.status(400).json({ message: "E-mail e senha são obrigatórios!" });
        }
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({ message: "Este e-mail já está cadastrado." });
        }

        const newUser = {
            id: nextUserId++,
            nome: nome || email.split('@')[0],
            email: email,
            password: password
        };
        console.log('BACKEND /register - Novo usuário a ser salvo:', newUser);
        users.push(newUser);
        console.log('BACKEND /register - Array users ATUALIZADO:', users);

        return res.status(201).json({
            id: newUser.id,
            nome: newUser.nome,
            email: newUser.email
        });
    } catch (error) {
        console.error("BACKEND /register - Erro no registro:", error);
        return res.status(500).json({ message: "Falha ao registrar usuário." });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;
        console.log('BACKEND /login - Recebido:', req.body);
        console.log('BACKEND /login - Estado ATUAL do array users ANTES da busca:', users);

        if (!email || !senha) {
            return res.status(400).json({ message: "O campo de e-mail ou senha não foi preenchido!" });
        }

        const user = users.find(u => u.email === email);
        console.log('BACKEND /login - Usuário encontrado pelo email:', user);

        if (!user) {
            return res.status(401).json({ message: "E-mail ou senha incorretos ou usuário não cadastrado!" });
        }

        if (user.password !== senha) {
            console.log('BACKEND /login - Senhas não coincidem. Fornecida:', senha, 'Armazenada:', user.password);
            return res.status(401).json({ message: "E-mail ou senha incorretos ou usuário não cadastrado!" });
        }

        console.log("Login bem-sucedido para:", user.email);
        return res.status(200).json({
            id: user.id,
            nome: user.nome,
            email: user.email
        });
    } catch (error) {
        console.error("BACKEND /login - Erro no login:", error);
        return res.status(500).json({ message: "Falha na comunicação com o servidor!" });
    }
});

app.get("/vehicles", (req, res) => {
    try {
        const vehicles = [
            { id: 1, vehicle: "Ranger", volumetotal: 4234, connected: 500, softwareUpdates: 953, img: "http://localhost:3001/img/ranger.png", vin: "2FRHDUYS2Y63NHD22454" },
            { id: 2, vehicle: "Mustang", volumetotal: 1500, connected: 500, softwareUpdates: 750, img: "http://localhost:3001/img/mustang.png", vin: "2RFAASOYS4E4HDU34875" },
            { id: 3, vehicle: "Territory", volumetotal: 4560, connected: 500, softwareUpdates: 3050, img: "http://localhost:3001/img/territory.png", vin: "2FHSVCS4E4HDU27562" },
            { id: 4, vehicle: "Bronco Sport", volumetotal: 2354, connected: 500, softwareUpdates: 1932, img: "http://localhost:3001/img/broncoSport.png", vin: "2CHVVJGYS6E4HDR33455" }
        ];
        return res.status(200).json({ vehicles });
    } catch (error) {
        return res.status(500).json({ message: "Falha na comunicação com o servidor!" });
    }
});

app.post("/vehicleData", (req, res) => {
    try {
        const { vin } = req.body;
        switch (vin) {
            case "2FRHDUYS2Y63NHD22454": return res.status(200).json({ id: 1, odometro: 50000, nivelCombustivel: 90, status: "on", lat: -12.2322, long: -35.2314 });
            case "2RFAASOYS4E4HDU34875": return res.status(200).json({ id: 2, odometro: 10000, nivelCombustivel: 70, status: "on", lat: -12.2322, long: -35.2314 });
            case "2FHSVCS4E4HDU27562": return res.status(200).json({ id: 3, odometro: 43000, nivelCombustivel: 90, status: "on", lat: -12.2322, long: -35.2314 });
            case "2CHVVJGYS6E4HDR33455": return res.status(200).json({ id: 4, odometro: 3000, nivelCombustivel: 40, status: "on", lat: -12.2322, long: -35.2314 });
            default: return res.status(400).json({ message: "Código VIN utilizado não foi encontrado!" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Falha na comunicação com o servidor!" });
    }
});

app.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001/");
    console.log("Usuários iniciais (incluindo admin com senha em texto plano):", users);
});
