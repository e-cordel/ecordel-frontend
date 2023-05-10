import {Grid} from "@mui/material";
import CardCordel from "../CordelCard";
import {CordelCardSkeleton} from "../CordelCard/CordelCardSkeleton";

export interface CordelInterface {
    id: number;
    title: string;
    xilogravuraUrl: string;
    authorName: string;
}

export const CordelGridViewer = ({cordels}: any) => {

    return <Grid container spacing={4} paddingTop={4}>
        {cordels ? (
            cordels?.map(
                ({ id, title, xilogravuraUrl, authorName }: CordelInterface) => (
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
