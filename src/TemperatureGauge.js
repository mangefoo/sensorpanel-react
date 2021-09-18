
export default function TemperatureGauge(props) {
    const intTemp = parseInt(props.temperature);
    const color = intTemp < 70 ? "#00ff00" : intTemp < 80 ? "#ffff00" : "#ff0000";
    const dashArray = (intTemp * 1.4) + " 1000";

    return (
        <div>
            <svg viewBox="0 0 100 100">
                <circle cx="50%" cy="50%" r="40%" stroke="#ffffff" stroke-width="3"></circle>
                <circle cx="50%" cy="50%" r="29%" stroke={color} stroke-width="13" stroke-dasharray={dashArray} transform="rotate(130, 50, 50)"></circle>
                <text fill="#ffffff" x="36%" y="60%">{ props.temperature }</text>
                <text fill="#ffffff" font-size="smaller" x="38%" y="82%">{ "\u00B0C" }</text>
            </svg>
        </div>
    )
}