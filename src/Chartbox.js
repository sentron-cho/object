import React from 'react';
import echarts from 'echarts';
import cx from 'classnames/bind';
import styled from 'styled-components';
import cs from './css-style';

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

  React.useEffect(() => {
    if (chartElement.current) {
      setChartElement(echarts.init(chartElement.current));
    } else {
      chartElement.setOption(props.config);
    }

    // const h = props.config && props.config.dataZoom ? `calc(100%)` : `calc(100% + 40px)`;
    // setHeight(h);

    return () => { }
  }, [props.resize, props.config, chartElement, props.refresh]);


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
    <StyledObject ref={frame} className={cx("echart-box", props.className, theme && `theme-${theme}`)} border={border} >
      <span className={cx("ec-title")}>{props.title}</span>
      <div className={cx("ec-frame")} ref={chart} style={{ height, width }} />
    </StyledObject>
  )
};