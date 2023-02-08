import { Breadcrumbs, Container, Link } from '@mui/material';
import { Home } from '@mui/icons-material'
import { useHistory } from 'react-router';



export const StructuralNavigation = ({ path, title }: { path: string, title?: string }) => {

  const router = useHistory()

  const handleClick = (url: string) => {
    router.push(url);
  }

  const buildUrl = (item: string) => path.substring(0, path.indexOf(item) + item.length)

  const buildLabel = (item: string) =>
    path.indexOf(item) + item.length === path.length ? title : item


  return (
    <Container component="div" sx={{
      padding: 2,
    }}>
      {/* <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link
          key="breadcrumb-home"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          onClick={() => handleClick('/')}
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        {
          path.split('/').slice(1).map((item) => (
            <Link
              key={`breadcrumb-${item}`}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              onClick={() => handleClick(buildUrl(item))}
            >
              {buildLabel(item)}
            </Link>))
        }
      </Breadcrumbs> */}
    </Container >
  )
}
