import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import Swal from 'sweetalert2';

export const RegisterPage = () => {

    const {register} = useContext(AuthContext);

    const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
    })

    const onChange = ({target}) => {
      const {name, value} = target;
      setForm({
        ...form,
        [name]: value,
      })
    }

    const onSubmit = async(ev) => {
      ev.preventDefault();

      if(!(form.name.length > 0 && form.email.length > 0 && form.password.length > 0)){
        Swal.fire('Error', 'Los 3 campos son requeridos', 'error')
        return;
      }

      const ok = await register(form.name, form.email, form.password);

      if(!ok){
        Swal.fire('Error', 'Error al crear cuenta, probablemente ya existe una cuenta con ese correo', 'error')
      }

    }

  return (
    <form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmit}>
      <span className="login100-form-title mb-3">
        Chat - Registro
      </span>

      <div className="wrap-input100 validate-input mb-3">
        <input className="input100" type="text" name="name" placeholder="Nombre" value={form.name} onChange={onChange} />
        <span className="focus-input100"></span>
      </div>

      
      <div className="wrap-input100 validate-input mb-3">
        <input className="input100" type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <span className="focus-input100"></span>
      </div>
      
      
      <div className="wrap-input100 validate-input mb-3">
        <input className="input100" type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />
        <span className="focus-input100"></span>
      </div>
      
      <div className="row mb-3">
        <div className="col text-end">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button className="login100-form-btn" type="submit">
          Crear cuenta
        </button>
      </div>

    </form>
  )
}
