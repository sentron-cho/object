import React from 'react';
import echarts from 'echarts';
import cx from 'classnames/bind';
import styled from 'styled-components';
import cs from './css-style';
import { Util } from './Utils';

const StyledObject = styled.section`{
  &.echart-box { ${cs.size.full} ${cs.p.a10}
    .ec-title { ${cs.pos.absolute} ${cs.align.xcenter} }
    .ec-frame { ${cs.align.center} }

    &.radius { ${cs.box.radius} }

    &.trans { ${cs.bg.trans} .cls-title:hover { ${cs.bg.sky} } }
    &.white { ${cs.bg.get("white")} .cls-title:hover { ${cs.bg.sky} } }
    &.sky { ${cs.bg.sky} .cls-title:hover { ${cs.bg.lightgray} } .cls-frame { ${cs.border.lightgray} } }
    &.yellow { ${cs.bg.yellow} .cls-title:hover { ${cs.bg.orange} } .cls-frame { ${cs.border.lightgray} } }
    &.orange { ${cs.bg.orange} .cls-title:hover { ${cs.bg.orangehover} } .cls-frame { ${cs.border.lightgray} } }
    &.green { ${cs.bg.green} .cls-title:hover { ${cs.bg.greenhover} } .cls-frame { ${cs.border.lightgray} } }
    &.red { ${cs.bg.red} .cls-title:hover { ${cs.bg.redhover} } .cls-frame { ${cs.border.lightgray} } }
    &.primary { ${cs.bg.primary} ${cs.font.white} .cls-title:hover { ${cs.bg.blue} } .cls-frame { ${cs.border.lightgray} } }
    &.gray { ${cs.bg.lightgray} .cls-title:hover { ${cs.bg.gray} } .cls-frame { ${cs.border.white} } }
    &.dark { ${cs.bg.dark} ${cs.font.white} .cls-title:hover { ${cs.bg.black} } .cls-frame { ${cs.border.gray} } }
    &.black { ${cs.bg.black} ${cs.font.white} .cls-title:hover { ${cs.bg.dark} } .cls-frame { ${cs.border.darkgray} } }

    &.theme-sky { ${cs.bg.sky} .cls-title:hover { ${cs.bg.lightgray} } .cls-frame { ${cs.border.lightgray} } }
    &.theme-primary { ${cs.bg.primary} ${cs.font.white} .cls-title:hover { ${cs.bg.blue} } .cls-frame { ${cs.border.lightgray} } }
    &.theme-gray { ${cs.bg.lightgray} .cls-title:hover { ${cs.bg.gray} } .cls-frame { ${cs.border.white} } }
    &.theme-dark { ${cs.bg.dark} ${cs.font.white} .cls-title:hover { ${cs.bg.black} } .cls-frame { ${cs.border.gray} } }
    &.theme-black { ${cs.bg.black} ${cs.font.white} .cls-title:hover { ${cs.bg.dark} } .cls-frame { ${cs.border.darkgray} } }

    &.reload { ${cs.anim.showin('200ms')} }

    ${({ border }) => border && cs.box.line}
    ${({ border }) => border && border.color && cs.border.color(border.color)}
    ${({ border }) => border && border.radius && cs.border.radius(border.radius)}
    ${({ border }) => border && border.width && cs.border.width(border.width)}

  }
}`
export default function Chartbox(props) {
  const chart = React.useRef(null);
  const frame = React.useRef(null);
  const { theme, border = null, } = props;
  const [chartElement, setChartElement] = React.useState(chart);
  const [height, setHeight] = React.useState(`calc(100%)`);
  const [width, setWidth] = React.useState(`calc(100% + 60px)`);
  const [reload, setReload] = React.useState(false);

  const [config, setConfig] = React.useState(props.config || {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#202020e0',
      axisPointer: {
        type: 'shadow',
        label: {
          backgroundColor: '#202020e0',
        }
      },
      ...props.tooltip,
    },
    title: {
      left: 'center',
      text: '',
    },
    toolbox: {
      show: false,
      feature: {
        mark: { show: false },
        restore: { show: false },
        saveAsImage: { show: false }
      }
    },
    xAxis: {
      data: props.axis || null,
      // type: 'category',
      // boundaryGap: false,
      // axisPointer: {
      //   show: true,
      //   value: '2016-10-7',
      //   snap: true,
      //   lineStyle: {
      //     color: cs.color.dark,
      //     opacity: 0.5,
      //     width: 2
      //   },
      //   label: {
      //     show: true,
      //     backgroundColor: cs.color.dark
      //   },
      //   handle: {
      //     show: false,
      //     color: cs.color.dark,
      //     size: 30,
      //     margin: 40
      //   }
      // }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, props.boundary || '20%']
    },
    dataZoom: props.zoom && [{
      type: 'inside',
      throttle: 50,
      start: props.zoom.start || 50,
      end: props.zoom.end || 100,
    }, {
      start: 0,
      end: 100,
      ...props.zoom.handle,
    }],
    series: props.series || [{
      name: '',
      type: 'line',
      smooth: true,
      // sampling: 'average',
      itemStyle: {
        color: cs.color.dark
      },
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      markPoint: props.mark && {
        data: [
          { type: 'max', name: '' },
          { type: 'min', name: '' }
        ],
      },
      data: (props.data && props.data[0]) || null,
    }], ...props.options,
  });

  React.useEffect(() => {
    if (!props.config) {
      config.xAxis.data = props.axis;
      config.series.map((a, i) => {
        a.data = (props.data && props.data[i]) || null;
        // a.type = (props.type && props.type[i]) || null;
        return null;
      });
    }

    if (chartElement.current) {
      setChartElement(echarts.init(chartElement.current));
    } else {
      chartElement.setOption(props.config || config);
    }

    setConfig(config);

    // const h = props.config && props.config.dataZoom ? `calc(100%)` : `calc(100% + 40px)`;
    // setHeight(h);

    setReload(true);
    setTimeout(() => {
      setReload(false)
    }, 200);

    return () => { }
  }, [props.resize, config, chartElement, props.refresh, props.axis, props.data, props.config]);


  React.useEffect(() => {
    const handleResize = () => {
      if (frame && frame.current) {
        setWidth(frame.current.clientWidth);
        // if (frame.current.clientWidth < 640) {
        props.onResize && props.onResize(frame.current)
        chartElement.setOption(props.config);
        // }
      }
      if (chartElement) chartElement.resize && chartElement.resize();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  })

  return (
    <StyledObject ref={frame} className={cx("echart-box", props.className, theme && `theme-${theme}`, { reload })} border={border} >
      <span className={cx("ec-title")}>{props.title}</span>
      <div className={cx("ec-frame")} ref={chart} style={{ height, width }} />
    </StyledObject>
  )
};