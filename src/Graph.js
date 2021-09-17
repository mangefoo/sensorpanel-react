export default function Graph(props) {
    const points = "0,120 20,60 40,80 60,20 500,100";

    return (
        <svg viewBox="0 0 500 100" class="chart" background-color="black">
            <rect width="100%" height="100%" fill="black"/>
            <polyline
                fill="none"
                stroke="#0074d9"
                stroke-width="1"
                points={points}/>
        </svg>
    )
}