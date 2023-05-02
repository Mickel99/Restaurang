import { useNavigate } from 'react-router-dom'
import './NotFound.scss'

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="error">
      <article className='error__container'>
        <span className="error__container__message">an error has occurred</span>
        <button
          type="button"
          className="btn primary"
          onClick={() => navigate(-1)}>Back</button>
      </article>
    </div>
  )
}
