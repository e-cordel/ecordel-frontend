import {Container, Grid, Skeleton, Typography as T} from "@mui/material";
import CardCordel from "../CordelCard";
import {CordelCardSkeleton} from "../CordelCard/CordelCardSkeleton";

interface Cordel {
    id: number;
    title: string;
    xilogravuraUrl: string;
    authorName: string;
}

export const CordelGridViewer = ({cordels}: any) => {

    return <Grid container spacing={4} paddingTop={4}>
        {cordels ? (
            cordels?.map(
                ({ id, title, xilogravuraUrl, authorName }: Cordel) => (
                    <Grid item key={id} xs={12} sm={6} md={4}>
                        <CardCordel
                            id={id}
                            title={title}
                            xilogravuraUrl={xilogravuraUrl}
                            authorName={authorName}
                        ></CardCordel>
                    </Grid>
                )
            )
        ) : (
            <>
                <Grid item xs={12} sm={6} md={4}>
                    <CordelCardSkeleton />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CordelCardSkeleton />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CordelCardSkeleton />
                </Grid>
            </>
        )}
    </Grid>;
}

export const CordelViewerSkeleton = () => (
    <Container component="main" maxWidth="xs">
        <T variant="h3"><Skeleton variant="text"/></T>
        <T variant="subtitle1"><Skeleton variant="text"/></T>
        <Skeleton variant="rectangular" height={550}/>
        <p>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
        </p>
        <p>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
        </p>

    </Container>

)
