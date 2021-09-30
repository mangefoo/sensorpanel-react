import './DataPanel.scss';

export default function DataPanel(props) {
    var currentTime = new Date();
    var formattedTime = String(currentTime.getHours()).padStart(2, '0') + ":" + String(currentTime.getMinutes()).padStart(2, '0') + ":" + String(currentTime.getSeconds()).padStart(2, '0');

    return (
        <div className="data-panel">
            <div className="data-entry">
                {parseFloat(props.sensors.hue_temperature).toFixed(1) + " \u00B0C"}
            </div>
            <div className="data-entry">
                {formattedTime}
            </div>
        </div>
    )
}