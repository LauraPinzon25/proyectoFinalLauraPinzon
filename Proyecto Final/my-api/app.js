const express=require("express");
const app=express();
const database=require("./database")
const nodemailer=require("nodemailer")

app.set("port",4000);//puerto

//Ruta html inicio
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname +'/public/html/index.html');});

//consulta pelicula y actor para la compra
app.get("/ruta",async(req,res)=>{
   const conection=await database.getConnection()
   const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;
   const resultado=await conection.query(`select actor.first_name,actor.last_name,film.title,film.description from film_actor 
   inner join actor on actor.actor_id=film_actor.actor_id inner join film on film.film_id=film_actor.film_id LIMIT 
   ${limit} OFFSET ${offset}`);
   res.json(resultado);
})

//Enviar correo de la compra
app.use(express.urlencoded({ extended: false }));// Middleware para analizar el cuerpo de las solicitudes POST
app.use(express.json());

    const transporte = nodemailer.createTransport({// Configurar el transporte para enviar correos electrónicos
      service: 'Gmail', // Cambia esto según tu proveedor de correo electrónico
      auth: {
          user: '', 
          pass: '' 
      }
    });
    app.post('/enviar-correo', async (req, res) => {
      const {nombre,apellido,telefono,to,totalPrecio} = req.body;
      try {
    const mailOptions={
      from: "laurapinzonf1@gmail.com",
      to: to,
      subject: 'Confirmación de compra',
      html: ` 
      <p style="font-size: 20px;">Hola ${nombre} ${apellido},</p>
      <p style="font-size: 20px;">Gracias por tu compra. El total de tu compra es de $${totalPrecio}.</p>
      <p style="font-size: 20px;">Tu telefono es: ${telefono}.</p>
      <p style="font-size: 20px;">Comunicate al número (+57)30000000, para concluir tu compra.</p>
      <p style="font-size: 20px;">Saludos😉,</p>
      <p style="font-size: 20px;">Tu tienda pelis.</p>
  `
    };await transporte.sendMail(mailOptions);
    res.json({ success: true });
    
} catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ success: false });
}
});

//consulta lenguaje de la pelicula
app.get("/lenguaje",async(req,res)=>{
  const conection=await database.getConnection()
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const resultado=await conection.query(`SELECT film.title, language.name from film inner join 
  language on language.language_id=film.language_id LIMIT 
  ${limit} OFFSET ${offset}`);
  res.json(resultado);
})

//consulta categoria de la pelicula
app.get("/categoria",async(req,res)=>{
  const conection=await database.getConnection()
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const resultado=await conection.query(`SELECT category.name, film.title FROM film_category 
  INNER JOIN category ON category.category_id = film_category.category_id 
  INNER JOIN film ON film.film_id = film_category.film_id 
  LIMIT ${limit} OFFSET ${offset}`);
  res.json(resultado);
})

//consulta usuarios
app.get("/usuario",async(req,res)=>{
  const conection=await database.getConnection()
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const resultado=await conection.query(`SELECT customer.first_name, customer.last_name, customer.email from customer
   LIMIT ${limit} OFFSET ${offset}`);
  res.json(resultado);
})

//puerto
app.listen(app.get("port"));
console.log("Escuchando en el puerto"+app.get("port"))
