import { pool } from "../database/conexion.js"
import { query } from "express"

export const GetRace = async (req, res) => {
    try {
        let sql = 'SELECT * FROM razas'
        const [result] = await pool.query(sql)
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No fue posible listar'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Erro del servidor' + error 
        })
    }
}

export const GetCategories = async (req, res) => {
    try {
        let sql = 'SELECT * FROM categorias'
        const [result] = await pool.query(sql)
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'no fue posible listar las categorias'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error 
        })
    }
}

export const GetGender = async (req, res) => {
    try {
        let sql = 'SELECT * FROM generos'
        const [result] = await pool.query(sql)
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No fue posible listar los generos'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error 
        })
    }
}

export const GetUsers = async (req, res) => {
    try {
        let sql = 'SELECT * FROM user'
        const [result] = await pool.query(sql)
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No fue posible listar los usuarios'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error 
        })
    }
}