import { pool } from "./../database/conexion.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const Register = async (req, res) => {
    try {
      const { nombres, email, password } = req.body;
      const bcryptPassword = bcrypt.hashSync(password, 12);
      const response = await pool.query(
        `INSERT INTO user (nombres, email, password) VALUES ('${nombres}', '${email}', '${bcryptPassword}')`
      );
      if (response.length > 0) {
        res.status(200).json("Usuario registrado");
      } else {
        res.status(404).json("Usuario no confirmado");
      }
    } catch (error) {
      res.status(500).json("Error en el sistema" + error);
    }
  };

export const validate = async (req, res) => {
    try {
      const { email, password } = req.body;
      const sql = `SELECT * FROM user WHERE email = '${email}'`;
      const [rows] = await pool.query(sql);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Email incorrecto" });
      }
      const user = rows[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).json({ message: "Contraseña incorrecta" });
      }
      const token = jwt.sign({ rows }, process.env.AUT_SECRET, {
        expiresIn: process.env.AUT_EXPIRE,
      });
      res.status(200).json({ user, token, message: "Iniciaste sesion!!" });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor" + error });
    }
  };

export const validarToken = async (req, res, next) => {

    try {
        
        let tokenClient = req.headers['token']

        if(!tokenClient){
            return res.status(403).json({'message': 'Token es requerido'})
        }else{
            const token = jwt.verify(tokenClient, process.env.AUT_SECRET, (error, decoded) => {
                if(error){
                    return res.status(403).json({message: 'Token es obligatorio'})
                }else{
                    next()
                }
            })
        }

    } catch (error) {
        return res.status(500).json({status: 500, message: 'Error del servidor' + error})
    }
    
}