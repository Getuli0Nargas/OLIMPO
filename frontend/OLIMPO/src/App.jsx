import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       
          <div className="login-section">
          <div className="logo">
              <span>OLIMPO</span>
             <div className="logo-icon">🏛️</div>
            </div>
            <p className="welcome">bem vindo(a)!</p>
            <p>acesse sua conta agora mesmo.</p>
            <button className="login-button">ENTRAR</button>
            <a href="#" className="forgot-password">esqueci minha senha</a>
        </div>

        <div className="signup-section">
            <h2>crie sua conta</h2>
            <p>preencha seus dados</p>
            <form>
                <div className="input-field">
                    <span className="icon">👤</span>
                    <input type="text" placeholder="nome" />
                </div>
                <div className="input-field">
                    <span className="icon">📧</span>
                    <input type="email" placeholder="gmail" />
                </div>
                <div className="input-field">
                    <span className="icon">🆔</span>
                    <input type="text" placeholder="CPF" />
                </div>
                <div className="input-field">
                    <span className="icon">🔒</span>
                    <input type="password" placeholder="senha" />
                </div>
                <button className="signup-button">cadastrar</button>
            </form>
        </div>
    </>
  )
}

export default App

