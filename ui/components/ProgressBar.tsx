/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useCallback} from 'react';
import {Image, Text, View, PanResponder, Animated} from 'react-native';
import {textStyles} from '../common/styles';
import {useAppDispatch} from '../store';
import {styles} from './styles';
import pointsSlice from '../slices/points';

const star = require('../assets/star.png');

// adjust these as needed.
enum DiscountThreshhold {
  FIFTEEN_PERCENT = 25,
  TWENTY_PERCENT = 50,
  TWENTY_FIVE_PERCENT = 75,
  THIRTY_PERCENT = 100,
}

enum PointsToDiscount {
  NONE,
  HALFWAY_TO_FIFTEEN_PERCENT,
  FIFTEEN_PERCENT,
  HALFWAY_TO_TWENTY_PERCENT,
  TWENTY_PERCENT,
  HALFWAY_TO_TWENTY_FIVE_PERCENT,
  TWENTY_FIVE_PERCENT,
  HALFWAY_TO_THIRTY_PERCENT,
  THIRTY_PERCENT,
  MAX,
}

const pointsForDiscount = (points: number) => {
  if (points <= 0) {
    return PointsToDiscount.NONE;
  }
  if (points > 0 && points < DiscountThreshhold.FIFTEEN_PERCENT) {
    return PointsToDiscount.HALFWAY_TO_FIFTEEN_PERCENT;
  }
  if (points === DiscountThreshhold.FIFTEEN_PERCENT) {
    return PointsToDiscount.FIFTEEN_PERCENT;
  }
  if (
    points > DiscountThreshhold.FIFTEEN_PERCENT &&
    points < DiscountThreshhold.TWENTY_PERCENT
  ) {
    return PointsToDiscount.HALFWAY_TO_TWENTY_PERCENT;
  }
  if (points === DiscountThreshhold.TWENTY_PERCENT) {
    return PointsToDiscount.TWENTY_PERCENT;
  }
  if (
    points > DiscountThreshhold.TWENTY_PERCENT &&
    points < DiscountThreshhold.TWENTY_FIVE_PERCENT
  ) {
    return PointsToDiscount.HALFWAY_TO_TWENTY_FIVE_PERCENT;
  }
  if (points === DiscountThreshhold.TWENTY_FIVE_PERCENT) {
    return PointsToDiscount.TWENTY_FIVE_PERCENT;
  }
  if (
    points > DiscountThreshhold.TWENTY_FIVE_PERCENT &&
    points < DiscountThreshhold.THIRTY_PERCENT
  ) {
    return PointsToDiscount.HALFWAY_TO_THIRTY_PERCENT;
  }
  if (points === DiscountThreshhold.THIRTY_PERCENT) {
    return PointsToDiscount.THIRTY_PERCENT;
  }
  if (points > DiscountThreshhold.THIRTY_PERCENT) {
    return PointsToDiscount.MAX;
  }
};

const EmptyProgressBarSection = ({sectionStyle}: {sectionStyle?: any}) => (
  <View style={[styles.emptyProgressBar, {...sectionStyle}]} />
);

const HalfSection = ({
  leftStyle,
  rightStyle,
}: {
  leftStyle?: any;
  rightStyle?: any;
}) => (
  <View style={styles.halfProgressBarContainer}>
    <View style={[styles.filledHalfBar, {...leftStyle}]} />
    <View style={[styles.emptyHalfBar, {...rightStyle}]} />
  </View>
);

const FullSection = ({sectionStyle}: {sectionStyle?: any}) => (
  <View style={[styles.fullProgressBar, {...sectionStyle}]} />
);

const ActiveDiscountText = ({text}: {text: string}) => (
  <Text style={textStyles.purpleText}>{text}</Text>
);
const InactiveDiscountText = ({text}: {text: string}) => (
  <Text style={textStyles.inactiveGreyText}>{text}</Text>
);

export const ProgressBar = ({points}: {points: number}) => {
  const [barWidth, setBarWidth] = useState<number | undefined>();
  const barIncrements = barWidth! / 5.2;
  const onLayout = (event: any) => {
    const {width} = event.nativeEvent.layout;
    setBarWidth(width);
  };
  const [originalPosition, setOriginalPosition] = useState<number>(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;
  const UpdateSlider = (num: number) => {
    console.log('@@ slider xValue: ', num);
    if (num < barIncrements) {
      setOriginalPosition(0);
    }
    if (num > barIncrements && num < barIncrements * 2) {
      // updatePoints();
      setOriginalPosition(1);
      console.log('********************', originalPosition);
    }
    if (num > barIncrements * 2 && num < barIncrements * 3) {
      setOriginalPosition(2);
      console.log('********************', originalPosition);
    }
    if (num > barIncrements * 3 && num < barIncrements * 4) {
      setOriginalPosition(3);
      console.log('********************', originalPosition);
    }
    if (num > barIncrements * 4 && num < barIncrements * 5) {
      setOriginalPosition(4);
      console.log('********************', originalPosition);
    }
  };
  // const dispatch = useAppDispatch();
  // const updatePoints = useCallback(() => {
  //   dispatch(
  //     pointsSlice.actions.addPoints({
  //       points: 30,
  //     }),
  //   );
  // }, [dispatch]);
  switch (pointsForDiscount(points)) {
    case PointsToDiscount.HALFWAY_TO_FIFTEEN_PERCENT:
      return (
        <View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{transform: [{translateX: pan.x}], zIndex: 999}}
              onTouchMove={() => UpdateSlider((pan.x as any)._value)}
              {...panResponder.panHandlers}>
              <View style={[styles.starContainer, {left: '-2%'}]}>
                <Image source={star} style={styles.star} />
              </View>
            </Animated.View>
            <View style={styles.progressBarSectionContainer}>
              <HalfSection />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection sectionStyle={{borderRightWidth: 0}} />
            </View>
          </View>
          <View style={styles.discountTextContainer}>
            <InactiveDiscountText text="15% off" />
            <InactiveDiscountText text="20% off" />
            <InactiveDiscountText text="25% off" />
            <InactiveDiscountText text="30% off" />
          </View>
        </View>
      );
    case PointsToDiscount.FIFTEEN_PERCENT:
      return (
        <View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{transform: [{translateX: pan.x}], zIndex: 999}}
              onTouchMove={() => UpdateSlider((pan.x as any)._value)}
              {...panResponder.panHandlers}>
              <View style={[styles.starContainer, {left: '16%'}]}>
                <Image source={star} style={styles.star} />
              </View>
            </Animated.View>
            <View style={styles.progressBarSectionContainer}>
              <FullSection
                sectionStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection sectionStyle={{borderRightWidth: 0}} />
            </View>
          </View>
          <View style={styles.discountTextContainer}>
            <ActiveDiscountText text="15% off" />
            <InactiveDiscountText text="20% off" />
            <InactiveDiscountText text="25% off" />
            <InactiveDiscountText text="30% off" />
          </View>
        </View>
      );
    case PointsToDiscount.HALFWAY_TO_TWENTY_PERCENT:
      return (
        <View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{transform: [{translateX: pan.x}], zIndex: 999}}
              onTouchMove={() => UpdateSlider((pan.x as any)._value)}
              {...panResponder.panHandlers}>
              <View style={[styles.starContainer, {left: '16%'}]}>
                <Image source={star} style={styles.star} />
              </View>
            </Animated.View>
            <View style={styles.progressBarSectionContainer}>
              <FullSection
                sectionStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <HalfSection
                leftStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection sectionStyle={{borderRightWidth: 0}} />
            </View>
          </View>
          <View style={styles.discountTextContainer}>
            <ActiveDiscountText text="15% off" />
            <InactiveDiscountText text="20% off" />
            <InactiveDiscountText text="25% off" />
            <InactiveDiscountText text="30% off" />
          </View>
        </View>
      );
    case PointsToDiscount.TWENTY_PERCENT:
      return (
        <View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{transform: [{translateX: pan.x}], zIndex: 999}}
              onTouchMove={() => UpdateSlider((pan.x as any)._value)}
              {...panResponder.panHandlers}>
              <View style={[styles.starContainer, {left: '36%'}]}>
                <Image source={star} style={styles.star} />
              </View>
            </Animated.View>
            <View style={styles.progressBarSectionContainer}>
              <FullSection
                sectionStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection sectionStyle={{borderRightWidth: 0}} />
            </View>
          </View>
          <View style={styles.discountTextContainer}>
            <ActiveDiscountText text="15% off" />
            <ActiveDiscountText text="20% off" />
            <InactiveDiscountText text="25% off" />
            <InactiveDiscountText text="30% off" />
          </View>
        </View>
      );
    case PointsToDiscount.HALFWAY_TO_TWENTY_FIVE_PERCENT:
      return (
        <View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{transform: [{translateX: pan.x}], zIndex: 999}}
              onTouchMove={() => UpdateSlider((pan.x as any)._value)}
              {...panResponder.panHandlers}>
              <View style={[styles.starContainer, {left: '36%'}]}>
                <Image source={star} style={styles.star} />
              </View>
            </Animated.View>
            <View style={styles.progressBarSectionContainer}>
              <FullSection
                sectionStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
              <HalfSection
                leftStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection sectionStyle={{borderRightWidth: 0}} />
            </View>
          </View>
          <View style={styles.discountTextContainer}>
            <ActiveDiscountText text="15% off" />
            <ActiveDiscountText text="20% off" />
            <InactiveDiscountText text="25% off" />
            <InactiveDiscountText text="30% off" />
          </View>
        </View>
      );
    case PointsToDiscount.TWENTY_FIVE_PERCENT:
      return (
        <View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{transform: [{translateX: pan.x}], zIndex: 999}}
              onTouchMove={() => UpdateSlider((pan.x as any)._value)}
              {...panResponder.panHandlers}>
              <View style={[styles.starContainer, {left: '55%'}]}>
                <Image source={star} style={styles.star} />
              </View>
            </Animated.View>
            <View style={styles.progressBarSectionContainer}>
              <FullSection
                sectionStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection sectionStyle={{borderRightWidth: 0}} />
            </View>
          </View>
          <View style={styles.discountTextContainer}>
            <ActiveDiscountText text="15% off" />
            <ActiveDiscountText text="20% off" />
            <ActiveDiscountText text="25% off" />
            <InactiveDiscountText text="30% off" />
          </View>
        </View>
      );
    case PointsToDiscount.HALFWAY_TO_THIRTY_PERCENT:
      return (
        <View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{transform: [{translateX: pan.x}], zIndex: 999}}
              onTouchMove={() => UpdateSlider((pan.x as any)._value)}
              {...panResponder.panHandlers}>
              <View style={[styles.starContainer, {left: '55%'}]}>
                <Image source={star} style={styles.star} />
              </View>
            </Animated.View>
            <View style={styles.progressBarSectionContainer}>
              <FullSection
                sectionStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
              <HalfSection
                leftStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
              <EmptyProgressBarSection sectionStyle={{borderRightWidth: 0}} />
            </View>
          </View>
          <View style={styles.discountTextContainer}>
            <ActiveDiscountText text="15% off" />
            <ActiveDiscountText text="20% off" />
            <ActiveDiscountText text="25% off" />
            <InactiveDiscountText text="30% off" />
          </View>
        </View>
      );
    case PointsToDiscount.THIRTY_PERCENT:
      return (
        <View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{transform: [{translateX: pan.x}], zIndex: 999}}
              onTouchMove={() => UpdateSlider((pan.x as any)._value)}
              {...panResponder.panHandlers}>
              <View style={[styles.starContainer, {left: '75%'}]}>
                <Image source={star} style={styles.star} />
              </View>
            </Animated.View>
            <View style={styles.progressBarSectionContainer}>
              <FullSection
                sectionStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
              <EmptyProgressBarSection sectionStyle={{borderRightWidth: 0}} />
            </View>
          </View>
          <View style={styles.discountTextContainer}>
            <ActiveDiscountText text="15% off" />
            <ActiveDiscountText text="20% off" />
            <ActiveDiscountText text="25% off" />
            <ActiveDiscountText text="30% off" />
          </View>
        </View>
      );
    case PointsToDiscount.MAX:
      return (
        <View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{transform: [{translateX: pan.x}], zIndex: 999}}
              onTouchMove={() => UpdateSlider((pan.x as any)._value)}
              {...panResponder.panHandlers}>
              <View style={[styles.starContainer, {left: '75%'}]}>
                <Image source={star} style={styles.star} />
              </View>
            </Animated.View>
            <View style={styles.progressBarSectionContainer}>
              <FullSection
                sectionStyle={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <FullSection
                sectionStyle={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
              <FullSection sectionStyle={{borderRightWidth: 0}} />
            </View>
          </View>
          <View style={styles.discountTextContainer}>
            <ActiveDiscountText text="15% off" />
            <ActiveDiscountText text="20% off" />
            <ActiveDiscountText text="25% off" />
            <ActiveDiscountText text="30% off" />
          </View>
        </View>
      );

    default:
      return (
        <View>
          <View style={styles.progressBarContainer} onLayout={onLayout}>
            <Animated.View
              style={{transform: [{translateX: pan.x}], zIndex: 999}}
              onTouchStart={() => UpdateSlider((pan.x as any)._value)}
              onTouchEnd={() => UpdateSlider((pan.x as any)._value)}
              {...panResponder.panHandlers}>
              <View style={[styles.starContainer, {left: '-2%'}]}>
                <Image source={star} style={styles.star} />
              </View>
            </Animated.View>
            <View style={styles.progressBarSectionContainer}>
              <EmptyProgressBarSection />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection />
              <EmptyProgressBarSection />
            </View>
            <View style={styles.discountTextContainer}>
              <InactiveDiscountText text="15% off" />
              <InactiveDiscountText text="20% off" />
              <InactiveDiscountText text="25% off" />
              <InactiveDiscountText text="30% off" />
            </View>
          </View>
        </View>
      );
  }
};
