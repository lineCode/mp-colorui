import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import { classNames, isNumber } from '../../lib';
import { BG_COLOR_LIST, TEXT_COLOR_LIST } from '../../lib/model';
export default class ClTabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
        this.options = {
            addGlobalClass: true
        };
        this.defaultProps = {
            bgColor: 'white',
            activeColor: 'blue',
            active: 0,
            tabs: [],
            safeArea: true
        };
    }
    onClick(index) {
        const props = this.props;
        this.setState({
            activeIndex: index
        });
        props.onClick && props.onClick(index);
    }
    componentWillReceiveProps(prevProps) {
        if (prevProps.active !== this.props.active) {
            this.setState({ activeIndex: this.props.active });
        }
    }
    render() {
        const props = this.props;
        const colorClassName = props.bgColor
            ? BG_COLOR_LIST[props.bgColor]
            : 'bg-white';
        const activeColorClassName = props.activeColor
            ? TEXT_COLOR_LIST[props.activeColor]
            : 'text-blue';
        const barComponent = props.tabs.map((item, index) => (React.createElement(View, { onClick: () => {
                this.onClick(index);
            }, key: 'key-' + item.icon, className: `action ${item.action ? 'add-action' : ''} ${this.state.activeIndex === index ? activeColorClassName : ''}` },
            React.createElement(View, { className: classNames([
                    { 'cuIcon-cu-image': item.img, [`cuIcon-${item.icon}`]: item.icon }
                ]) },
                item.img ? React.createElement(Image, { mode: 'aspectFit', src: item.img }) : '',
                item.badge !== false ? (React.createElement(View, { className: 'cu-tag badge' }, isNumber(item.badge) ? item.badge : '')) : ('')),
            React.createElement(Text, null, item.title))));
        return (React.createElement(View, { className: classNames([
                'cu-bar tabbar',
                {
                    'safe-area': props.safeArea
                },
                colorClassName
            ], props.className), style: Object.assign(props.fix
                ? { position: 'fixed', width: '100vw', bottom: '0', zIndex: 10 }
                : {}, props.style) }, barComponent));
    }
}
// export default function ClTabBar(
//   props: IProps = {
//     bgColor: 'white',
//     activeColor: 'blue',
//     active: 0,
//     tabs: [],
//     safeArea: true
//   }
// ) {
//   const [activeIndex, setActiveIndex] = useState(props.active)
//
//   useEffect(() => {
//     setActiveIndex(props.active || 0)
//   }, [props.active])
//
//   const onClick = (index: number) => {
//     setActiveIndex(index)
//     props.onClick && props.onClick(index)
//   }
//
//   const colorClassName = props.bgColor
//     ? BG_COLOR_LIST[props.bgColor]
//     : 'bg-white'
//   const activeColorClassName = props.activeColor
//     ? TEXT_COLOR_LIST[props.activeColor]
//     : 'text-blue'
//   const barComponent = props.tabs.map((item, index) => (
//     <View
//       onClick={() => {
//         onClick(index)
//       }}
//       key={'key-' + item.icon}
//       className={`action ${item.action ? 'add-action' : ''} ${
//         activeIndex === index ? activeColorClassName : ''
//       }`}
//     >
//       <View
//         className={classNames([
//           { 'cuIcon-cu-image': item.img, [`cuIcon-${item.icon}`]: item.icon }
//         ])}
//       >
//         {item.img ? <Image mode='aspectFit' src={item.img} /> : ''}
//         {item.badge !== false ? (
//           <View className='cu-tag badge'>
//             {isNumber(item.badge) ? item.badge : ''}
//           </View>
//         ) : (
//           ''
//         )}
//       </View>
//       <Text>{item.title}</Text>
//     </View>
//   ))
//   return (
//     <View
//       className={classNames(
//         [
//           'cu-bar tabbar',
//           {
//             'safe-area': props.safeArea
//           },
//           colorClassName
//         ],
//         props.className
//       )}
//       style={Object.assign(
//         props.fix
//           ? { position: 'fixed', width: '100vw', bottom: '0', zIndex: 10 }
//           : {},
//         props.style
//       )}
//     >
//       {barComponent}
//     </View>
//   )
// }
// ClTabBar.options = {
//   addGlobalClass: true
// }
//# sourceMappingURL=index.js.map