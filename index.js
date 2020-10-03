//#######   Importações   #########
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const departmentModel = require('./database/Department');
const usersModel = require('./database/User');
const { raw, text } = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

//##########  vairavel de configurações do nodemailer  ##########
const trasnporter = nodemailer.createTransport({
    host:process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth:{
        user:process.env.NODEMAILER_USER,
        pass:process.env.NODEMAILER_PASSWORD,
    }

})


//###### Database #########
connection
    .authenticate()
    .then(()=>{
        console.log('Conexão com banco de dados');
    })
    .catch((error)=>{console.log(error)});

//####### puxando as importações #####
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//#######  Rotas ##########
app.get('/', (req, res)=>{
    
    usersModel.findAll({raw:true, order:[
        ['id','DESC']//ASC SE FOR CRESCENTE
    ]}).then((usuario)=>{
        departmentModel.findAll({raw:true})
            .then((departamento)=>{
                res.render('landingPage',{
                    usuarios: usuario,
                    departamentos: departamento
            })
        });
    })
});

app.get('/register', (req,res)=>{
    departmentModel.findAll({raw:true, order:[
        ['id','ASC']
    ]}).then((departamentos)=>{
        let count = 1;
        res.render('signUp',{
        departamentos:departamentos,
        count:count
    });    
    })
});

app.get('/registerDepartment', (req,res)=>{
    res.render('department');
});

app.get('/editar/:id',(req, res)=>{
    let id = req.params.id;
 
    usersModel.findByPk(id).then(edit=>{
        if(edit !=undefined){
            departmentModel.findAll({raw:true}).then((departamentos)=>{
                let count = 1;
                res.render('edit', {
                    edit:edit,
                    id:id,
                    departamentos:departamentos,
                    count:count
                }); 
            });

        }
    })
});

//##### Todos os metodos POST ###########
app.post('/saveRegistration',(req,res)=>{
    const email = req.body.email;
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const cpf = req.body.cpf;
    const departamento = req.body.departamento;
    
    if(nome === "" || email === "" || telefone === "" || cpf === "" || departamento === "")
        return res.status(404).send("Preencha todos os dados")

    usersModel.create({
        email:email,
        nome:nome,
        telefone: telefone,
        cpf:cpf,
        departamentoId:departamento
    }).then(()=>{
            res.redirect("/");

            //#### Função para encaminhar os dados
            async function run(){
                const sendMail = await trasnporter.sendMail({
                    text:"Olá "+nome+", como você está? Aqui quem fala é o Gabriel. Seja bem vindo a plataforma Desafio Tech!!",
                    subject:'Bem vindo a plataforma Desafio Tech',
                    from:'Desafio Tech<desafiotech52@gmail.com>',
                    to:email
                })
                console.log(sendMail)
            }
            return run()
        
    }).catch((err)=>{
        return sconsole.log(err);
    });}
    );

app.post('/saveDepartment',(req,res)=>{
    const nome = req.body.departamento;
    if(nome === "")
        return res.status(404).send("Preencha todos os dados")
    departmentModel.create({
        nome:nome
    }).then(()=>{
        res.redirect("/");
    }).catch(()=>{
        console.log(error);
    });
});
 app.post('/usersUpdate',(req,res)=>{
    let id = req.body.id;
    const email = req.body.email;
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const cpf = req.body.cpf;
    const departamento = req.body.departamento;

    if(nome === "" || email === "" || telefone === "" || cpf === "" || departamento === "")
        return res.status(404).send("Preencha todos os dados")
    
        usersModel.update({
        email:email,
        nome:nome,
        telefone: telefone,
        cpf:cpf,
        departamentoId:departamento
        
    },{
        where:{ id:id}
    }).then(()=>{
            res.redirect('/')
        })    
    
});


//########  Servidor  ########
app.listen(8080 || process.env.PORT);
