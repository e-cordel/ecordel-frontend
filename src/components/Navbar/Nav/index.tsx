
import { Button, Link } from '@mui/material'
import { useHistory } from 'react-router'
import { useAuth } from '../../../hooks/useAuth'

export default function Nav() {

  const { user } = useAuth();

  const router = useHistory();

  const linkStyles = { my: 1, mx: 1.5, textDecoration: 'none', color: "text.primary" };

  return (
    <nav>
      {user && <>
        <Link
          component={Button}
          variant="button"
          color="text.primary"
          sx={linkStyles}
          onClick={() => router.push('/revisao')}
        >
          Revisão de Cordéis
        </Link>
        <Link
          component={Button}
          variant="button"
          color="text.primary"
          sx={linkStyles}
          onClick={() => router.push('/autores')}
        >
          Autores
        </Link>
      </>
      }
    </nav >
  )
}
