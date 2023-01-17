import { Button, Container, TextField, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { StructuralNavigation } from "../../components/StructuralNavigation";
import { useToast } from "../../hooks/useToast";
import Author from "../../model/Author";
import api from "../../services/api";

const AuthorForm = () => {
  const [author, setAuthor] = useState<Author | null>(null);
  const router = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const { addToast } = useToast();
  const { handleSubmit, register } = useForm<Author>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      console.log(id);
      api.get<Author>(`authors/${id}`).then(({ data }) => {
        console.log(data);
        setAuthor(data)
      });
    }
  }, [id]);

  const onSubmit = async (author: Author) => {
    let request;
    if (id) {
      request = api.put(`authors/${id}`, author);
    } else {
      request = api.post("authors", author);
    }
    await request.then(response => addToast({ message: "Autor salvo com sucesso!", type: "success" }))
      .catch(reason => addToast({ message: "Não foi possível salvar o autor!", type: "error" }));
    router.goBack();
  }

  if (!author && id) {
    return <div>Loading...</div>;
  }

  // todo change structural navigation 
  return (
    <Container>
      <StructuralNavigation path={location.pathname} title="novo autor" />

      <Container component="main" maxWidth="md">
        <form
          style={{
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(1),
          }}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome do autor"
            defaultValue={author?.name}
            {...register("name")}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="about"
            label="Sobre"
            defaultValue={author?.about}
            {...register("about")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="E-mail"
            defaultValue={author?.email}
            {...register("email")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: theme.spacing(3, 0, 2) }}
          >Salvar</Button>
        </form>
      </Container>
    </Container>
  );
};

export default AuthorForm;
