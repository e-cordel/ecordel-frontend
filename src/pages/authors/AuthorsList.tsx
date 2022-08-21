import { Avatar, Container, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Edit as EditIcon, Description as DescriptionIcon } from '@material-ui/icons';
import { Fragment } from 'react';
import { useLocation } from "react-router-dom";
import { StructuralNavigation } from "../../components/StructuralNavigation";
import { useFetch } from "../../hooks/useFetch";
import Author from "../../model/Author";

interface AuthorRequest {
  content: Author[];
}

const AuthorList = () => {
  const location = useLocation();
  const { data } = useFetch<AuthorRequest>("authors");
  const handleClickEditButton = (author: Author) => {
    alert(author.id);
  }

  return (
    <Container>
      <StructuralNavigation path={location.pathname} title="Authors" />
      { 
        data && <List >
        {data.content.map((author, index) => (<Fragment
          key={author.id}>
          {index ? <Divider variant="inset" component="li" /> : null}
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="edit" onClick={() => handleClickEditButton(author)}>
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
