import {Container} from "@mui/material";
import {useParams, useLocation} from "react-router"
import {StructuralNavigation} from "../../components/StructuralNavigation";
import {useFetch} from "../../hooks/useFetch"
import {AuthorDetailsInterface, AuthorViewer, AuthorViewerSkeleton} from "../../components/AuthorViewer";

export default function AuthorDetails() {

    const {id} = useParams<{ id: string }>()

    const location = useLocation()

    const {data: author} = useFetch<AuthorDetailsInterface, Error>(`authors/${id}`);
    const {data: cordels} = useFetch<any, Error>(`cordels/summaries?authorId=${id}`);

    if (!author) return <AuthorViewerSkeleton/>

    return (<Container>
        <StructuralNavigation path={location.pathname} title={author.name}/>
        <AuthorViewer author={author} cordels={cordels?.content} />
    </Container>)
}
