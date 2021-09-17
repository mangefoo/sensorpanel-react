function CpuPanel(props) {
    return (
        <div className="cpu-panel">
            <div className="cpu-top-bar">
                <div className="cpu-title">CPU</div>
                <div className="cpu-power">{props.power} W</div>
                <div className="cpu-die-temp">{props.dieTemp + "\u2103"}</div>
                <div className="cpu-package-temp">{props.packageTemp + "\u2103"}</div>
                <div className="cpu-frequency">{props.frequency} MHz</div>
            </div>
        </div>
    );
}

export default CpuPanel;