function PercentageBar(props) {
    const style = "flex=" + props.size;
    return (
        <div className="percentage-bar" style={{flex: props.size}}>{props.percentage}%</div>
    )
}

export default PercentageBar;