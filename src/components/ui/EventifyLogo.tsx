import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Svg, { Circle, Path, Rect, Text as SvgText, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

/**
 * EventifyLogo.tsx — Redesigned & Precision Tuned
 * 
 * An expert-grade animated logo component for the Eventify discovery app.
 * Built with Reanimated 3 and React Native SVG.
 * 
 * Design Details:
 * - Icon: Three concentric arcs radiating from a center dot.
 * - Wordmark: "Event" (Dark) and "ify" (Primary) with a divider line.
 */

// Colors
const PRIMARY = '#E8445A';
const DARK = '#1A1D2E';
const GRAY = '#8A8FA8';
const DIVIDER = '#D1D5E8';

// Animated Components
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedText = Animated.createAnimatedComponent(SvgText);
const AnimatedG = Animated.createAnimatedComponent(G);

interface EventifyLogoProps {
  width?: number;
  height?: number;
}

export default function EventifyLogo({ width = 340, height = 190 }: EventifyLogoProps) {
  // --- SHARED VALUES ---
  
  // Icon Shared Values
  const dotScale = useSharedValue(0);
  const arc1Dash = useSharedValue(201);
  const arc2Dash = useSharedValue(362);
  const arc3Dash = useSharedValue(518);
  const outerArcOpacity = useSharedValue(0.35);

  // Wordmark & Divider Shared Values
  const dividerScaleY = useSharedValue(0);
  const eventOpacity = useSharedValue(0);
  const eventTranslateX = useSharedValue(30);
  const ifyOpacity = useSharedValue(0);
  const ifyTranslateX = useSharedValue(30);
  const taglineOpacity = useSharedValue(0);

  // --- ANIMATION LOGIC ---

  useEffect(() => {
    // PHASE 1 — Icon build (mount)
    // Center dot: scale 0 → 1.15 → 1
    dotScale.value = withSpring(1, {
      mass: 0.8,
      damping: 10,
      stiffness: 180,
    });

    // Arcs: draw in via strokeDashoffset
    arc1Dash.value = withDelay(200, withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) }));
    arc2Dash.value = withDelay(320, withTiming(0, { duration: 380, easing: Easing.out(Easing.cubic) }));
    arc3Dash.value = withDelay(440, withTiming(0, { duration: 450, easing: Easing.out(Easing.cubic) }));

    // PHASE 2 — Pulse echo (850ms)
    const pulseDelay = 850;
    outerArcOpacity.value = withDelay(
      pulseDelay,
      withSequence(
        withTiming(0.7, { duration: 250 }),
        withTiming(0.35, { duration: 250 })
      )
    );
    dotScale.value = withDelay(
      pulseDelay,
      withSequence(
        withSpring(1.3),
        withSpring(1)
      )
    );

    // PHASE 3 — Wordmark reveal (600ms+)
    // Divider line: scaleY 0 → 1
    dividerScaleY.value = withDelay(
      600,
      withTiming(1, { duration: 250, easing: Easing.out(Easing.quad) })
    );

    // "Event" text: slide + fade
    eventOpacity.value = withDelay(680, withTiming(1, { duration: 350, easing: Easing.out(Easing.quad) }));
    eventTranslateX.value = withDelay(680, withTiming(0, { duration: 350, easing: Easing.out(Easing.quad) }));

    // "ify" text: slide + fade (tighter delay)
    ifyOpacity.value = withDelay(760, withTiming(1, { duration: 350, easing: Easing.out(Easing.quad) }));
    ifyTranslateX.value = withDelay(760, withTiming(0, { duration: 350, easing: Easing.out(Easing.quad) }));

    // Tagline: fade in
    taglineOpacity.value = withDelay(950, withTiming(1, { duration: 300, easing: Easing.out(Easing.quad) }));

    // PHASE 4 — Idle loop (1400ms+)
    // Outer arc pulsing loop
    outerArcOpacity.value = withDelay(
      1400,
      withRepeat(
        withSequence(
          withTiming(0.55, { duration: 1500 }),
          withTiming(0.35, { duration: 1500 })
        ),
        -1,
        true
      )
    );

    // Dot subtle scale loop
    dotScale.value = withDelay(
      2900,
      withRepeat(
        withSequence(
          withSpring(1.12),
          withSpring(1)
        ),
        -1,
        true
      )
    );
  }, []);

  // --- ANIMATED PROPS & STYLES ---

  const dotProps = useAnimatedProps(() => ({
    transform: [{ scale: dotScale.value }],
  }));

  const arc1Props = useAnimatedProps(() => ({ strokeDashoffset: arc1Dash.value }));
  const arc2Props = useAnimatedProps(() => ({ strokeDashoffset: arc2Dash.value }));
  const arc3Props = useAnimatedProps(() => ({ 
    strokeDashoffset: arc3Dash.value,
    opacity: outerArcOpacity.value 
  }));

  const dividerProps = useAnimatedProps(() => {
    const centerY = 172; // y=112, h=120 -> center is 172
    return {
      transform: [
        { translateY: centerY * (1 - dividerScaleY.value) },
        { scaleY: dividerScaleY.value },
      ],
    };
  });

  const eventStyle = useAnimatedStyle(() => ({
    opacity: eventOpacity.value,
    transform: [{ translateX: eventTranslateX.value }],
  }));

  const ifyStyle = useAnimatedStyle(() => ({
    opacity: ifyOpacity.value,
    transform: [{ translateX: ifyTranslateX.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  return (
    <View style={{ width, height }}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 680 380"
        fill="none"
      >
        {/* ICON MARK */}
        {/* Center Dot Wrapper for Correct Transform Origin */}
        <AnimatedG transform={[{ translateX: 148 }, { translateY: 172 }]}>
          <AnimatedCircle
            cx="0"
            cy="0"
            r="10"
            fill={PRIMARY}
            animatedProps={dotProps}
          />
        </AnimatedG>

        {/* Arc 1 — r=32 */}
        <AnimatedPath
          d="M148 140 A32 32 0 1 1 116 172"
          stroke={PRIMARY}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="201"
          animatedProps={arc1Props}
        />

        {/* Arc 2 — r=64 */}
        <AnimatedPath
          d="M148 108 A64 64 0 1 1 84 172"
          stroke={DARK}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray="362"
          animatedProps={arc2Props}
        />

        {/* Arc 3 — r=96 */}
        <AnimatedPath
          d="M148 76 A96 96 0 1 1 52 172"
          stroke={PRIMARY}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="518"
          animatedProps={arc3Props}
        />

        {/* WORDMARK & DIVIDER */}
        {/* Vertical Divider */}
        <AnimatedRect
          x="246"
          y="112"
          width="1.5"
          height="120"
          rx="1"
          fill={DIVIDER}
          animatedProps={dividerProps}
        />

        {/* "Event" text part */}
        <AnimatedG style={eventStyle}>
          <AnimatedText
            x="272"
            y="200"
            fill={DARK}
            fontSize="80"
            fontWeight="900"
            fontFamily={Platform.select({ ios: 'Arial Black', android: 'sans-serif-condensed' })}
            letterSpacing="-3"
          >
            Event
          </AnimatedText>
        </AnimatedG>

        {/* "ify" text part — Aggressively positioned to resolve all spacing gaps */}
        <AnimatedG style={ifyStyle}>
          <AnimatedText
            x="440" // Shifted left significantly to ensure overlap/seamless connection
            y="200"
            fill={PRIMARY}
            fontSize="80"
            fontWeight="900"
            fontFamily={Platform.select({ ios: 'Arial Black', android: 'sans-serif-condensed' })}
            letterSpacing="-3"
          >
            ify
          </AnimatedText>
        </AnimatedG>

        {/* Tagline */}
        <AnimatedG style={taglineStyle}>
          <AnimatedText
            x="434"
            y="238"
            fill={GRAY}
            fontSize="11.5"
            fontFamily="Arial"
            textAnchor="middle"
            letterSpacing="4.5"
          >
            DISCOVER EVENTS
          </AnimatedText>
        </AnimatedG>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({});
