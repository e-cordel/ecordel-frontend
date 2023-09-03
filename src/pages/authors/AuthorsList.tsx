import { Avatar, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { Edit as EditIcon, Description as DescriptionIcon } from '@mui/icons-material';
import { Fragment } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StructuralNavigation } from "../../components/StructuralNavigation";
import { useFetch } from "../../hooks/useFetch";
import { Author } from '../../types';

interface AuthorRequest {
  content: Author[];
}

const AuthorList = () => {
  const location = useLocation();
  const { data } = useFetch<AuthorRequest>("authors");
  const router = useNavigate();

  const handleClickEditButton = (id: number) => {
    router(`/autores/editar/${id}`)
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={8} xl={10}>
          <StructuralNavigation path={location.pathname} title="Autores" />
        </Grid>
        <Grid item md={2} xl={2}>
          <Container component="div" sx={{ padding: 2, }}>
            <Link to="/autores/novo" >Novo Autor</Link>
          </Container>
        </Grid>
      </Grid>
      { 
        data && <List >
        {data.content.map((author, index) => (<Fragment
          key={author.id}>
          {index ? <Divider variant="inset" component="li" /> : null}
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="edit" onClick={() => handleClickEditButton(author.id)}>
                <EditIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <DescriptionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={author.name}
              secondary={author.email}
            />
          </ListItem>
        </Fragment>)
        )}
      </List>
      }
    </Container >
  );
}

export default AuthorList;
