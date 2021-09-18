import './GpuPanel.scss';

function GpuPanel(props) {
    return (
        <div className="gpu-panel">
            <div className="gpu-top-bar">
                <div className="gpu-title">GPU</div>
                <div className="gpu-power-panel">
                    <div className="gpu-power">{props.power} W</div>
                    <div className="gpu-voltage">{props.voltage} V</div>
                </div>
                <div className="gpu-die-temp">{props.dieTemp + "\u2103"}</div>
                <div className="gpu-package-temp">{props.packageTemp + "\u2103"}</div>
                <div className="gpu-frequency-panel">
                    <div className="gpu-frequency">{props.frequency} MHz</div>
                    <div className="gpu-fps">{props.fps} FPS</div>
                </div>
            </div>
        </div>
    );
}

export default GpuPanel;