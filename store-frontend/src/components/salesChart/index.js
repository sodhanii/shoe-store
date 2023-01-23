import { useEffect, useState } from 'react';
import React from 'react';
import Plot from 'react-plotly.js';
import { COLORS, LIGHT_GRAY } from "../constants";
import { linmap } from '../utils';
import Title from '../title';

function getColor(i) {
    return COLORS[(i - 1) % COLORS.length];
}

function SalesChart(props) {

    const [chartData, setChartData] = useState(null);
    const [data, setData] = useState(null);
    const [layout, setLayout] = useState(null);
    const [key, setKey] = useState(0);


    useEffect(() => {
        fetch('http://localhost:3000/sales/history.json').then(function(response) {
            return response.json();
        }).then(function(data) {
            setChartData(data);
        }).catch(function(error) {

        });
    }, [props.refresh])

    useEffect(() => {

        if (chartData === null) {
            return;
        }

        let layout = {
            showlegend: false,
            legend: {
                xanchor: "center",
                x: 0.5,
                orientation: 'h',
                y: -0.43,
            },
            hoverlabel: {},
            margin: {
                l: 0,
                r: 0,
                b: 80,
                t: 20,
            },
            font: {
                family: 'Open Sans, sans-serif',
                size: 14
            },
            xaxis: {
                linecolor: '#777777',
                linewidth: 0.5,
                mirror: true,
                ticklen: 6,
                title: "<b>Time (UTC)</b>",
            },
        }

        let yRange, tickText, maxValue;

        // Adding layout details for RT's
        maxValue = Math.max(...chartData.map(e => e["qty"]));
        if (maxValue > 1000)
            yRange = [0, 1000 * Math.ceil(0.001 * maxValue)];
        else if (maxValue > 100)
            yRange = [0, 100 * Math.ceil(0.01 * maxValue)];
        else if (maxValue > 10)
            yRange = [0, 10 * Math.ceil(0.1 * maxValue)];
        else
            yRange = [0, Math.ceil(maxValue)];

        tickText = linmap(yRange[0], yRange[1], 5);

        layout['yaxis'] = {
            title: 'Sales',
            ticklen: 8,
            titlefont: { color: LIGHT_GRAY },
            tickfont: { color: LIGHT_GRAY },
            fixedrange: true,
            range: yRange,
            tickvals: tickText,
            ticktext: tickText,
            linecolor: LIGHT_GRAY,
            linewidth: 0.5,
            mirror: false,
            side: 'left',
            position: 0.05
        };
        layout['xaxis']['domain'] = [0.05, 0.96];



        let data = [{
            x: chartData.map(e => e["time"]),
            y: chartData.map(e => e["qty"]),
            text: chartData.map(e => e["qty"]),
            name: "Sales",
            hovertemplate: "%{text:.0f}",
            fill: 'tozeroy',
            type: "area",
            line: {
                shape: "shape",
                width: 2,
                color: getColor(3),
            },
            showlegend: true,
            yaxis: 'y',
            position: 0.04
        }]

        setLayout(layout);
        setData(data);
        setKey(k => k + 1);

    }, [chartData])



    return (

        <div className = "" style = { { height: '60vh', position: 'relative' } } >
        <Title text = "Overall Sales" /> 
        
        {
            key > 0 && <Plot
            data = {data}
            layout = {layout}
            config = {
                {
                    responsive: true,
                    displaylogo: false,
                    toImageButtonOptions: {
                        format: 'png', // one of png, svg, jpeg, webp
                        height: null,
                        width: null,
                        scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                    },
                    modeBarButtonsToRemove: ['sendDataToCloud', 'hoverCompareCartesian', 'select2d', 'lasso2d', 'toggleSpikelines'],
                }
            }
            useResizeHandler = { true }
            style = {
                { width: "100%", height: "50vh" }
            }
            />
        } 
        </div>
    );




}

export default SalesChart;