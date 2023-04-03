const ProductManager = require("./productManager") 
const prodManager = new ProductManager("./data/products.json")
let express = require("express")
let app = express()


app.use(express.urlencoded({extended: true})) //permite recibir url complejas en express

app.get("/",async(request,response)=>{
    try{
        
        response.send("buenas")
    }
    catch(error){
        console.log(error)
    }
})
app.get("/products",async(request,response)=>{
    try{
        let {limit} = request.query     // no olvidar del destructury 
        let productos = await prodManager.getProduct()
        if(!limit){
            response.send(productos)
        }
        else{
            response.send(productos.slice(0,limit))
        }
    }
    catch(error){
        console.log(error)
    }
})
app.get("/products/:pid",async(request,response)=>{
    try{
        let id = request.params.pid
        let producto = await prodManager.getProductById(parseInt(id))   // uso parseInt para transformar la id que se obtiene en formato string a formato numerico
        if(!producto){
            response.send( await prodManager.getProduct())
        }
        else{
            response.send(await producto)
        }


    }
    catch(error){
        console.log(error)
    }
})

app.listen(8080,()=>{
    console.log("escuchando 8080")
})

