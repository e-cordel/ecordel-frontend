import { Container, Skeleton, Typography as T, useTheme } from "@mui/material";
import { CordelGridViewer } from "../CordelGridViewer";
import { Author, CordelSummary } from "../../types";

type AuthorViewerProps = {
    author: Author,
    cordels: CordelSummary[]
}

export const AuthorViewer = ({ author, cordels }: AuthorViewerProps) => {

    const theme = useTheme();

    return (
        <Container component="main" maxWidth="md" sx={{
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        }}>
            <T variant="h3">{author.name} </T>
            <T variant="subtitle1"><a href={`mailto:${author.email}`}>{author.email}</a></T>
            <br />
            <T variant="subtitle1">{author.about}</T>
            <CordelGridViewer cordels={cordels} />
        </Container>);
}

export const AuthorViewerSkeleton = () => (
    <Container component="main" maxWidth="md" >
        <T variant="h3"><Skeleton variant="text" /></T>
        <T variant="subtitle1"><Skeleton variant="text" /></T>
        <br />
        <Skeleton variant="rectangular" height={100} />
    </Container>
)
