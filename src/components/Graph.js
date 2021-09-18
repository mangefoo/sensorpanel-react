function getGridLines() {
    var gridLines = [];
    for (var x = 1; x < 479; x += 10) {
        gridLines = [...gridLines, (
            <line x1={x} y1="1" x2={x} y2="69" stroke="#555555" stroke-width="1" />
        )];
    }

    for (var y = 10; y <= 60; y += 10) {
        gridLines = [...gridLines, (
            <line x1="1" y1={y} x2="479" y2={y} stroke="#555555" stroke-width="1" />
        )];
    }

    return gridLines;
}

function getGraphs(data) {
    return data.map(data => {
        const points = data.points.map((v, i) => {
            const value = parseFloat(v).toFixed(0);
            return (480 - i) + "," + (100 - value) * 0.7;
        }).reduce((prev, current) => prev + " " + current, "");
        return (<polyline fill="none" stroke={data.color} stroke-width="1" points={points} />);
    });
}

export default function Graph(props) {
    return (
        <svg viewBox="0 0 480 70" class="chart" background-color="black">
            <rect stroke="#aaaaaa" stroke-width="1" width="100%" height="100%" fill="black" />
            {getGridLines()}
            {getGraphs(props.data)}
        </svg>
    )
}