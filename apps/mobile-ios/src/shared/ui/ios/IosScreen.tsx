import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { telegramColors, telegramLayout, telegramText } from './theme';

type IosScreenProps = {
  title: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  children?: ReactNode;
  contentContainerStyle?: object;
  headerMode?: 'large' | 'compact';
  headerAlignment?: 'leading' | 'center';
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  keyboardVerticalOffset?: number;
};

export function IosScreen({
  title,
  subtitle,
  leftAction,
  rightAction,
  children,
  contentContainerStyle,
  headerMode = 'large',
  headerAlignment = 'leading',
  scrollable = true,
  keyboardAvoiding = false,
  keyboardVerticalOffset = 0,
}: IosScreenProps) {
  const androidTopInset = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0;
  const hasLeftAction = Boolean(leftAction);
  const hasRightAction = Boolean(rightAction);

  const content = (
    <View style={[styles.content, !scrollable ? styles.staticContent : null]}>
      <View
        style={[
          styles.headerShell,
          headerMode === 'compact' ? styles.compactHeaderShell : null,
          headerMode === 'compact' && androidTopInset > 0 ? { paddingTop: androidTopInset + 6 } : null,
        ]}
      >
        <View
          style={[
            styles.header,
            headerMode === 'compact' ? styles.compactHeader : null,
            headerAlignment === 'center' ? styles.centerHeader : null,
          ]}
        >
          <View
            style={[
              styles.headerText,
              hasLeftAction ? styles.headerTextWithLeftAction : null,
              hasRightAction ? styles.headerTextWithRightAction : null,
              headerAlignment === 'center' ? styles.centerHeaderText : null,
            ]}
          >
            <Text
              numberOfLines={1}
              style={[headerMode === 'compact' ? telegramText.navTitle : telegramText.largeTitle, styles.title]}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text
                numberOfLines={headerMode === 'compact' ? 1 : 2}
                style={[styles.subtitle, headerMode === 'compact' ? styles.compactSubtitle : null]}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>
          {leftAction ? (
            <View
              pointerEvents="box-none"
              style={[styles.leftAction, headerMode === 'compact' ? styles.compactLeftAction : null]}
            >
              {leftAction}
            </View>
          ) : null}
          {rightAction ? (
            <View
              pointerEvents="box-none"
              style={[styles.rightAction, headerMode === 'compact' ? styles.compactRightAction : null]}
            >
              {rightAction}
            </View>
          ) : null}
        </View>
      </View>
      <View
        style={[
          styles.body,
          !scrollable ? styles.staticBody : null,
          headerMode === 'compact' ? styles.compactContent : null,
          contentContainerStyle,
        ]}
      >
        {children}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.keyboardAvoider}
        >
          {scrollable ? (
            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
              {content}
            </ScrollView>
          ) : (
            <View style={styles.staticContainer}>{content}</View>
          )}
        </KeyboardAvoidingView>
      ) : scrollable ? (
        <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
          {content}
        </ScrollView>
      ) : (
        <View style={styles.staticContainer}>{content}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: telegramColors.appBackground,
  },
  keyboardAvoider: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: telegramColors.appBackground,
  },
  staticContainer: {
    flex: 1,
    backgroundColor: telegramColors.appBackground,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
  },
  staticContent: {
    flex: 1,
  },
  body: {
    flexGrow: 1,
    gap: 18,
    paddingBottom: 28,
    paddingHorizontal: telegramLayout.screenPadding,
    paddingTop: 14,
  },
  staticBody: {
    flex: 1,
    minHeight: 0,
  },
  compactContent: {
    paddingTop: 10,
    paddingBottom: 12,
    gap: 10,
  },
  headerShell: {
    backgroundColor: telegramColors.navBg,
    borderBottomColor: telegramColors.separator,
    borderBottomWidth: telegramLayout.hairlineWidth,
    paddingBottom: 10,
    paddingHorizontal: telegramLayout.screenPadding,
    paddingTop: 6,
  },
  compactHeaderShell: {
    paddingBottom: 8,
    paddingTop: 2,
  },
  header: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 58,
  },
  compactHeader: {
    alignItems: 'center',
    minHeight: 44,
    paddingTop: 4,
  },
  centerHeader: {
    justifyContent: 'center',
    position: 'relative',
  },
  headerText: {
    flex: 1,
    gap: 4,
    minWidth: 0,
    paddingTop: 8,
  },
  headerTextWithLeftAction: {
    paddingLeft: 74,
  },
  headerTextWithRightAction: {
    paddingRight: 74,
  },
  centerHeaderText: {
    alignItems: 'center',
    paddingTop: 0,
  },
  title: {
    flexShrink: 1,
  },
  subtitle: {
    color: telegramColors.textSecondary,
    fontSize: 15,
    lineHeight: 20,
  },
  compactSubtitle: {
    fontSize: 13,
    lineHeight: 16,
  },
  rightAction: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 44,
    paddingBottom: 6,
    paddingLeft: 12,
    position: 'absolute',
    right: 0,
    top: 10,
    zIndex: 3,
  },
  leftAction: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    left: 0,
    minHeight: 44,
    position: 'absolute',
    top: 10,
    zIndex: 3,
  },
  compactRightAction: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minHeight: 36,
    paddingBottom: 0,
    paddingLeft: 12,
    position: 'absolute',
    right: 0,
    top: 6,
    zIndex: 3,
  },
  compactLeftAction: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    left: 0,
    minHeight: 36,
    position: 'absolute',
    top: 6,
    zIndex: 3,
  },
});
