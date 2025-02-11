import { pool } from "../database/conexion.js";
import { query } from "express";
import multer from "multer";

const storage = multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null, "public/img")
        },
        filename: function(req,file, cb){
            cb(null, file.originalname)
        }
    }
)

const upload = multer({storage: storage})
export const cargarImage = upload.single('image')

export const RegisterPet = async (req, res) => {
    try {
        
        const {nombre, raza, genero, categoria, dueno} = req.body
        let image = req.file.originalname

        let sql = `INSERT INTO mascotas (nombre_mascota,fk_raza, fk_categoria, image, fk_genero, fk_dueno) VALUES (?, ?, ?, ?, ?, ?)`

        const [rows] = await pool.query(sql, [nombre,raza, categoria, image, genero, dueno])

        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se registro la mascota'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No se pudo registrar la mascota'
            })
        }

    } catch (error) {   
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}

export const Getpet = async (req, res) => {
    try {
        let sql = `SELECT id, nombre_mascota, r.*, nombre_categoria AS categoria, nombre_genero AS genero, image 
        FROM mascotas m
        JOIN razas r ON fk_raza = id_raza 
        JOIN categorias ON fk_categoria = id_categoria 
        JOIN generos ON fk_genero = id_genero`

        const [result] = await pool.query(sql)
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No se encontraron mascotas'
            })
        }
    } catch (error) {  
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}

export const UpdatePet = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, raza, genero, categoria } = req.body;
      let image = req.file ? req.file.originalname : null;
      const [anterior] = await pool.query(`SELECT * FROM mascotas WHERE id = ?`, [id])
  
      let sql = `
        UPDATE mascotas SET 
        nombre_mascota = ?,  
        fk_raza = ?,  
        fk_genero = ?,  
        fk_categoria = ?
      `;
  
      const params = [nombre || anterior[0].nombre, raza || anterior[0].raza, genero || anterior[0].genero, categoria || anterior[0].categoria];
      
      if (image) {
        sql += `, image = ?`;
        params.push(image);
      }
  
      sql += ` WHERE id = ?`;
      params.push(id);
  
      const [rows] = await pool.query(sql, params);
  
      if (rows.affectedRows > 0) {
        res.status(200).json({message: "Mascota actualizada",});
      } else {
        res.status(404).json({message: "No se ha podido actualizar la mascota",});
      }
    } catch (error) {
      res.status(500).json({ message: "Error del servidor" + error,});
    }
  };

export const SearchPet = async (req, res) => {
    try {
        const {id} = req.params

        let sql = `SELECT id, nombre_mascota, nombre_raza AS raza, nombre_categoria AS categoria, nombre_genero AS genero, image FROM mascotas JOIN razas ON fk_raza = id_raza JOIN categorias ON fk_categoria = id_categoria JOIN generos ON fk_genero = id_genero  WHERE id = ?`

        const [rows] = await pool.query(sql, [id])
        if(rows.length>0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No se encontraron mascotas'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}

export const DeletePet = async (req, res) => {
    try {
        const {id} = req.params

        let sql = `DELETE FROM mascotas WHERE id = ?`
        const [rows] = await pool.query(sql, id)
        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se eliminó la mascota'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No se ha podido eliminar la mascotas, intente de nuevo'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}