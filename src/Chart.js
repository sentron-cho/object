// import React, { PureComponent } from 'react';
// import styled from 'styled-components';
// import cx from 'classnames/bind';
// import cs from './css-style';
// import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

// import Cardbox from './Cardbox';
// import Button from './Button';
// import { Util } from './Utils';

// /*******************************************************************
//  Bar 차트
// *******************************************************************/
// export const StyledChart = styled.div`{
//   &.chart-box { display: inline-block; width: 100%; height: 100%; position: relative;

//     .chart-itm { 
//       width: 100%; height: 100%; border-radius: 0; position: relative;
//       & > div { position: relative; width: 100%; height: 100% }
//       .no-data { padding: 0; }
//       .chart-frame { width: fit-content; height: 100%; ${cs.align.center} }
//       .unit { ${cs.font.sm} position: absolute; float: left; bottom: 20px; left: 20px; }
//       .info { ${cs.font.sm} position: absolute; float: right; bottom: 20px; right: 20px; }

//       .gui {
//         width: fit-content; display: inline-block; height: auto; 

//         .gui-label { ${cs.font.sm} height: 20px; line-height: 16px; margin-right: 10px; display: inline-block;
//           .gui-box { width: 16px; height: 16px; display: inline-block; margin-bottom: -3px; margin-right: 3px; 
//               border-radius: 10px; 
//           }
//         }

//         &.top { ${cs.align.rtop} top: 10px; }
//         &.bottom { ${cs.align.rbottom} bottom: 10px; }
//         &.center { ${cs.align.xcenter} bottom: 10px; }
//       }
//       &.pie { }
//       &.line { }
//       &.bar {  }

//       .recharts-line-curve {
//         stroke: rgb(255, 133, 33); stroke-width: 2px;
//       }

//       .recharts-line-dot {
//         stroke: rgb(255, 56, 0); fill: rgb(136, 30, 0);
//       }

//       .recharts-cartesian-grid-horizontal, .recharts-cartesian-grid-vertical {
//         line { stroke : rgba(171, 171, 171, 0.6); stroke-dasharray: 2 4; }
//       }
//     }

//     .nodata-box { min-height: 200px; }

//     .change-btn { position: absolute; float: right; top: 15px; right: 15px; }

//     .custom-tooltip { background: rgba(0, 0, 0, 0.8); border: 1px solid #fff; border-radius: 3px;
//       width: auto; color: white; padding: 10px; ${cs.font.sm}
//         .label { display: block; text-align: center;
//         .ar { display: inline-block; text-align: right; min-width: 100px; }
//         .al { display: inline-block; text-align: left; min-width: 80px; }
//         .invisable { visibility: hidden; }

//         &.lg { .ar { width: 90px; } .al { width: 30px; } }
//         }

//         &.minus { background: rgba(10, 0, 100, 0.8); }
//         &.plus { background: rgba(100, 0, 10, 0.8); }
//     }

//     @media screen and (max-width : 860px) {
//       .change-btn { top: 5px; right: 5px; }
//       .chart-itm .gui {
//         .gui-label { font-size: 10px;
//           .gui-box { width: 12px; height: 12px; }
//         }
//       }
//     }
//   }
// }`;

// const LineLabel = (props) => {
//   const { x, y, color, value } = props;
//   return <text x={x} y={y} dy={-6} fill={color} fontSize={12} textAnchor="middle">{value}</text>
// }


// const margin = 40;
// class LineChartFrame extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeIndex: 0, data: props.data || [], dataType: 'count',
//       buttons: props.buttons || { sum: 'sum', count: 'count' }
//     }
//   }

//   checkScreen = () => {
//     const screen = Util.getScreenType();
//     const size = this.getSize();
//     this.setState({ ...this.state, ...screen, ...size });
//   };

//   getSize = () => {
//     const width = this.box.offsetWidth - margin;
//     const height = this.box.offsetHeight - margin;
//     return { width, height };
//   }

//   componentDidMount() {
//     this.checkScreen();
//     window.addEventListener('resize', this.checkScreen);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('resize', this.checkScreen);
//   }

//   componentWillReceiveProps(next) {
//     if(this.props.update !== next.update) {
//       this.setState({data: next.data})
//     }
//   }

//   onClicked = () => {
//     if (this.state.dataType === "count") {
//       this.setState({ dataType: 'sum' });
//     } else {
//       this.setState({ dataType: 'count' });
//     }
//   }

//   renderChart() {
//     const props = this.props;
//     const margin = { top: 20, right: 10, left: 10, bottom: 5 };
//     const padding = { left: 20, right: 20 }
//     const { data, width, height, dataType, buttons } = this.state;
//     let datakeyType = dataType === "count" ? "total_count" : "total_sum_label";
//     datakeyType = props.datakey != null ? props.datakey : datakeyType;
//     const buttonLabel = dataType === "count" ? buttons.sum : buttons.count;
//     const { unitname = '' } = props;

//     return (
//       <React.Fragment>
//         {/* <span className="chart-tl">{props.title}</span> */}
//         {data.length > 0 && <LineChart className="chart-frame" width={width} height={height} data={data} margin={margin} >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" color={props.color} padding={padding} tickLine={false} tick={{ fontSize: '10px', marginTop: "8px" }} />
//           <YAxis tickLine={false} tick={{ fontSize: '10px', marginRight: "8px" }} />
//           <Tooltip content={<props.tooltip />} />
//           <Line type="monotone" dataKey={datakeyType} stroke={props.stroke} strokeWidth={1} activeDot={{ r: 8 }}
//             onClick={(data, index) => this.setState({ activeIndex: index })} label={<LineLabel color={props.color} />} />
//         </LineChart>}
//         {/* <span className={cx("info", (item.count < 0 && 'minus'))}>{`${item.name} (${ST.SONIC} : ${item.sonic}${ST.MANWON})`}</span> */}
//         {props.button && this.state.dataType === "sum" && unitname && <span className="unit">{unitname}</span>}
//         {props.button && <Button className="primary change-btn" title={buttonLabel} onClick={this.onClicked} eid={'ok'} />}
//       </React.Fragment>
//     )
//   }

//   render() {
//     const { props, state } = this;
//     const { data } = state;

//     if (data) {
//       return (
//         <StyledChart ref={ref => { this.box = ref }} className={cx("chart-box", props.className)}>
//           <Cardbox className={cx("chart-itm line", props.cardbox)} height="100%" width="100%">
//             {this.renderChart()}
//             {/* {data.length > 0 && this.renderChart()}
//             {data.length <= 0 && <Nodata />} */}
//           </Cardbox>
//         </StyledChart>
//       );
//     }
//   }
// }

// const BarLabel = (props) => {
//   const { x, y, color, value, width } = props;
//   return <text x={x + (width / 2)} y={y} dy={-6} fill={color} fontSize={12} textAnchor="middle">{value}</text>
// }

// class BarChartFrame extends PureComponent {
  
//   constructor(props) {
//     super(props);
//     this.state = { 'type': 's-pc', activeIndex: 0, data: props.data || [] }
//   }

//   checkScreen = () => {
//     const screen = Util.getScreenType();
//     const size = this.getSize();
//     this.setState({ ...this.state, ...screen, ...size });
//   };

//   getSize = () => {
//     const width = this.box.offsetWidth - margin;
//     const height = this.box.offsetHeight - margin;
//     return { width, height };
//   }

//   componentDidMount() {
//     this.checkScreen();
//     window.addEventListener('resize', this.checkScreen);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('resize', this.checkScreen);
//   }

//   componentWillReceiveProps(next) {
//     if(this.props.update !== next.update) {
//       this.setState({data: next.data})
//     }
//   }

//   render() {
//     const onClicked = (data, index) => {
//       this.setState({ activeIndex: index })
//       if (this.props.onClicked !== null) {
//         const item = this.state.data[index];
//         this.props.onClicked(item, index);
//       }
//     }

//     const { props, state } = this;
//     const { data, width, height } = state;
//     const margin = { top: 20, right: 0, left: 0, bottom: 5 };
//     const padding = { left: 20, right: 20 }
//     const { unitname = '', options = {}, bars = '' } = props;
//     const { fontcolor = cs.color.darkgray, linecolor = cs.color.dark,
//       barcolor = { up: cs.color.dark, down: cs.color.darkgray, no: cs.color.dark },
//       datakeys = ['value']
//     } = options;

//     const renderBar = () => {
//       if (bars === 'sign') {
//         const downcolor = barcolor['down'] || cs.color.dark;
//         const upcolor = barcolor['up'] || cs.color.dark;
//         return datakeys.map(key => <Bar key={`bar-${key}`} className={`bar-${key}`} dataKey={key}
//           fill={barcolor.up} onClick={onClicked} label={{ position: 'top' }} >
//           {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.value < 0 ? downcolor : upcolor} />))}
//         </Bar>)
//       } else {
//         return datakeys.map(key => <Bar key={`bar-${key}`} className={`bar-${key}`} dataKey={key}
//           fill={barcolor[key] || cs.color.dark} onClick={onClicked} label={<BarLabel />} />);
//       }
//     }

//     return (
//       <StyledChart ref={ref => { this.box = ref }} className={cx("chart-box", props.className)}>
//         <Cardbox className={"chart-itm bar"} type={"full"} height="100%" width="100%">
//           {/* <span className="chart-tl">{props.title}</span> */}
//           {data.length > 0 && <BarChart className="chart-frame" width={width} height={height} data={data} stackOffset="sign" margin={margin} >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" color={linecolor} padding={padding} tickLine={false} tick={{ fontSize: '10px', marginTop: "8px", fill: fontcolor }} />
//             <YAxis type="number" color={linecolor} padding={{ top: 20 }} tickLine={false} tick={{ fontSize: '10px', marginRight: "8px", fill: fontcolor }} />
//             <Tooltip content={<props.tooltip />} />
//             {renderBar()}
//           </BarChart>}
//           <div className="gui top">{props.children}</div>
//           {unitname && <span className="unit">{unitname}</span>}
//         </Cardbox>
//       </StyledChart>
//     );
//   }
// }

// const COLORS = ['#FFBB28', '#FF8042', '#BF2A5C', '#0088FE', '#00C49F'];

// class PieChartFrame extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeIndex: 0, data: props.data || [], RADIAN: Math.PI / 180,
//     }
//   }
//   checkScreen = () => {
//     const screen = Util.getScreenType();
//     const size = this.getSize();
//     this.setState({ ...this.state, ...screen, ...size });
//   };

//   getSize = () => {
//     const width = this.box.offsetWidth - margin;
//     const height = this.box.offsetHeight - margin;
//     return { width, height };
//   }

//   componentDidMount() {
//     this.checkScreen();
//     window.addEventListener('resize', this.checkScreen);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('resize', this.checkScreen);
//   }

//   componentWillReceiveProps(next) {
//     if(this.props.update !== next.update) {
//       this.setState({data: next.data})
//     }
//   }

//   renderText = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * this.state.RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * this.state.RADIAN);

//     return (
//       <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };

//   onClick = (data, index) => {
//     this.setState({ activeIndex: index, clicktype: 'L' })
//     if (this.props.onClicked !== null) {
//       const item = this.state.data[index];
//       this.props.onClicked(item, index, { x: 0, y: 0 }, "l");
//     }
//   }

//   render() {
//     const getLabel = (array) => {
//       const list = array.slice(0, 5); // 5개까지만
//       return list.map((item, index) => {
//         const styled = { background: item.color };
//         return <div className="gui-label" key={index}> <span className="gui-box" style={styled}></span>{Util.toShort(item.title, 5)}</div>
//       })
//     }

//     const props = this.props;
//     const { data } = this.state;

//     const width = this.state.type === "s-mobile" ? 160 : props.height - 50;
//     const height = this.state.type === "s-mobile" ? 160 : props.height - 50;
//     const radius = 70;
//     const { unitname = '' } = props;

//     const getInfo = (data, state) => {
//       if (data.length <= 0) {
//         return '';
//       }

//       const item = data[state.activeIndex];
//       const info = (state.clicktype === 'L') ? `${item.per}%` : `${item.value}${unitname}`;
//       return `${item.name} (${info})`;
//     }

//     // if (props.data) {
//     //   data = props.data.map((item, index) => {
//     //     item.color = COLORS[index % COLORS.length];
//     //     return item;
//     //   });
//     // }

//     return (
//       <StyledChart ref={ref => { this.box = ref }} className={cx("chart-box", props.className)}>
//         <Cardbox className={"chart-itm pie"} type={"full"} height="100%" width="100%">
//           {/* <span className="chart-tl">{props.title}</span> */}
//           <div className="chart-frame">

//             {/* 현재 보유 종목 통계 */}
//             {data.length > 0 && <PieChart className="" width={width} height={height} /* onMouseEnter={this.onClicked}*/ >
//               <Pie data={data} cx={width / 2} cy={height / 2} labelLine={false} dataKey="value" onClick={this.onClick}
//                 label={this.renderText} outerRadius={radius} fill="#8884d8">
//                 {data.map((entry, index) => <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />)}
//               </Pie>
//             </PieChart>}
//           </div>

//           <span className={cx("info")}>{getInfo(data, this.state)}</span>
//           <span className="gui top">{getLabel(this.state.data)}</span>
//           {unitname && <span className="unit">{unitname}</span>}
//         </Cardbox>
//       </StyledChart>
//     );
//   }
// };

// export const BarChartComp = BarChartFrame;
// export const PieChartComp = PieChartFrame;
// export const LineChartComp = LineChartFrame;