import colors from 'colors'
import express from 'express'
import connect from './connect'
import cors from 'cors'

import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json());

app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/article', (req, res) => {
    connect.query('select * from article', function(error, result) {
        if (error) {
            res.send({status:'error', message:error})
        } else {
            res.send(result)
        }
    })
})

app.get('/article/:id', (req, res) => {
    const id = req.params.id.toString()
    if (id.match(/[0-9]/g)) {
        connect.query(`select * from article where id=${id}`, function(error, result) {
            if(error) {
                res.send({status:'error', message:error})
            } else {
                res.send(result)
            }
        })
    } else {
        res.send({status:'error', message:'id undefined'})
    }
})

app.post('/article/add', (req, res) => {
    const title = req.body.title
    if (title) {
        connect.query(`insert into article (title) values ('${title}')`, function(error, result) {
            if(error) {
                res.send({status:'error', message:error})
            } else {
                res.send(result)
            }
        })
    } else {
        res.send({status:'error', message:'title undefined'})
    }
})

app.put('/article/update/:id', (req, res) => {
    const id = req.params.id
    const newtitle = req.body.title
    if (newtitle) {
        if (id) {
            connect.query(`UPDATE article SET title = '${newtitle}' WHERE id = '${id}'`, function(error, result) {
                if(error) {
                    res.send({status:'error', message:error})
                } else {
                    res.send(result)
                }
            })
        } else {
            res.send({status:'error', message:'id undefined'})
        }
    } else {
        res.send({status:'error', message:'title undefined'})
    }
})

app.listen(PORT, () => {
    console.log(`[IF] Starting server`.blue)
    console.log(`[OK] ► Server ON, port is ${PORT}`.green)
})