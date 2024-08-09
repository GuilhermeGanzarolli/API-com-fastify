import fastify from "fastify";
import cors from "@fastify/cors"

//Criar um servido
const server = fastify({logger: true})

server.register(cors, {
    origin: ["www.teste.com", "www.teste2.com"], // ou *,   Somente esses sites vão poder consumir esta API
    methods: ["GETS", "POST"] // Somente esses métodos poderam ser utilizados nesta API
})

const teams = [
    {id:1, name:"Ferrari", base:"Italy"},
    {id:2, name:"Mercedes", base:"Brancley"},
    {id:3, name:"Red Bull Racing", base:"Milton Keynes"},
]

const drivers = [
    {id:1,name:"Guilherme",team: "Red Bull Racing"},
    {id:2,name:"Rafaela",team: "Ferrari"},
    {id:3,name:"Silva",team: "Mercedes"},
]

server.get("/teams",async(request, response)=>{
    response.type("application/json").code(200)

    return {teams}
})

server.get("/drivers", async(request, response) => {
    response.type("application/json").code(200)

    return {drivers}
})



interface DriverParams{
    id:string
}

server.get<{Params:DriverParams}>("/driver/:id", async(request, response) => {

    const id = parseInt(request.params.id)
    const driver = drivers.find(d=>d.id===id)

    if (!driver) {
        response.type("application/json").code(404)
        return {message: "Driver Not Found"}

    }else{
        response.type("application/json").code(200)
        return {driver}
    }
})




server.listen({port: 3333}, ()=>{
    console.log("Server iniciado na porta 3333")
})