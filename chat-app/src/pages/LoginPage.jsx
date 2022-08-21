import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import Swal from 'sweetalert2';

export const LoginPage = () => {

	const {login} = useContext(AuthContext);

	const [form, setForm] = useState({
		email: '',
		password: '',
		rememberMe: false,
	})

	useEffect(() => {
	  const rememberMeEmail = localStorage.getItem('email');
	  if(rememberMeEmail){
		setForm({
			...form,
			rememberMe: true,
			email: rememberMeEmail
		})
	  }
	}, [])
	

	const onChange = ({target}) => {
		const {name, value} = target;
		setForm({
			...form,
			[name]: value,
		})
	}

	const toggleCheck = () => {
		setForm({
			...form,
			rememberMe: !form.rememberMe
		})
	}

	const onSubmit = async(ev) => {
		ev.preventDefault();

		if(!(form.email.length > 0 && form.password.length > 0)){
			Swal.fire('Error', 'Los 2 campos son requeridos', 'error')
			return;
		}

		if(form.rememberMe){
			localStorage.setItem('email', form.email)
		}else{
			localStorage.removeItem('email')
		}

		const ok = await login(form.email, form.password);

		if(!ok){
			Swal.fire('Error', 'Verifique el usuario y contraseña', 'error')
		}

	}

  return (
    <form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmit}>
		<span className="login100-form-title mb-3">
			Chat - Ingreso
		</span>
		
		<div className="wrap-input100 validate-input mb-3">
			<input className="input100" type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} />
			<span className="focus-input100"></span>
		</div>
		
		
		<div className="wrap-input100 validate-input mb-3">
			<input className="input100" type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />
			<span className="focus-input100"></span>
		</div>
		
		<div className="row mb-3">
			<div className="col" onClick={toggleCheck}>
				<input className="input-checkbox100" id="ckb1" type="checkbox" name="rememberMe" checked={form.rememberMe} readOnly />
				<label className="label-checkbox100">
					Recordarme
				</label>
			</div>

			<div className="col text-end">
				<Link to="/auth/register" className="txt1">
					Nueva cuenta?
				</Link>
			</div>
		</div>

		<div className="container-login100-form-btn m-t-17">
			<button className="login100-form-btn" type="submit">
				Ingresar
			</button>
		</div>

	</form>
  )
}
