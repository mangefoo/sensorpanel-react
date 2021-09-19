import "./PercentageBar.scss";

function PercentageBar(props) {
    const max = props.max ? parseFloat(props.max) : 100;
    const suffix = props.suffix ? props.suffix : "%";
    const display = props.display ? props.display : props.percentage + suffix;
    var usedSize = parseFloat(props.percentage);
    if (usedSize > max) {
        usedSize = max;
    }

    var unusedSize = max - usedSize;
    if (unusedSize > max) {
        unusedSize = max;
    }

    const gradient = "linear-gradient(0deg, rgba(2,0,36,1) 0%," + props.color + " 100%)";

    return (
        <div className="percentage-bar" style={{ flex: max }}>
            <div className="percentage-bar-filled" style={{ flex: usedSize, background: gradient }}></div>
            <div className="percentage-bar-blank" style={{ flex: unusedSize }}></div>
            <div className="percentage-bar-text">{display}</div>
        </div>
    )
}

export default PercentageBar;