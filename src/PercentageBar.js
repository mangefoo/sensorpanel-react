function PercentageBar(props) {
    const style = "flex=" + props.size;
    const usedSize = props.percentage;
    const unusedSize = 100 - props.percentage;
    const gradient = "linear-gradient(0deg, rgba(2,0,36,1) 0%," + props.color + " 100%)";
    return (
        <div className="percentage-bar" style={{ flex: 6 }}>
            <div className="percentage-bar-filled" style={{ flex: usedSize, background: gradient }}></div>
            <div className="percentage-bar-blank" style={{ flex: unusedSize }}></div>
            <div className="percentage-bar-text">{props.percentage}%</div>
        </div>
    )
}

export default PercentageBar;