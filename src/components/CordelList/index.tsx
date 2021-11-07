import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@material-ui/core'
import { Edit as EditIcon, Description as DescriptionIcon } from '@material-ui/icons';
import { Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { useFetch } from '../../hooks/useFetch';

export interface Cordel {
  id: number;
  title: string;
  xilogravuraUrl: string;
  authorName: string;
}

interface CordelRequest {
  content: Cordel[];
}

export const CordelList = () => {

  const router = useHistory()

  const { data, mutate } = useFetch<CordelRequest>(
    `cordels/summaries`
  );

  const handleClickEditButton = (id: number) => {
    router.push(`edit/${id}`)
  }

  if (!data) return (<>{[1, 2, 3, 4, 5, 6].map(n => (
    <ListItem key={n}>
      <ListItemAvatar>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      </ListItemAvatar>
      <ListItemText primary={<Skeleton width="50%"></Skeleton>} secondary={<Skeleton width="80%"></Skeleton>} />
    </ListItem>
  ))}</>)

  return (
    <List >
      {data.content.map(({ id, title, authorName }, index) => (<Fragment
        key={id}>
        {index ? <Divider variant="inset" component="li" /> : null}
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="edit" onClick={() => handleClickEditButton(id)}>
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
            primary={title}
            secondary={authorName}
          />
        </ListItem>
      </Fragment>)
      )}
    </List>
  )
}