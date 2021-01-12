import React, { useState, useEffect } from 'react'
import { Block, View } from '@tarojs/components'
import { ClAnimation, ClCard, ClFlex, ClText, ClTitleBar } from '@/mp-colorui'

import { convertLightColor } from '../../../utils'

import colors from '../../../constant/color'

export default function ColorView(props) {
  const [showAnimation, setShowAnimation] = useState(false)
  useEffect(() => {
    let time = null
    time = setTimeout(() => {
      setShowAnimation(true)
      clearTimeout(time)
    }, 100)
  }, [])
  const renderCard = (item, index) => {
    return (
      <ClAnimation type='slide-top' delay={index / 10}>
        <ClCard
          bgColor={
            item.title.includes('Light')
              ? convertLightColor(item.title)
              : item.title
          }
        >
          <ClFlex justify='around'>
            <ClText>{item.title}</ClText>
            <ClText special='upper'>{item.color}</ClText>
          </ClFlex>
        </ClCard>
      </ClAnimation>
    )
  }

  const normalColor = colors.normalColor.map((item, index) => (
    <Block key={item.title}>{renderCard(item, index)}</Block>
  ))
  const lightColor = colors.lightColor.map((item, index) => (
    <Block key={item.title}>{renderCard(item, index)}</Block>
  ))
  const gradualColor = colors.gradualColor.map((item, index) => (
    <Block key={item.title}>{renderCard(item, index)}</Block>
  ))

  return (
    <View>
      <ClTitleBar
        title='标准色'
        type='icon'
        textColor='black'
        iconColor='blue'
      />
      {showAnimation ? normalColor : ''}
      <ClTitleBar title='浅色' type='icon' textColor='black' iconColor='blue' />
      {showAnimation ? lightColor : ''}
      <ClTitleBar
        title='渐变色'
        type='icon'
        textColor='black'
        iconColor='blue'
      />
      {showAnimation ? gradualColor : ''}
    </View>
  )
}

ColorView.config = {
  navigationBarTitleText: 'Color 颜色'
}
