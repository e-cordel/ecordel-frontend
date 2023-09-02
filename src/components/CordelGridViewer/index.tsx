import {Grid} from "@mui/material";
import CardCordel from "../CordelCard";
import {CordelCardSkeleton} from "../CordelCard/CordelCardSkeleton";
import { CordelSummary } from "../../types";

export const CordelGridViewer = ({cordels}: any) => {

    return <Grid container spacing={4} paddingTop={4}>
        {cordels ? (
            cordels?.map(
                ( cordel: CordelSummary) => (
                    <Grid item key={cordel.id} xs={12} sm={6} md={4}>
                        <CardCordel
                            {...cordel}
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
