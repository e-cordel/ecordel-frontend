import {
  Avatar,
  Button,
  Container,
  Grid,
  Link,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { CordelDetailsInterface } from "../../components/CordelViewer";
import { useFetch } from "../../hooks/useFetch";
import { useToast } from "../../hooks/useToast";

interface EditCordelValues {
  title: string;
  author: string;
  content: string;
  published: boolean;
  tags?: Array<string>;
  xilogravuraUrl?: string;
}

export default function EditCordel() {

  const { id } = useParams<{ id: string }>()

  const { data: cordel } = useFetch<CordelDetailsInterface, Error>(`cordels/${id}`);


  const theme = useTheme()

  const { handleSubmit, register } = useForm();


  const onSubmit = async (data: EditCordelValues) => {
    // try {
    //   await signIn(data);
    //   console.table(data);
    //   addToast({ message: "credenciais Ok!", type: "success" });
    //   history.push("/");
    //   addToast({ message: "Usuário atenticado com sucesso", type: "success" });
    // } catch (error) {
    //   addToast({ message: "credenciais inválidas", type: "error" });
    // }
  };

  if (!cordel) return <EditCordelSkeleton />

  return (
    <Container component="main" maxWidth="md">
      <div
        style={{
          marginTop: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Editar Cordel
        </Typography>
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
            id="title"
            label="Título do Cordel"
            autoComplete="title"
            defaultValue={cordel.title}
            autoFocus
            {...register("title")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="URL da Xilogravura"
            type="xilogravuraUrl"
            id="xilogravuraUrl"
            defaultValue={cordel.xilogravuraUrl}
            autoComplete="Xilogravura"
            {...register("xilogravuraUrl")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="author"
            type="author"
            id="author"
            defaultValue={cordel.author.name}
            autoComplete="Author"
            {...register("author")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Texto do Cordel"
            type="content"
            id="content"
            defaultValue={cordel.content}
            multiline
            rows="15"
            {...register("content")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: theme.spacing(3, 0, 2) }}
          >
            Salvar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/cordels/review">
                Voltar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )

}


const EditCordelSkeleton = () => {

  const theme = useTheme()

  return (
    <Container component="main" maxWidth="md">
      <div
        style={{
          marginTop: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Editar Cordel
        </Typography>
        <form
          style={{
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(1),
          }}
        >
          <Skeleton height={80} />
          <Skeleton height={80} />
          <Skeleton variant="rectangular" height={400} />
          <Skeleton height={80} />

        </form>
      </div>
    </Container>
  )
}