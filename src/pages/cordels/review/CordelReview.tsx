import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { Cordel } from "../../../types";
import { StructuralNavigation } from "../../../components/StructuralNavigation";
import { useToast } from "../../../hooks/useToast";
import api from "../../../services/api";

interface CordelReviewValues {
  title: string;
  content: string;
  published: boolean;
  xilogravuraUrl: string;
  year: number;
  ebookUrl: string;
  source: string;
}

interface CordelUpdateValues {
  author: {
    id: number;
  },
  title: string;
  description: string;
  content: string;
  xilogravuraUrl: string;
  published: boolean;
  tags: string[];
}

const AUTO_SAVE_INTERVAL = 5000;

export default function CordelReview() {

  const [cordel, setCordel] = useState<Cordel | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>()
  const theme = useTheme();
  const { addToast } = useToast();
  const { handleSubmit, register, watch } = useForm<CordelReviewValues>();

  useEffect(() => {
    api.get<Cordel>(`cordels/${id}`).then(({ data }) => setCordel(data))
  }, [id])

  useEffect(() => {
    let timeoutId : any; 
    const subscription = watch(
      (value) => {
        // for each change the timeout will be set. So clear the previous one right away 
        clearTimeout(timeoutId);
        timeoutId = setTimeout( async () => {
          // @ts-ignore
          const data: CordelUpdateValues = {
            ...value,
            author: {
              id: Number(cordel?.author.id),
            },
            tags: cordel?.tags || [],
            description: cordel?.description || ''
          }

          await api.put(`cordels/${id}`, data);
          addToast({ message: "Alterações salvas automaticamente!", type: "success" });
        }, AUTO_SAVE_INTERVAL);
      }
    );
    
    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    }
  }, [watch, cordel?.tags, cordel?.author.id, cordel?.description, id, addToast]);

  const onSubmit = async (cordelReviewFields: CordelReviewValues) => {
    try {

      const data: CordelUpdateValues = {
        ...cordelReviewFields,
        author: {
          id: Number(cordel?.author.id),
        },
        // TODO add description to the page
        description: cordel?.description || '',
        tags: cordel?.tags || [],
      }

      await api.put(`cordels/${id}`, data);
      navigate(-1);
      addToast({ message: "Cordel revisado com sucesso!", type: "success" });
    } catch (error) {
      addToast({ message: "credenciais inválidas", type: "error" });
    }
  };

  if (!cordel) return <CordelReviewSkeleton />

  return (
    <Container>
      <StructuralNavigation path={location.pathname} title={cordel.title} />
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
            Revisão de Cordel
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
              required
              fullWidth
              id="year"
              label="Ano de publicação"
              autoComplete="year"
              defaultValue={cordel.year}
              autoFocus
              {...register("year")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Autor"
              type="author"
              id="author"
              defaultValue={cordel.author.name}
              autoComplete="Author"
              disabled={true}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="URL da Xilogravura"
              type="xilogravuraUrl"
              id="xilogravuraUrl"
              defaultValue={cordel.xilogravuraUrl}
              autoComplete="xilogravuraUrl"
              {...register("xilogravuraUrl")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="e-book URL"
              type="ebookUrl"
              id="ebookUrl"
              defaultValue={cordel.ebookUrl}
              {...register("ebookUrl")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="URL de origem, fonte ou referência"
              type="source"
              id="source"
              defaultValue={cordel.source}
              autoComplete="source"
              {...register("source")}
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
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked={cordel.published} {...register("published")} />} label="Publicado" />
            </FormGroup>
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
                <Link component={RouterLink} to="/revisao">
                  Voltar
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Container >
  )

}


const CordelReviewSkeleton = () => {

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