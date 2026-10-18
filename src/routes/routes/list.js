import {
    getAllRoutes,
    getListOfRegions,
    getListOfSeasons,
    getRoutesByRegion,
    getRoutesBySeason
} from '../../models/model.js';

export default async (req, res) => {
    const { region, season } = req.query;
    const regions = await getListOfRegions();
    let routes = await getAllRoutes();
    const seasons = await getListOfSeasons();

    if (region && region !== 'all') {
    routes = await getRoutesByRegion(region);
}

if (season && season !== 'all') {
    routes = routes.filter(route =>
        route.bestSeason.toLowerCase() === season.toLowerCase()
    );
}

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: req.query
    });
};