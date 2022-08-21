
import { Button, Link } from '@material-ui/core'
import { useHistory } from 'react-router'
import { useAuth } from '../../../hooks/useAuth'

export default function Nav() {

  const { user } = useAuth();

  const router = useHistory();

  const linkStyles = { my: 1, mx: 1.5, textDecoration: 'none', color: "text.primary" };

  const links = [<Link
    component={Button}
    variant="button"
    color="text.primary"
    sx={linkStyles}
    onClick={() => router.push('/cordels')}
  >
    Cordéis
  </Link>];

  if (user) {
    links.push(<Link
      component={Button}
      variant="button"
      color="text.primary"
      sx={linkStyles}
      onClick={() => router.push('/cordels/review')}
    >
      Revisão de Cordéis
    </Link>);
    links.push(<Link
      component={Button}
      variant="button"
      color="text.primary"
      sx={linkStyles}
      onClick={() => router.push('/authors')}
    >
      Autores
    </Link>);
  }

  return (
    <nav>
      {links}
    </nav >
  )
}
