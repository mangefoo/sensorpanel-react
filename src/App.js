import axios from 'axios';
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import CpuPanel from "./CpuPanel";
import GpuPanel from "./GpuPanel";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("In constructor()");
    this.setState({
      data: null
    });
  }

  componentWillMount() {
    //    axios.post("http://sensor-relay.int.mindphaser.se/register", {
    axios.post("http://localhost:3000/register", {
      topics: ["sensors", "actions"]
    })
      .then((response) => {
        console.log("Got response " + JSON.stringify(response));
        const client = new W3CWebSocket('ws://sensor-relay.int.mindphaser.se/ws/' + response.data.id);

        //        const client = new W3CWebSocket('ws://127.0.0.1:3000/ws/' + response.data.id);
        client.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
          const data = JSON.parse(message.data);
          this.setState({
            data: data
          })
          console.log(data);
        };

      })
  }

  getFrequency() {
    if (this.state != null && this.state.data != null) {
      console.log("Reporter = " + this.state.data.reporter);
      if (this.state.data.reporter === "windows-sensor-agent") {
        console.log("Data: " + JSON.stringify(this.state.data));
        return this.state.data.sensors.cpu_core_frequency_1;
      }
    }

    return "N/A";
  }

  cpuPanel() {
    const power = this.state ? parseFloat(this.state.data.sensors.cpu_power).toFixed(2) : "N/A";
    const dieTemp = this.state ? parseFloat(this.state.data.sensors.cpu_die_temp).toFixed(0) : "N/A";
    const packageTemp = this.state ? parseFloat(this.state.data.sensors.cpu_package_temp).toFixed(0) : "N/A";

    var frequency = "N/A";
    if (this.state != null) {
      const frequencyKeys = Object.keys(this.state.data.sensors).filter(v => v.startsWith("cpu_core_frequency_"));
      const frequencies = frequencyKeys.map(key => parseFloat(this.state.data.sensors[key]));
      frequency = Math.max.apply(null, frequencies).toFixed(0);
    }

    return (
      <CpuPanel power={power} dieTemp={dieTemp} packageTemp={packageTemp} frequency={frequency} />
    );
  }

  gpuPanel() {
    const power = this.state ? parseFloat(this.state.data.sensors.gpu_power).toFixed(2) : "N/A";
    const voltage = this.state ? parseFloat(this.state.data.sensors.gpu_voltage).toFixed(2) : "N/A";
    const dieTemp = this.state ? parseFloat(this.state.data.sensors.gpu_die_temp).toFixed(0) : "N/A";
    const packageTemp = this.state ? parseFloat(this.state.data.sensors.gpu_package_temp).toFixed(0) : "N/A";
    const frequency = this.state ? parseFloat(this.state.data.sensors.gpu_frequency).toFixed(0) : "N/A";
    const fps = this.state ? parseFloat(this.state.data.sensors.gpu_fps).toFixed(0) : "N/A";

    return (
      <GpuPanel power={power} voltage={voltage} dieTemp={dieTemp} packageTemp={packageTemp} frequency={frequency} fps={fps} />
    );
  }

  render() {
    return (
      <div className="sensor-panel">
        <div className="left-column">
          {this.cpuPanel()}
          {this.gpuPanel()}
        </div>
      </div>
    );
  }
}

export default App;
