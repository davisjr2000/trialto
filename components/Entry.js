import React, { Component } from 'react'
import { View, Text} from 'react-native'
import { getMetricsMetaInfo } from '../utils/helpers'
import Slider from './Slider'
import Stepper from './Stepper'
import Datetext from './Datetext'

export default class Entry extends Component {
    state = {
        run: 0,
        bike: 0,
        swin: 0,
        sleep: 0,
        eat: 0,
    }

    increment = (metric) => {
        const { max, step } = getMetricsMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] + step

        return {
            ...state,
            [metric]: count > max ? max : count
        }
        })
    }
 
    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricsMetaInfo(metric).step

        return {
            ...state,
            [metric]: count < 0 ? 0 : count,
        }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value,
        }))
    }

    render() {
        const metaInfo = getMetricsMetaInfo()
        return (
            <View>
              <Datetext date={(new Date()).toLocaleDateString()} />
              {Object.keys(metaInfo).map((key) => {
                  const { getIcon, type, ...rest } = metaInfo[key]
                  const value = this.state[key]

                  return (
                      <View key={key}>
                        {getIcon()}
                        {type === "slider"
                    ? <Slider 
                      value={value}
                     onChange={(value) => this.slide(key, value)}
                      {...rest} 
                    /> 
                     : <Stepper value={value} 
                     onIncrement={() => this.increment(key)}
                     onDecrement={() => this.decrement(key)} 
                     {...rest}
                     />
                     }
                      </View>
                  )
              })}
            </View>
        )
    }
}