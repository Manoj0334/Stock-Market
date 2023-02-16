import React from 'react';
import { object } from 'prop-types';
import { Panel, Row, Col } from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';

Charts.propTypes = {
	chartData: object
};

Charts.defaultProps = {
	chartData: {}
};

export default function Charts({ chartData }) {
	const tooltipFn = txt => '<strong>{x}</strong><br/> ' + txt + '<b>$ {point.y}</b>';

	const chartStyle = {
		'font-family': "Lato,'Helvetica Neue', Helvetica, Arial,'sans-serif'"
	};

	const optionsBaseChart = {
		title: {
			text: null
		},
		xAxis: {
			categories: chartData.dataLabels
		},
		yAxis: {
			title: {
				text: null
			}
		},
		legend: {
			enabled: false
		},
		credits: {
			enabled: true
		}
	};

	const configPnLChart = Object.assign({}, optionsBaseChart, {
		chart: {
			type: 'column',
			style: chartStyle
		},
		series: [
			{
				data: chartData.pnlValues,
				dataLabels: { enabled: true, format: '$ {y}' },
				tooltip: { pointFormat: tooltipFn('Net P/L:') },
				color: 'green',
				negativeColor: 'red'
			}
		]
	});

	const configDaychangeChart = Object.assign({}, optionsBaseChart, {
		chart: {
			type: 'column',
			style: chartStyle
		},
		series: [
			{
				data: chartData.daychangeValues,
				dataLabels: { enabled: true, format: '$ {y}' },
				tooltip: { pointFormat: tooltipFn('Day Change:') },
				color: 'green',
				negativeColor: 'red'
			}
		]
	});

	const configMarketValueChart = Object.assign({}, optionsBaseChart, {
		chart: {
			type: 'pie',
			style: chartStyle
		},
		plotOptions: {
			pie: {
				innerSize: '40%',
				center: ['50%', '50%'],
				borderColor: null
			}
		},
		series: [
			{
				data: chartData.marketValues,
				dataLabels: {
					enabled: true,
					format: '{key}<br><b>$ {y}</b>',
					distance: 15,
					connectorPadding: 5,
					connectorWidth: 2
				},
				tooltip: { pointFormat: tooltipFn('Market Value:') }
			}
		]
	});

	return (
		<Row>
			{/*---Market Values Pie Chart---*/}
			<Col md={4}>
				<div className="chart-title">
					<h5>
						<strong> Market Value by Watchlist </strong>
					</h5>
				</div>
				<Panel className="chart-panel">
					<ReactHighcharts config={configMarketValueChart} />
				</Panel>
			</Col>
			{/*--- Net P/L Bar Chart ---*/}
			<Col md={4}>
				<div className="chart-title">
					<h5>
						<strong> Net P/L by Watchlist </strong>
					</h5>
				</div>
				<Panel className="chart-panel">
					<ReactHighcharts config={configPnLChart} />
				</Panel>
			</Col>
			{/*--- Day Change Bar Chart ---*/}
			<Col md={4}>
				<div className="chart-title">
					<h5>
						<strong> Day Change by Watchlist </strong>
					</h5>
				</div>
				<Panel className="chart-panel">
					<ReactHighcharts config={configDaychangeChart} />
				</Panel>
			</Col>
		</Row>
	);
}
