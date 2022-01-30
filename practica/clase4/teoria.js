//Aplicación Restfull
//operan en forma de servidores web,
//respondiendo consultas a través de
//internet respetando algunas reglas y convenciones.

//Diferencia entre RestLess y RestFull
//uno se basa en funciones y el otro en verbos.

//Funcionamiento del protocolo HTTP
//El usuario genera un request, viaja a internet llega al servidor donde tendremos la API
//La API mira los headers y siempre tenemos que retornar una response.
//Es un Protocolo de transferencia de datos
//Es un Protocolo de comunicacion
//Hay otros protocolos de comunicacion como lo son los socket
//El protocolo HTTP establece varios tipos de peticiones siendo las principales
//VERBOS HTTP más utilizados: POST GET PUT DELETE

//Etapas de comunicación HTTP

//HTTP: Códigos de Estado
//1xx Informativo
//2xx Exito
//3xx Redirección
//4xx Error del cliente (Falla el Front)
//5xx Error el servidor (Falla el Backend)

//Errores 500 son errores de BackEnd (Errores del servidor)
//Errores 400 errores del cliente

//Conceptos de API, Rest y API REST
//API => Es una aplicación que recibe request por diferentes rutas
//y por medio de esas rutas procesamos lo que quiere el cliente
//Rest => Transferencia de Estado Representacional =>
//Esto implica el envío de datos (con una determianda estructura) entre dos parte.
//Los formatos más utilizados son XML y JSON
//Cuando utilizamos el formato XML el
//protocolo de comunicación se llama SOAP
//Cuando utilizamos JSON se trata de RestFull
//RestLess es la unión de ambos

//Diferencia entre los formatos
//XML se utiliza más para datos sensibles
//JSON para manejo más rápido y flexible, pesa menos, etc.

//API Rest
//Es un tipo de API que no dispone de interfaz gráfica, se utiliza
//exclusivamente para comunicación entre sistemas mediante protocolo HTTP
//Para que una API se considere REST, debe cumplir con las siguientes características:

//Arquitectura CLiente-Servidor sin Estado
//*Cacheable
//*Operaciones Comunes
//*Interfaz Uniforme
//*Utilización de hipermedios

//Arquitectura CLiente-Servidor sin Estado
//1.Cada mensaje HTTP contiene toda la información necesaria para comprender una petición.
//2.Como resultado, ni el cliente ni el servidor necesitan recordar ningún estado de las comunicaciones entre mensajes.
//3.Esta restricción mantiene al cliente y al servidor débilmente acoplados: el cliente no necesita conocer los detalles de implementación del servidor
//y el servidor se "despreocupa" de como son usados los datos que envía al cliente.

//Principios RestfulAPI

//Manejo de peticiones HTTP por Express

//IMPORTANTE => Configuración Extra

//POSTMAN

//Manejo de las rutas
//Express Router
//Router es una clase de Express que nos va a ayudar
//a crear "mini-aplicaciones" para manejar solicitudes de rutas

//Servicio de archivos estáticos en Express
//Vamos a ver ahora como acceder a archivos estáticos mediante express
//esto lo vamso a trabajar con el método static de express
//Multiples directorios
//Prefijo Virtual
//Path Absouluto
//Resumen

//Middleware
//Las funciones del Middleware son aquellas que tiene acceso a los request que envían desde el Front
//y puede modificar el objeto respuesta que viene por medio del request
//Funcionalidad de los Middleware:

//Middleware: En pocas palabras es una funcion que se ejecuta antes de llegar a nuestras rutas
//y todos sabemos que en nuestras rutas vamos a tener las logicas de negocio

//Tipos de Middleware

//Subir Archivos: Multer
//Multer es un middleware de Express que permite
//manipular de forma más fácil los form multiplataforma cuando se suben archivos.
