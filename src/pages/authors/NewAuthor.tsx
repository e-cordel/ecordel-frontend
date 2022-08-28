import { Button, Container, TextField, useTheme } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { StructuralNavigation } from "../../components/StructuralNavigation";
import { useToast } from "../../hooks/useToast";
import Author from "../../model/Author";
import api from "../../services/api";

const NewAuthor = () => {
  const router = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const { addToast } = useToast();
  const { handleSubmit, register } = useForm<Author>();

  const onSubmit = async (author: Author) => {
    await api.post("authors/", author)
      .then(response => addToast({ message: "Autor salvo com sucesso!", type: "success" }))
      .catch(reason => addToast({ message: "Não foi possível salvar o autor!", type: "error" }));
    router.goBack();
  }

  return <Container>
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
          {...register("name")}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="about"
          label="Sobre"
          {...register("about")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="E-mail"
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

  </Container>;
};

export default NewAuthor;
