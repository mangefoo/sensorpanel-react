import PercentageBar from "./PercentageBar";
import './MemoryPanel.scss';

function MemoryPanel(props) {
    const available = parseFloat(props.available);
    const used = parseFloat(props.used);
    const percentage = ((used / (used + available)) * 100).toFixed(0);

    return (
        <div className="memory-panel">
            <div className="memory-top-bar">
                <div className="memory-title">Memory</div>
                <div className="memory-summary">
                    <div className="memory-summary-row">Available: {available} GB</div>
                    <div className="memory-summary-row">Used: {used} GB</div>
                </div>
            </div>
            <div className="memory-usage-panel">
                <div className="memory-usage-bar">
                    <div className="memory-usage-label">Usage</div>
                    <PercentageBar size="6" percentage={percentage} color="#3333ff" />
                </div>
            </div>
        </div>
    );
}

export default MemoryPanel;