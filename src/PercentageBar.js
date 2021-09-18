function PercentageBar(props) {
    const style = "flex=" + props.size;
    const usedSize = props.percentage;
    const unusedSize = 100 - props.percentage;
    return (
        <div className="percentage-bar" style={{ flex: 6 }}>
            <div className="percentage-bar-filled" style={{ flex: usedSize }}></div>
            <div className="percentage-bar-blank" style={{ flex: unusedSize }}></div>
            <div className="percentage-bar-text">{props.percentage}%</div>
        </div>
    )
}

export default PercentageBar;