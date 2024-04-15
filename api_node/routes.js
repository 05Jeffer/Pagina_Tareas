const express = require('express')
const routes = express.Router()

routes.get('', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT*FROM HOMEWORK', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO homework set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Tarea insertada')
        })
    })
})

routes.put('/:id', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE homework set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Tarea actualizada')
        })
    })
})

routes.delete('/:id', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM homework WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Tarea eliminada')
        })
    })
})
module.exports = routes