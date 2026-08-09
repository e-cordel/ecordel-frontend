import {Grid} from "@mui/material";
import CardCordel from "../CordelCard";
import {CordelCardSkeleton} from "../CordelCard/CordelCardSkeleton";
import { CordelSummary } from "../../types";

interface CordelGridViewerProps {
    cordels?: CordelSummary[];
    loading?: boolean;
}

const loadingCards = [1, 2, 3];

export const CordelGridViewer = ({cordels, loading = false}: CordelGridViewerProps) => {

    return <Grid container spacing={4} paddingTop={4} aria-busy={loading}>
        {cordels ? (
            cordels?.map(
                ( cordel: CordelSummary) => (
                    <Grid item key={cordel.id} xs={12} sm={6} md={4}>
                        <CardCordel cordel={cordel}></CardCordel>
                    </Grid>
                )
            )
        ) : loading ? (
            <>
                {loadingCards.map(card => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <CordelCardSkeleton />
                    </Grid>
                ))}
            </>
        ) : null}
        {cordels && loading && loadingCards.map(card => (
            <Grid item key={`loading-${card}`} xs={12} sm={6} md={4}>
                <CordelCardSkeleton />
            </Grid>
        ))}
    </Grid>;
}
