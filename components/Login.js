
import { useLocation } from "react-router-dom"
import styles from "../styles/login.module.css"
import { useRef,useState } from "react"
import axios from "axios"


const initialState = {
    name: '',
    email: '',
    password: '',
  }
const Login = () => {
    const PathName = useLocation()
    const formulario__login = useRef(null)
    const contenedor__login_register = useRef(null)
    const formulario__register = useRef(null)
    const caja__trasera_register = useRef(null)
    const caja__trasera_login = useRef(null)

    const[form,setForm]=useState(initialState)
    
    function iniciarSesion() {
        if (window.innerWidth > 850) {
            formulario__login.current.style.display = "block";
            contenedor__login_register.current.style.left = "10px";
            formulario__register.current.style.display = "none";
            caja__trasera_register.current.style.opacity = "1";
            caja__trasera_login.current.style.opacity = "0";
        } else {
            formulario__login.current.style.display = "block";
            contenedor__login_register.current.style.left = "0px";
            formulario__register.current.style.display = "none";
            caja__trasera_register.current.style.display = "block";
            caja__trasera_login.current.style.display = "none";
        }
    }
    function register() {
        if (window.innerWidth > 850) {
            formulario__register.current.style.display = "block";
            contenedor__login_register.current.style.left = "410px";
            formulario__login.current.style.display = "none";
            caja__trasera_register.current.style.opacity = "0";
            caja__trasera_login.current.style.opacity = "1";
        } else {
            formulario__register.current.style.display = "block";
            contenedor__login_register.current.style.left = "0px";
            formulario__login.current.style.display = "none";
            caja__trasera_register.current.style.display = "none";
            caja__trasera_login.current.style.display = "block";
            caja__trasera_login.current.style.opacity = "1";
        }
    }

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})

    }

    const handleRegister =async(e) =>{
         e.preventDefault()
         const user = {name:form.name,email:form.email,password:form.password}
           await axios.post("http://localhost:5000/api/user/register",user)
           .then((res)=>{
            console.log(res.data.msg)
           } )
           .catch((error)=>{
            console.log(error)
           })

    }
    return (

        <main className={styles.main}>

            <div className={styles.contenedor__todo}>
                <div className={styles.caja__trasera}>
                    <div ref={caja__trasera_login}    className={styles.caja__trasera_login}>
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para entrar en la página</p>
                        <button id="btn__iniciar-sesion" onClick={iniciarSesion}>Iniciar Sesión</button>
                    </div>
                    <div ref={caja__trasera_register}  className={styles.caja__trasera_register}>
                        <h3>¿Aún no tienes una cuenta?</h3>
                        <p>Regístrate para que puedas iniciar sesión</p>
                        <button id="btn__registrarse" onClick={register}>Regístrarse</button>
                    </div>
                </div>


                <div ref={contenedor__login_register} className={styles.contenedor__login_register}>

                    <form ref={formulario__login}  onSubmit={handleRegister} className={styles.formulario__login}>
                        <h2>Iniciar Sesión</h2>
                        <input type="text" placeholder="Correo Electronico" name="email" value={form.email} onChange={handleChange} />
                        <input type="password" placeholder="Contraseña"  name="password" value={form.password} onChange={handleChange}/>
                        <button>Entrar</button>
                    </form>


                    <form  ref={formulario__register} onSubmit={handleRegister}  className={styles.formulario__register}>
                        <h2>Regístrarse</h2>
                        <input type="text" placeholder="Nombre completo" name="name" value={form.name} onChange={handleChange}/>
                        <input type="text" placeholder="Correo Electronico"name="email"value={form.email} onChange={handleChange} />
                       
                        <input type="password" placeholder="Contraseña" name="password" value={form.password} onChange={handleChange}/>
                        <button type="submit">Regístrarse</button>
                    </form>
                </div>
            </div>

        </main>

    )
}



export default Login