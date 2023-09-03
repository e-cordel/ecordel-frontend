
import { Button, Link } from '@mui/material'
import { useNavigate } from 'react-router'
import { useAuth } from '../../../hooks/useAuth'

export default function Nav() {

  const { user } = useAuth();

  const navigate = useNavigate();

  const linkStyles = { my: 1, mx: 1.5, textDecoration: 'none', color: "text.primary" };

  return (
    <nav>
      {user && <>
        <Link
          component={Button}
          variant="button"
          color="text.primary"
          sx={linkStyles}
          onClick={() => navigate('/revisao')}
        >
          Revisão de Cordéis
        </Link>
        <Link
          component={Button}
          variant="button"
          color="text.primary"
          sx={linkStyles}
          onClick={() => navigate('/autores')}
        >
          Autores
        </Link>
      </>
      }
    </nav >
  )
}
